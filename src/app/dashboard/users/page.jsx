"use client";
import style from "./users.module.css";
import User from "../components/User";
import { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"

const usuarios = [
  {
    nombre: "Juan",
    telefono: "123",
    email: "juan@ho1424tmail.com",
    reportes: 3,
    ordenes: 5,
    id: 1,
  },
  {
    nombre: "Jefferson",
    telefono: "121241243",
    email: "juan@ho1424tmail.com",
    reportes: 3,
    ordenes: 4,
    id: 2,
  },
  {
    nombre: "Ema",
    telefono: "121241243",
    email: "juan@ho1424tmail.com",
    reportes: 3,
    ordenes: 4,
    id: 2,
  },
  {
    nombre: "Adriana",
    telefono: "121241243",
    email: "juan@ho1424tmail.com",
    reportes: 3,
    ordenes: 4,
    id: 2,
  },
  {
    nombre: "Axel",
    telefono: "121241243",
    email: "juan@ho1424tmail.com",
    reportes: 3,
    ordenes: 4,
    id: 2,
  },
];

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
  const [columns, setColums] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setColums(Object.keys(usuarios[0]).map((column) => column.toUpperCase()));
    setRecords(usuarios);
  }, []);

  const filteredUsuarios = records.filter((usuario) => {
    return usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteUser = (id) => {
    console.log(`Eliminando usuario con id ${id}`);
  };

  const handleClick = (id) => {
    alert(`Editar usuario ${id}`)
  }

  const handleDeleteClick = (name) => {
    if (
      window.confirm(`Estas por eliminar al usuario "${name}" estas seguro?`)
    ) {
      handleDeleteUser(name);
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
                <td>{d.nombre}</td>
                <td>{d.telefono}</td>
                <td>{d.email}</td>
                <td>{d.reportes}</td>
                <td>{d.ordenes}</td>
                <td>
                  <button
                  className={style.botonEditar}
                    onClick={()=> handleClick(d.nombre)}>Editar
                    </button>
                  <button
                    className={style.botonDelete}
                    onClick={() => handleDeleteClick(d.nombre)}
                  >
                    Eliminar
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
      </div>
    </div>
  );
}

export default Users;
