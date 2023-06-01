"use client";
import style from "./publications.module.css";
import Modal from "../components/Modal";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import Paginated from "@/components/paginated/Paginated";
import { TiDelete } from "react-icons/ti";
import PublicationForm from "../components/PublicationForm";
import Link from "next/link";
import LoaderRadial from "@/components/Loader/LoaderRadial";

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
  const [selectedItemsTitles, setSelectedItemsTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  /*----------PAGINATED----------*/
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 5;
  /*-------------------------------*/

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

const handleDeleteClick = (title, id, emailAutor) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar a la publicacion ${title}?`,
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
          .delete(`/api/admin/post/${id}`)
          .then((response) => {
            // Actualizar la lista de usuarios en el estado local
            const updatedUsers = records.filter((user) => user.id !== id);
            setRecords(updatedUsers);
            axios
            .post('/api/sendEmail/deletePost', { 
              email: emailAutor,
              title: title      
            })
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

const [selectedItemsEmails, setSelectedItemsEmails] = useState([]);

  const handleDeletePublications = () => {
    if (selectedItems.length > 0) {
      const userIds = selectedItems; // Aquí obtienes los IDs de las publicaciones seleccionadas
      const userEmails = selectedItemsEmails.map((item)=>item.email);
      const titlePost = selectedItemsTitles.map((item) => item.title);
      Swal.fire({
        title: `Eliminar ${selectedItems.length} publicaciones`,
        text: `¿Estás seguro de eliminar las ${selectedItems.length} publicaciones seleccionadas?`,
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
            .put("/api/admin/post", {
                userIds: userIds 
            }).then(()=> {
              axios.post("/api/sendEmail/deletePost", {
                email: userEmails,
                title: titlePost
              });
              fetchUsers();
            })
            .then((response) => {
              setSelectedItems([]);
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
      setSelectedItemsEmails(selectedItemsEmails.filter((item) => item.id !== id));
      setSelectedItemsTitles(selectedItemsTitles.filter((item) => item.id !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
      setSelectedItemCount(selectedItemCount + 1);
      const selectedPublication = currentPublications.find((publication) => publication.id === id);
      setSelectedItemsEmails([...selectedItemsEmails, { id: id, email: selectedPublication.author.email }]);
      setSelectedItemsTitles([...selectedItemsTitles, { id: id, title: selectedPublication.title }]);
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
        
<div className={style.loaderContainer}>
<LoaderRadial />
</div>
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
                    <th>ELIMINAR</th>
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
                      <td><Link className={style.nombrePerfil} href={`/post/${d.id}`}>{d.title}</Link></td>
                      <td>{d.category}</td>
                      <td>{d.price}</td>
                      <td>{d.type === "SALE" ? "Venta " : "Renta "}</td>
                      <td>{d.author.email}</td>
                      <td>{d.brand}</td>
                      <td>{d.createdAt.slice(0, 10)}</td>
                      <td>{d.updatedAt.slice(0, 10)}</td>
                      <td className={style.td_button}>
                        <button
                          className={`${style.botonDelete} ${buttonClass} ${
                            isDeleteButtonDisabled ? style.disabledButton : ""
                          }`}
                          onClick={() => handleDeleteClick(d.title, d.id, d.author.email)}
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
            <p>No hay publicaciones. . . . . 🚀</p>
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
