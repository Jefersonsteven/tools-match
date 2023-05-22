"use client";
import style from "./usersBan.module.css";

import Modal from "../components/Modal";
import { Fragment, useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

import UserForm from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { icons } from "react-icons";
import { CiUnlock } from "react-icons/ci";

import Loader from "@/components/Loader/Loader";


/*PARA PAGINATED*/
import Paginated from "@/components/paginated/Paginated";
/*-----------------*/

export function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className={style.searchBar}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Email"
      />
      <FaSearch />
    </div>
  );
}

/*MODIFICADO PARA PAGINATED*/

function UsersBan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);


  const [editingUser, setEditingUser] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserCount, setSelectedUserCount] = useState(0);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(true);

  const [loading, setLoading] = useState(false);



  const[admin, setAdmin] = useState(false);

  


  const filteredUsuarios = records.filter((usuario) => {
    return usuario.firstname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /*---------- PAGINATED ----------*/
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedUsers = filteredUsuarios.slice(startIndex, endIndex);
  /*-------------------------------*/


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios("/api/admin/hidden/user"); //PAGINATED
      const users = await response.data;

      if (users.length > 0) {
        const columns = Object.keys(users[0]).map((column) =>
          column.toUpperCase()
        );
        setColumns(columns);
        setRecords(users);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



// Funcion de eliminar usuario ----------------------------------------

  const handleDeleteClick = (firstname, id) => {
    Swal.fire({
      title: `¿Estás por sacar el veto a ${firstname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#01d3f8",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const userIds = selectedUsers.map((userId) => records[parseInt(userId.substring(4))].id);
        axios.delete("/api/admin/hidden/user", {
          data: { userIds: userIds },
        })
          .then((response) => {
            // Actualizar la lista de usuarios en el estado local
            const updatedUsers = records.filter((user) => user.id !== id);
            setRecords(updatedUsers);
            
            Swal.fire({
              title: "¡Se ha quitado el veto correctamente!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // CheckBox   ---------------------------------------------------------

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
  
    if (checked) {
      setSelectedUsers([...selectedUsers, name]);
      setSelectedUserCount((prevCount) => prevCount + 1);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== name));
      setSelectedUserCount((prevCount) => prevCount - 1);
    }
  
    setAreButtonsDisabled(selectedUserCount <= 1);
  };


  const handleUnbanUsers = () => {
    if (selectedUserCount > 0) {
      Swal.fire({
        title: `Sacar el veto a ${selectedUserCount} usuarios`,
        text: `¿Estás seguro de sacar el veto a los ${selectedUserCount} usuarios seleccionados?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const userIds = selectedUsers.map((user) => user.id);
  
          // Eliminar usuarios
          axios
            .delete("/api/admin/hidden/user", {
              data: { userIds: userIds },
            })
            .then((response) => {
              // Actualizar la lista de usuarios en el estado local
              const updatedUsers = records.filter(
                (user) => !userIds.includes(user.id)
              );
              setRecords(updatedUsers);
  
              Swal.fire({
                title: "¡El veto fue sacado correctamente!",
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };

  const buttonClass = selectedUserCount > 1 ? style.disabledButton : '';



//  -------------------------------------------------------------------------------------------
     
  return (
    <div className={style.contenedorPadre}>


      <div className={style.searchbarContainer}>
        <h2>Usuarios vetados</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

    
      {loading ? (


<div className="loader-container">
  <Loader className="loader" />
</div>
      
    ) : ( <div>

   
      
        
      {selectedUserCount > 1 && (
      <div className={style.checkbox_padre}>
      <h2>Hay {selectedUserCount} usuarios seleccionados</h2>
              <button
                 className={style.botonEliminar}
                     onClick={handleUnbanUsers}
                >
                   Anular veto
              </button>
      </div>
      )}

    
      <div className={style.contenedorTable}>
        {filteredUsuarios.length > 0 ? (
          <table className={style.table}>
           
            <thead>
              <tr>
                <th>
                  <MdVerifiedUser />
                </th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>EMAIL</th>
                <th>TELEFONO</th>
                <th>RANGO</th>
                <th>REPORTES</th>
                <th>PUBLICACIONES</th>
                <th>ORDENES</th>
                <th>RESEÑAS</th>
                <th>RECIBOS</th>
                <th>PAIS</th>                
                <th>ACCION</th>               
              </tr>
            </thead>


            <tbody className={style.bodyTabla}>
              {displayedUsers.map((d) => (
                <tr className={style.namesTable} key={d.id}>
                  <td>
                    <input
                      type="checkbox"
                      name={`fila${d.id}`}
                      checked={selectedUsers.includes(`fila${d.id}`)}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                  <td>{d.firstname}</td>
                  <td>{d.lastname}</td>
                  <td>{d.email}</td>
                  <td>{d.phoneNumber}</td>
                  <td>{d.admin ? "Admin" : "Usuario"}</td>
                  <td>{d.reports.length}</td>
                  <td>{d.posts.length}</td>
                  <td>{d.orders.length}</td>
                  <td>{d.reviews.length}</td>
                  <td>{d.received.length}</td>
                  <td>{d.country ? d.country : "?"}</td>
                  {/* <td><button onClick={()=> handleAdminClick(d.firstname, d.id)}></button></td> */}


                  <td className={style.td_button}>
                    {/* <button
                      className={`${style.botonEditar} ${buttonClass}`}
                      onClick={() => handleClick(d.id)}
                      disabled={selectedUserCount > 1}
                      
                    >
                      <TiPencil size={30}/>
                    </button> */}
                    <button
                      className={`${style.botonDelete} ${buttonClass}`}
                      onClick={() => handleDeleteClick(d.firstname, d.id)}
                      disabled={selectedUserCount > 1}
                    >
                      <CiUnlock size={30}/>
                    </button>
                  </td>  


                
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={style.noUsuarios}>
            <p>No hay Usuarios vetados🚩</p>
          </div>
        )}
        {editingUser && (



          <Modal show={showModal} onClose={() => setShowModal(false)}>

            <UserForm
              admin={admin}
              setAdmin={setAdmin}
              editingUser={editingUser}
              handleSubmit={handleSubmit}
              setEditingUser={setEditingUser}
            />
          </Modal>
        )}




      </div>
      {/*--------- PAGINATED ---------- */}
      {filteredUsuarios.length > 0 && (
        <Paginated
          url={`/api/admin/paginatedUser?page=${currentPage}&limit=${perPage}`}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          onPageChange={handlePageChange}
          totalPagesProp={Math.ceil(perPage.length / perPage)}
        />
      )}
 </div>)}



 
      {/*------------------------------ */}
    </div>
  );
}

export default UsersBan;