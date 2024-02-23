import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'


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
    { id: 3, name: 'Amstel Bee', alcoholContent: 0.006 },
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
        <h2 className='name'>Create a new Patron</h2>
        <form onSubmit={handleCreatePatron}>
          <input
            type="text"
            placeholder="Enter patron name"
            value={newPatronName}
            onChange={(e) => setNewPatronName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter body mass"
            value={newPatronBodyMass}
            onChange={(e) => setNewPatronBodyMass(e.target.value)}
          />
          <button type="submit">Add Patron</button>
        </form>

        <h2 className='name'>Create a new Order</h2>
        <form onSubmit={handleCreateOrder}>
          <input
            type="number"
            placeholder="Enter patron id"
            value={newPatronId}
            onChange={(e) => setNewPatronId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter drink id"
            value={newDrinkId}
            onChange={(e) => setNewDrinkId(e.target.value)}
          />
          <button type="submit">Add Drink Order</button>
        </form>

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
