"use client";
import style from "./users.module.css";
import Modal from "../components/Modal";
import { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import UserForm from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { icons } from "react-icons";

/*PARA PAGINATED*/
import Paginated from "@/components/paginated/Paginated";
/*-----------------*/

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

/*MODIFICADO PARA PAGINATED*/

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const filteredUsuarios = records.filter((usuario) => {
    return usuario.firstname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  /*---------- PAGINATED ----------*/
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedUsers = filteredUsuarios.slice(startIndex, endIndex);
  /*-------------------------------*/

  const handleDeleteUser = async (id) => {
    try {
      const userDelete = await axios.delete(`/api/admin/user/${id}`);
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
        text: "Ha ocurrido un error al eliminar el usuario, porfavor intenta de nuevo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios("/api/admin/user"); //PAGINATED
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

  // const filteredUsuarios = records.filter((usuario) => {
  //   return usuario.firstname.toLowerCase().includes(searchTerm.toLowerCase());
  // });

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

    Swal.fire({
      title: "¿Estás seguro de los cambios?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/api/admin/user/${editingUser.id}`, updatedUser)
          .then((response) => {
            console.log(response.data);
            setEditingUser(null);
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

  const handleDeleteClick = (firstname, id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás por eliminar al usuario "${firstname}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
      }
    });
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
            <thead>
              <tr>
                <th>
                  <MdVerifiedUser />
                </th>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>EMAIL</th>
                <th>TELEFONO</th>
                <th>RANGO</th>
                <th>LOGGIN</th>
                <th>HIDDEN</th>
                <th>CP</th>
                <th>REPORTES</th>
                <th>PUBLICACIONES</th>
                <th>RESEÑAS</th>
                <th>ORDENES</th>
              </tr>
            </thead>

            <tbody className={style.bodyTabla}>
              {displayedUsers.map((d, i) => (
                <tr className={style.namesTable} key={i}>
                  <td>
                    <FaRegUserCircle />
                  </td>
                  <td>{d.id}</td>
                  <td>{d.firstname}</td>
                  <td>{d.lastname}</td>
                  <td>{d.email}</td>
                  <td>{d.phoneNumber}</td>
                  <td>{d.admin ? "Admin" : "Usuario"}</td>
                  <td>{d.logged ? "Conectado" : "Desconectado"}</td>
                  <td>{d.hidden ? "True" : "False"}</td>
                  <td>{d.zipCode ? "True" : "False"}</td>
                  <td>{d.reports}</td>
                  <td>{d.posts.length}</td>
                  <td>{d.reviews.length}</td>
                  <td>{d.orders.length}</td>
                  <td>
                    <button
                      className={style.botonEditar}
                      onClick={() => handleClick(d.id)}
                    >
                      EDITAR
                    </button>
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
            <p>No hay Usuarios🚩</p>
          </div>
        )}
      </div>
      {/*--------- PAGINATED ---------- */}
      {filteredUsuarios.length > 0 && (
        <Paginated
          url={`/api/admin/paginatedUser?page=${currentPage}&limit=${perPage}`}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {/*------------------------------ */}
    </div>
  );
}

export default Users;
