"use client";
import style from "./publications.module.css";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaToolbox } from "react-icons/fa";
import UserForm from "../components/Form";
import Swal from "sweetalert2";
import axios from "axios";
import Paginated from "@/components/paginated/Paginated";

export function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className={style.searchBar}>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
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

  /*----------PAGINATED----------*/
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 8;
  /*-------------------------------*/

  const handleDeleteUser = async (id) => {
    try {
      const userDelete = await axios.delete(
        `http://localhost:3000/api/admin/post/${id}`
      );
      console.log(userDelete.data);
      Swal.fire({
        title: "Usuario eliminado",
        text: "El usuario ha sido eliminado exitosamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error al Eliminar el Usuario",
        text: "Ha ocurrido un error al eliminar el usuario, por favor intenta de nuevo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios("/api/admin/post");
        const users = await response.data;

        if (users.length > 0) {
          const columns = Object.keys(users[0]).map((column) =>
            column.toUpperCase()
          );
          setColumns(columns);
          setRecords(users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [handleDeleteUser]);

  const filteredUsuarios = records.filter((usuario) => {
    return usuario.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleClick = (userId) => {
    const userToEdit = filteredUsuarios.find((user) => user.id === userId);
    setEditingUser(userToEdit);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedUser = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      phoneNumber: formData.get("phonenumber"),
      reports: formData.get("reports"),
    };
    axios
      .put(`/api/admin/post/${editingUser.id}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        setEditingUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClick = (firstname, id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás por eliminar al usuario "${firstname}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
      }
    });
  };

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
  /* --------------------------------- */
  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Publicaciones</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={style.contenedorTable}>
        {currentPublications.length > 0 ? (
          <table className={style.table}>
            <thead>
              <tr>
                <th>
                  <MdVerifiedUser />
                </th>
                <th>ID</th>
                <th>TITULO</th>
                <th>CATEGORIA</th>
                <th>CONTENIDO</th>
                <th>PRECIO</th>
                <th>TIPO</th>
                <th>AUTOR</th>
                <th>CREADA</th>
                <th>MODIFICADA</th>
              </tr>
            </thead>
            <tbody className={style.bodyTabla}>
              {currentPublications.map((d, i) => (
                <tr className={style.namesTable} key={i}>
                  <td>
                    <FaToolbox />
                  </td>
                  <td>{d.id}</td>
                  <td>{d.title}</td>
                  <td>{d.category}</td>
                  <td>{d.content}</td>
                  <td>{d.price}</td>
                  <td>{d.type}</td>
                  <td>{d.authorId}</td>
                  <td>{d.createdAt}</td>
                  <td>{d.updatedAt}</td>
                  <td>
                    <button
                      className={style.botonDelete}
                      onClick={() => handleDeleteClick(d.firstname, d.id)}
                    >
                      BAN
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
  );
}

export default Posts;
