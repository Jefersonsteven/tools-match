"use client"
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { SearchBar } from "../users/page";
import Busqueda from "../components/Searchbar";

// const usuarios = [
//     {
//       nombre: "Juan",
//       telefono: "123",
//       email: "juan@ho1424tmail.com",
//       reportes: 3,
//       ordenes: 5,
//       id: 1,
//     },
//     {
//       nombre: "Jefferson",
//       telefono: "121241243",
//       email: "juan@ho1424tmail.com",
//       reportes: 3,
//       ordenes: 4,
//       id: 2,
//     },
//     {
//       nombre: "Ema",
//       telefono: "121241243",
//       email: "juan@ho1424tmail.com",
//       reportes: 3,
//       ordenes: 4,
//       id: 2,
//     },
//     {
//       nombre: "Adriana",
//       telefono: "121241243",
//       email: "juan@ho1424tmail.com",
//       reportes: 3,
//       ordenes: 4,
//       id: 2,
//     },
//     {
//       nombre: "Axel",
//       telefono: "121241243",
//       email: "juan@ho1424tmail.com",
//       reportes: 3,
//       ordenes: 4,
//       id: 2,
//     },
//   ];
  


export default function Payments() {

    const [searchTerm, setSearchTerm] = useState("");
    const [columns, setColums] = useState([]);
    const [records, setRecords] = useState([]);
  
    useEffect(() => {
        if(usuarios){
      setColums(Object.keys(usuarios[0]).map((column) => column.toUpperCase()));
      setRecords(usuarios);
        }
    }, []);
  
    const filteredUsuarios = records.filter((usuario) => {
      return usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    const handleDeleteUser = (id) => {
      console.log(`Eliminando usuario con id ${id}`);
    };
  
    const handleClick = (id) => {
      alert(`Editar usuario ${id}`);
    };
  
    const handleDeleteClick = (name) => {
      if (
        window.confirm(`Estas por eliminar al usuario "${name}" estas seguro?`)
      ) {
        handleDeleteUser(name);
      }
      
    };
    return ( 
        <div>
            <div>
                <Busqueda searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
            <div>


        <Table columns={columns} filteredUsuarios={filteredUsuarios} handleDeleteClick={handleDeleteClick} handleClick={handleClick} />
      </div>
            <h1>Payments Ruta(Ejemplo)</h1>
            </div>
     );
};

