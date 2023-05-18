"use client";
import style from "./payments.module.css";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import UserForm from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";

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

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      fetchUsers();
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

  const fetchUsers = async () => {
    try {
      const response = await axios("/api/admin/user");
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsuarios = records.filter((usuario) => {
    return usuario.firstname.toLowerCase().includes(searchTerm.toLowerCase());
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
      .put(`/api/admin/user/${editingUser.id}`, updatedUser)
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

  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Administracion de Pagos</h2>
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
                <th>NOMBRE</th>
                <th>APELLIDO</th>
                <th>EMAIL</th>
                <th>TELEFONO</th>
                <th>REPORTS</th>
              </tr>
            </thead>

            <tbody className={style.bodyTabla}>
              {filteredUsuarios.map((d, i) => (
                <tr className={style.namesTable} key={i}>
                  <td>
                    <FaRegUserCircle />
                  </td>
                  <td>{d.firstname}</td>
                  <td>{d.lastname}</td>
                  <td>{d.email}</td>
                  <td>{d.phoneNumber}</td>
                  <td>{d.reports}</td>
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
            <p>No hay Pagos</p>
          </div>
        )}
        {editingUser && (
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <UserForm
              editingUser={editingUser}
              handleSubmit={handleSubmit}
              setEditingUser={setEditingUser}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Users;
