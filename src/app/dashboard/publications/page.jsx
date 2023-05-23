"use client";
import style from "./publications.module.css";
import Modal from "../components/Modal";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaToolbox } from "react-icons/fa";
import UserForm from "../components/Form";
import Swal from "sweetalert2";
import axios from "axios";
import Paginated from "@/components/paginated/Paginated";
import { TfiPencilAlt } from "react-icons/tfi";
import { TiDelete, TiPencil } from "react-icons/ti";
import PublicationForm from "../components/PublicationForm";
import Loader from "@/components/Loader/Loader";

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
        placeholder="Titulo"
      />
      <FaSearch />
    </div>
  );
}

function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserCount, setSelectedUserCount] = useState(0);

  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemCount, setSelectedItemCount] = useState(0);

  const [loading, setLoading] = useState(false);

  /*----------PAGINATED----------*/
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 5;
  /*-------------------------------*/

  // const handleDeleteUser = useCallback(async (id) => {
  //   try {
  //     const userDelete = await axios.delete(`/api/admin/post/${id}`);
  //     console.log(userDelete.data);
  //     Swal.fire({
  //       title: "Usuario eliminado",
  //       text: "El usuario ha sido eliminado exitosamente",
  //       icon: "success",
  //       confirmButtonText: "Aceptar",
  //     });
  //     fetchUsers();
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       title: "Error al Eliminar el Usuario",
  //       text: "Ha ocurrido un error al eliminar el usuario, por favor intenta de nuevo",
  //       icon: "error",
  //       confirmButtonText: "Aceptar",
  //     });
  //   }
  // }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios("/api/admin/post");
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

  useEffect(() => {
    setIsDeleteButtonDisabled(selectedItemCount > 1);
  }, [selectedItemCount]);

  const filteredUsuarios = records.filter((usuario) => {
    return usuario.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // const handleClick = (userId) => {
  //   const userToEdit = filteredUsuarios.find((user) => user.id === userId);
  //   setEditingUser(userToEdit);
  //   setShowModal(true);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const updatedUser = {
  //     title: formData.get("title"),
  //     lastname: formData.get("lastname"),
  //     email: formData.get("email"),
  //     phoneNumber: formData.get("phonenumber"),
  //     reports: formData.get("reports"),
  //   };
  //   axios
  //     .put(`/api/admin/post/${editingUser.id}`, updatedUser)
  //     .then((response) => {
  //       console.log(response.data);
  //       setEditingUser(null);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleDeleteClick = (title, id) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar a la publicacion ${title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/admin/post/${id}`)
          .then((response) => {
            // Actualizar la lista de usuarios en el estado local
            const updatedUsers = records.filter((user) => user.id !== id);
            setRecords(updatedUsers);

            Swal.fire({
              title: "¡Publicacion Eliminada Correctamente!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleDeletePublications = () => {
    if (selectedItems.length > 0) {
      Swal.fire({
        title: `Eliminar ${selectedItems.length} publicaciones`,
        text: `¿Estás seguro de eliminar las ${selectedItems.length} publicaciones seleccionadas?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const userIds = selectedItems; // Aquí obtienes los IDs de las publicaciones seleccionadas

          // Eliminar publicaciones
          axios
            .put("/api/admin/post", {
                userIds: userIds 
            })
            .then((response) => {
              // Actualizar la lista de publicaciones en el estado local o cualquier otra acción necesaria
              const updatedPublications = currentPublications.filter(
                (publication) => !userIds.includes(publication.id)
              );
              setCurrentPublications(updatedPublications);

              Swal.fire({
                title: "¡Publicaciones eliminadas correctamente!",
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

  function handleClick(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
      setSelectedItemCount(selectedItemCount - 1);
    } else {
      setSelectedItems([...selectedItems, id]);
      setSelectedItemCount(selectedItemCount + 1);
    }
    setIsDeleteButtonDisabled(selectedItemCount + 1 > 1);
  }
  

  /* ----------PAGINATED ----------- */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredUsuarios.slice(
    indexOfFirstPublication,
    indexOfLastPublication
  );
  const isPageEmpty = currentPublications.length === 0;
  /* --------------------------------- */

  const buttonClass = selectedUserCount > 0 ? style.disabledButton : "";

  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Publicaciones</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div>
          {selectedItems.length > 1 && (
            <div className={style.checkbox_padre}>
              <h2>{`Cantidad de publicaciones seleccionadas: ${selectedItems.length}`}</h2>
              <button
                className={style.botonEliminar}
                onClick={handleDeletePublications}
              >
                Eliminar Publicaciones
              </button>
            </div>
          )}

          <div className={style.contenedorTable}>
            {currentPublications.length > 0 ? (
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>
                      <MdVerifiedUser />
                    </th>
                    <th>TITULO</th>
                    <th>CATEGORIA</th>
                    <th>PRECIO</th>
                    <th>TIPO</th>
                    <th>AUTOR</th>
                    <th>MARCA</th>
                    <th>CREADA</th>
                    <th>MODIFICADA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>

                <tbody className={style.bodyTabla}>
                  {currentPublications.map((d, i) => (
                    <tr className={style.namesTable} key={i}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(d.id)}
                          onChange={() => handleClick(d.id)}
                        />
                      </td>
                      <td>{d.title}</td>
                      <td>{d.category}</td>
                      <td>{d.price}</td>
                      <td>{d.type}</td>
                      <td>{d.author.email}</td>
                      <td>{d.brand}</td>
                      <td>{d.createdAt.slice(0, 10)}</td>
                      <td>{d.updatedAt.slice(0, 10)}</td>

                      <td className={style.td_button}>
                        {/* <button
                      className={`${style.botonEditar} ${buttonClass}`}
                      onClick={() => handleClick(d.id)}
                      disabled={selectedUserCount > 0}                      
                    >
                      <TiPencil size={30}/>
                    </button> */}
                        <button
                          className={`${style.botonDelete} ${buttonClass} ${
                            isDeleteButtonDisabled ? style.disabledButton : ""
                          }`}
                          onClick={() => handleDeleteClick(d.title, d.id)}
                          disabled={isDeleteButtonDisabled}
                        >
                          <TiDelete size={30} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={style.noUsuarios}>
                <p>No hay Publicaciones🚩</p>
              </div>
            )}
            {editingUser && (
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                <PublicationForm
                  editingUser={editingUser}
                  handleSubmit={handleSubmit}
                  setEditingUser={setEditingUser}
                />
              </Modal>
            )}
          </div>

          {/* ---------- PAGINATED ---------- */}

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
          {/* ------------------------------- */}
        </div>
      )}
    </div>
  );
}

export default Posts;
