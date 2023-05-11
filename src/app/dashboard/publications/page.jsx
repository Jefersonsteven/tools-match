"use client"

import Form from "../components/Form";

export default function Publications() {
  const handleClose = () => {
    alert("Cerraste todo")
  }
  
  const handleSave = (formData) => {
    const updatedUser = { ...fakeUsers[0], ...formData };
  const updatedFakeUsers = [updatedUser, ...fakeUsers.slice(1)];
  console.log(updatedFakeUsers); // Aquí verás el array ficticio actualizado
  alert("Usuario modificado")
  }
  
  // Definir el usuario actual y el array de usuarios ficticios
  let currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-555-5555',
    username: 'johndoe',
    website: 'johndoe.com',
    company: {
      name: 'Acme Inc.',
      catchPhrase: 'Making things happen',
      bs: 'Greatness',
    },
    address: {
      street: '123 Main St',
      suite: 'Apt. 456',
      city: 'Anytown',
      zipcode: '12345',
      geo: {
        lat: '37.1234',
        lng: '-122.1234',
      },
    },
  };
  
  const fakeUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-555-5555',
      username: 'johndoe',
      website: 'johndoe.com',
      company: {
        name: 'Acme Inc.',
        catchPhrase: 'Making things happen',
        bs: 'Greatness',
      },
      address: {
        street: '123 Main St',
        suite: 'Apt. 456',
        city: 'Anytown',
        zipcode: '12345',
        geo: {
          lat: '37.1234',
          lng: '-122.1234',
        },
      },
    },
  ];


  return ( 
      <div>
        <Form onClose={handleClose} onSave={handleSave} user={currentUser} fakeUser={fakeUsers[0]} />
          <h1>Publications Ruta(Ejemplo)</h1>
          </div>
   );
};

