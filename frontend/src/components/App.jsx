import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Drinks from './Drinks'
import Patrons from './Patrons'

const GET_PATRONS = gql`
{
  patrons {
    id
    name
    alcoholSaturation
  }
}
`;

const CREATE_PATRON = gql`
  mutation CreatePatron($name: String!, $bodyMass: Int!) {
    createPatron(input: { name: $name, bodyMass: $bodyMass }) {
      patron {
        id
        name
        bodyMass
      }
    }
  }
`;

const REMOVE_PATRON = gql`
  mutation RemovePatron($id: ID!) {
    removePatron(input: { id: $id }) {
      errors
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($patronId: Int!, $drinkId: Int!) {
    createOrder(input: { patronId: $patronId, drinkId: $drinkId }) {
    order {
      id
      patron {
        name
        alcoholSaturation
      }
      drink {
        name
        alcoholValue
      }
    }

    errors
    }
  }
`;

function App() {

  const { loading, error, data, refetch } = useQuery(GET_PATRONS, {
    fetchPolicy: 'network-only',
  });
  const [createPatronMutation] = useMutation(CREATE_PATRON);
  const [removePatronMutation] = useMutation(REMOVE_PATRON);

  const [newPatronName, setNewPatronName] = useState('');
  const [newPatronBodyMass, setNewPatronBodyMass] = useState(0);

  const [createOrderMutation] = useMutation(CREATE_ORDER);

  const [newPatronId, setNewPatronId] = useState(0);
  const [newDrinkId, setNewDrinkId] = useState(0);

  const drinks = [
    { id: 1, name: 'Vodka Martini', alcoholContent: 0.05 },
    { id: 2, name: 'Long Island Iced Tea', alcoholContent: 0.01 },
    { id: 3, name: 'Whiskey', alcoholContent: 0.09 },
  ];

  const handleCreatePatron = async (e) => {
    e.preventDefault();
    try {
      await createPatronMutation({
        variables: {
          name: newPatronName,
          bodyMass: parseFloat(newPatronBodyMass),
        },
      });
      refetch();
      // Clear the form fields after adding the patron
      setNewPatronName('');
      setNewPatronBodyMass(0);
    } catch (error) {
      console.error('Error creating patron:', error.message);
    }
  };

  const removePatron = async (id) => {
    try {
      await removePatronMutation({ variables: { id } });
      refetch();
    } catch (error) {
      console.error('Error removing patron:', error.message);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await createOrderMutation({
        variables: {
          patronId: parseFloat(newPatronId),
          drinkId: parseFloat(newDrinkId),
        },
      });
      refetch();

      setNewPatronId(0);
      setNewDrinkId(0);
    } catch (error) {
      console.error('Error creating drink order:', error.message);
    }
  };

  if (loading) return 'Loading...'
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='name'>Bartab</h1>
      </header>

      <main className='main'>
        <Container>
          <Row className="vh-90 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>

              <Card className="shadow">
                <Card.Body>
                  <h2 className='name'>Create a new Patron</h2>
                  <Form className="mb-3" onSubmit={handleCreatePatron}>
                    <Form.Group className="mb-3" controlId="formPatronName">
                      <Form.Label>Patron Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter patron name" onChange={(e) => setNewPatronName(e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPatronWeight">
                      <Form.Label>Enter the weight of the patron</Form.Label>
                      <Form.Control type="number" placeholder="Enter patron weight" onChange={(e) => setNewPatronBodyMass(e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">Add Patron</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8} lg={6} xs={12}>

              <Card className="shadow">
                <Card.Body>
                  <h2 className='name'>Create a new Order</h2>
                  <Form onSubmit={handleCreateOrder}>
                    <Form.Group className="mb-3" controlId="formPatronId">
                      <Form.Label>Patron Id</Form.Label>
                      <Form.Control type="number" placeholder="Enter patron id" onChange={(e) => setNewPatronId(e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formOrderDrinkId">
                      <Form.Label>Enter the drink id</Form.Label>
                      <Form.Control type="number" placeholder="Enter drink id" onChange={(e) => setNewDrinkId(e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>


                    <Button variant="primary" type="submit">Add Drink Order</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>


        <Drinks
          drinks={drinks.map(drink => ({
            id: drink.id,
            name: drink.name
          }))}
          />

        <Patrons
          patrons={data.patrons.map(patron => ({
            id: patron.id,
            name: patron.name,
            alcoholSaturation: patron.alcoholSaturation,
          }))}
          onRemove={removePatron}
        />
      </main>
    </div>
  );
}

export default App;
