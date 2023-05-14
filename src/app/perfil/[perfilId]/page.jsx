"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import UserForm from '../../dashboard/components/Form';
import {pathname} from 'next/navigation';
import { useParams } from 'next/navigation';


export default function PerfilUsuario() {
    const [editingUser, setEditingUser] = useState(null);
    const { perfilId } = useParams();
    const [user, setUser] = useState({});
    
    useEffect(() => {
      fetch(`http://localhost:3000/api/admin/user/${perfilId}`)
          .then(response => response.json())
          .then(data => setUser(data))

  }, [setUser, perfilId])

  
    const handleEdit = () => {
        setEditingUser(user);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
          ...user,
          Nombre: e.target.firstname.value,
          Apellido: e.target.lastname.value,
          Email: e.target.email.value,
          Teléfono: e.target.phoneNumber.value,
          Reports: e.target.reports.value,
        };
        setUser(updatedUser);
        setEditingUser(null);
      };

  
    return (
      <div>
        <h1>Perfil de Usuario</h1> <button onClick={handleEdit}>Editar Usuario</button>
        <div>
          <h2>Nombre: {user.firstname}</h2>
          <h2>Apellido: {user.lastname}</h2>
          <h2>Teléfono: {user.phoneNumber}</h2>
          <h2>Correo electrónico: {user.email}</h2>
          <h2>Reportes: {user.reports}</h2>   
          {editingUser && (
        <UserForm
          editingUser={editingUser}
          handleSubmit={handleSubmit}
          setEditingUser={setEditingUser}
        />
      )}
        </div>
        <h2>Tienda</h2>
      </div>
    );
  }