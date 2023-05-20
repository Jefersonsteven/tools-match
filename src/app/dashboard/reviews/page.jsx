"use client";
import style from "./reviews.module.css";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import UserForm from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { icons } from "react-icons";
import { TfiPencilAlt } from "react-icons/tfi";


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

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);


  const handleDeleteUser = async (id) => {
    try {
      const userDelete = await axios.delete(`/api/admin/review/${id}`);
      console.log(userDelete.data);
      Swal.fire({
        title: 'Reseña eliminada',
        text: 'La reseña ha sido eliminada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error al Eliminar la reseña',
        text: 'Ha ocurrido un error al eliminar la reseña, porfavor intenta de nuevo',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })

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
      .put(`/api/admin/user/${editingUser.id}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        setEditingUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClick = () => {
    if (selectedItems.length > 0) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Estás por eliminar ${selectedItems.length} reseña(s)`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteSelected();
        }
      });
    } else {
      Swal.fire({
        title: 'No hay reseñas seleccionadas',
        text: 'Por favor, selecciona al menos una reseña para eliminar',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((itemId) => {
      handleDeleteUser(itemId);
    });

    setSelectedItems([]); // Limpiar los elementos seleccionados después de eliminarlos
  };






  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Reseñas de los usuarios</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={style.contenedorTable}>
        {filteredUsuarios.length > 0 ? (
          <table className={style.table}>
            <thead>
              <tr>
                <th><MdVerifiedUser /></th>

                <th>TITULO</th>
                <th>CONTENIDO</th>
                <th>PUNTAJE</th>
                <th>USUARIO</th>
                <th>CREADA</th>
                <th>MODIFICADA</th>
                <th>PUBLICACION</th>
                <th>AUTOR PUBLICACION</th>
              </tr>
            </thead>

            <tbody className={style.bodyTabla}>
              {filteredUsuarios.map((d, i) => (
                <tr className={style.namesTable} key={i}>
                  <td> <input
                    type="checkbox"
                    checked={selectedItems.includes(d.id)}
                    onChange={() => handleSelectItem(d.id)}
                  /></td>

                  <td>{d.title}</td>
                  <td>{d.content}</td>
                  <td>{d.rating}</td>
                  <td>{d.author.email}</td>
                  <td>{d.createdAt.slice(0, 10)}</td>
                  <td>{d.updatedAt.slice(0, 10)}</td>
                  <td>{d.post.title}</td>
                  <td>{d.received.email}</td>
                  <td>
                    <button
                      className={style.botonDelete}
                      onClick={handleDeleteClick}
                    >
                      BAN
                    </button>
                  </td>
                </tr>
              ))}



            </tbody>
          </table>
        ) : (
          <div className={style.noUsuarios}><p>No hay reseñas🚩</p></div>
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

      </div >
    </div >
  );
}

export default Users;
