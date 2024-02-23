import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'


import '../App.css';
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

const REMOVE_PATRON = gql`
  mutation RemovePatron($id: ID!) {
    removePatron(input: { id: $id }) {
      errors
    }
  }
`;

function App() {

  const { loading, error, data, refetch } = useQuery(GET_PATRONS, {
    fetchPolicy: 'network-only',
  });
  const [removePatronMutation] = useMutation(REMOVE_PATRON);

  const removePatron = async (id) => {
    try {
      await removePatronMutation({ variables: { id } });
      refetch();
    } catch (error) {
      console.error('Error removing patron:', error.message);
    }
  };

  const handleRemovePatron = (patronId) => {
    console.log('Remove patron with ID:', patronId);
  };

  if (loading) return 'Loading...'
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='name'>Bartab</h1>
      </header>
      <main className='main'>
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
