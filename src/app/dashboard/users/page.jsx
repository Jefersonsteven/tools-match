"use client";
import style from "./users.module.css";

import Modal from "../components/Modal";
import { Fragment, useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

import UserForm from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { icons } from "react-icons";
import { TiDelete, TiPencil } from "react-icons/ti";

import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import LoaderRadial from "@/components/Loader/LoaderRadial";



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

function Users() {
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
    return usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /*---------- PAGINATED ----------*/
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const publicationsPerPage = 5;

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
      const response = await axios("/api/admin/user"); //PAGINATED
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


// Editar usuario -----------------------------

  const handleClick = (userId) => {
    const userToEdit = filteredUsuarios.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      country: editingUser.country,

      admin: editingUser.admin,
    };
  
    
  if (formData.get("firstname") && formData.get("firstname") !== editingUser.firstname) {
    updatedUser.firstname = formData.get("firstname");
  }

  if (formData.get("lastname") && formData.get("lastname") !== editingUser.lastname) {
    updatedUser.lastname = formData.get("lastname");
  }

  if (formData.get("phonenumber") && formData.get("phonenumber") !== editingUser.phoneNumber) {
    if (formData.get("phonenumber") !== "null") {
      updatedUser.phoneNumber = formData.get("phonenumber");
    } else {
      delete updatedUser.phoneNumber;
    }
  }


    Swal.fire({
      title: "¿Estás seguro de los cambios?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadingModal(true);
        Swal.showLoading(); // Mostrar loader
    
        axios
          .put(`/api/admin/user/${editingUser.id}`, updatedUser)
          .then((response) => {
            console.log(response.data);
            setRecords((prevRecords) =>
              prevRecords.map((user) =>
                user.id === editingUser.id ? { ...user, ...updatedUser } : user
              )
            );
            setEditingUser(null);
            setLoadingModal(false);
    
            Swal.fire({
              title: "¡Usuario editado correctamente!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // -----------------------------------------------------------------


// Funcion de eliminar usuario ----------------------------------------

  const handleDeleteClick = (firstname, id, emailuser) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar a ${firstname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/user/${id}`)
          .then((response) => {
            // Actualizar la lista de usuarios en el estado local
            const updatedUsers = records.filter((user) => user.id !== id);
            setRecords(updatedUsers);

            axios
            .post('/api/sendEmail/baneo', { 
              email: emailuser }) // Aquí obtienes el correo electrónico del usuario eliminado desde la respuesta del servidor
            
            
            Swal.fire({
              title: "¡Usuario eliminado correctamente!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  
  const buttonClass = selectedUserCount > 1 ? style.disabledButton : '';
  // CheckBox   ---------------------------------------------------------
  const handleCheckboxChange = (event) => {
    const { name , checked } = event.target;    
    setSelectedUsers((prevSelectedUsers) => {
      if (checked) {
        return [...prevSelectedUsers, name];
      } else {
        return prevSelectedUsers.filter((userId) => userId !== name);
      }
    });    
    setSelectedUserCount((prevCount) => {
      if (checked) {
        return prevCount + 1;
      } else {
        return prevCount - 1;
      }
    });
  };
  

  const handleDeleteUsers = (id, email) => {
    if (selectedUserCount > 0) {
      const userIds = selectedUsers;
      const userEmails = records
      .filter((user) => userIds.includes(user.id))
      .map((user) => user.email);
      Swal.fire({
        title: `Eliminar ${selectedUserCount} usuarios`,
        text: `¿Estás seguro de eliminar a los ${selectedUserCount} usuarios?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
        onBeforeOpen: ()=> {
          Swal.showLoading();
        }
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put("/api/admin/user", {
                userIds: selectedUsers 
            }).then(()=>{ 
              axios.post("/api/sendEmail/baneo", {
                email: userEmails
              })
            }) 
            .then((response) => {
              // Actualizar la lista de usuarios en el estado local
              const updatedUsers = records.filter(
                (user) => !userIds.includes(user.id)
              );
              setRecords(updatedUsers);
              setSelectedUserCount(0);
              Swal.close();
              Swal.fire({
                title: "¡Usuarios eliminados correctamente!",
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



  const [loadingModal, setLoadingModal] = useState(false);



//  -------------------------------------------------------------------------------------------
     
  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Usuarios</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>   
      {loading ? (
<div className={style.loaderContainer}>
  <LoaderRadial />
</div>     
    ) : ( 
    <div>        
      {selectedUserCount > 1 && (
      <div className={style.checkbox_padre}>
      <h2>Hay {selectedUserCount} usuarios seleccionados</h2>
              <button
                 className={style.botonEliminar}
                     onClick={handleDeleteUsers}
                >
                   Eliminar usuarios
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
                <th>PUBLICACIONES</th>
                <th>REPORTES</th>               
                <th>PAIS</th>                
                <th>ACCIONES</th>               
              </tr>
            </thead>
            <tbody className={style.bodyTabla}>
              {displayedUsers.map((d) => (
                <tr className={style.namesTable} key={d.id}>
                  <td>
                  <input
                          type="checkbox"
                          name={d.id}
                          checked={selectedUsers.includes(d.id, d.email)}
                          onChange={handleCheckboxChange}
                          className={style.checkboxInput}
                        />       
                  </td>
                  <td>
        <Link className={style.nombrePerfil} href={`/dashboard/users/${d.id}`}>
          {d.firstname}
        </Link></td>
                  <td>{d.lastname}</td>
                  <td>{d.email}</td>
                  <td>{d.phoneNumber}</td>
                  <td>{d.admin ? "Admin" : "Usuario"}</td>
                  <td>{d.posts.length}</td>
                  <td>{d.reports.length}</td>
                  <td>{d.country ? d.country : "?"}</td>                  
                  <td className={style.td_button}>
                    <button
                      className={`${style.botonEditar} ${buttonClass}`}
                      onClick={() => handleClick(d.id)}
                      disabled={selectedUserCount > 1}                      
                    >
                      <TiPencil size={30}/>
                    </button>
                    <button
                      className={`${style.botonDelete} ${buttonClass}`}
                      onClick={() => handleDeleteClick(d.firstname, d.id, d.email)}
                      disabled={selectedUserCount > 1}
                    >
                      <TiDelete size={30}/>
                    </button>
                  </td>                  
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={style.noUsuarios}>
            <p>No hay usuarios. . . . . 🚀</p>
          </div>
        )}
        {editingUser && (
          <Modal show={showModal} onClose={() => setShowModal(false)}>
{loadingModal ? (
    <div className={style.loader_radial}>
      <LoaderRadial />
    </div>
  ) : (
    <div>
      <UserForm
        admin={admin}
        setAdmin={setAdmin}
        editingUser={editingUser}
        handleSubmit={handleSubmit}
        setEditingUser={setEditingUser}
      />
    </div>
  )}
</Modal>
        )}
      </div>
      {/*--------- PAGINATED ---------- */}
      {filteredUsuarios.length > publicationsPerPage && (
            <Paginated
              currentPage={currentPage}
              publicationsPerPage={publicationsPerPage}
              totalPagesProp={Math.ceil(
                filteredUsuarios.length / publicationsPerPage
              )}
              onPageChange={handlePageChange}
              setCurrentPage={setCurrentPage}
            />
          )}
 </div>)}
      {/*------------------------------ */}
    </div>
  );
}

export default Users;
