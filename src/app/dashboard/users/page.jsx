"use client";
import style from "./users.module.css";
import User from "../components/User";
import { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import Form from "../components/Form"

export function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className={style.searchBar}>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      <FaSearch/>
    </div>
  );
}

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
  
        if (users.length > 0) {
          const columns = Object.keys(users[0]).map((column) => column.toUpperCase());
          setColumns(columns);
          setRecords(users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);


  const filteredUsuarios = records.filter((usuario) => {
    return usuario.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteUser = (id) => {
    const updatedRecords = records.filter((user)=> user.id !== id);
    setRecords(updatedRecords)
      alert("Usuario eliminado con exito")  
  };

  const handleClick = (user) => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDeleteClick = (name, id) => {
    if (
      window.confirm(`Estas por eliminar al usuario "${name}" estas seguro?`)
    ) {
      handleDeleteUser(id);
    }
  };



  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Usuarios</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={style.contenedorTable}>
      {filteredUsuarios.length > 0 ? (
        <table className={style.table}>
          <tbody>
            <tr>
              {columns
                .filter((c) => c !== "ID")
                .map((c, i) => {
                  return <th key={i}>{c}</th>;
                })}
           </tr>     
 {/* ACA */}
            
             
            {filteredUsuarios.map((d, i) => (
              <tr className={style.namesTable} key={i}>
                <td>{d.name}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>{d.username}</td>
                <td>{d.phone}</td>
                <td>
                  <button
                  className={style.botonEditar}
                    onClick={()=> handleClick(d.id)}>Editar
                    </button>
                  <button
                    className={style.botonDelete}
                    onClick={() => handleDeleteClick(d.name, d.id)}
                  >
                    Bannear
                  </button>
                </td>
              </tr>
            ))}
          

  {/* HASTA ACA */}
          </tbody>
        </table>
      ):(
        <div className={style.noUsuarios}><p>No hay Usuarios</p></div>
      )}
      {showForm && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <Form onCancel={handleCancel} />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Users;
