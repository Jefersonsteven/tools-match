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
import { TiDelete, TiPencil } from "react-icons/ti";
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

function Reviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false);
  const [selectedUserCount, setSelectedUserCount] = useState(0);


  const [loading, setLoading] = useState(false);


  






  // const handleDeleteUser = async (id) => {
  //   try {
  //     const userDelete = await axios.delete(`/api/admin/review/${id}`);
  //     console.log(userDelete.data);
  //     Swal.fire({
  //       title: 'Reseña eliminada',
  //       text: 'La reseña ha sido eliminada exitosamente',
  //       icon: 'success',
  //       confirmButtonText: 'Aceptar'
  //     });
  //     fetchUsers();
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       title: 'Error al Eliminar la reseña',
  //       text: 'Ha ocurrido un error al eliminar la reseña, porfavor intenta de nuevo',
  //       icon: 'error',
  //       confirmButtonText: 'Aceptar',
  //     })

  //   }
  // };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios("/api/admin/review");
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

 

  const handleDeleteClick = (title, id) => {
    Swal.fire({
      title: `¿Seguro que quieres eliminar la reseña ${title}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/admin/review/${id}`)
          .then(response => {
            const updatedUsers = records.filter((user) => user.id !== id);
            setRecords(updatedUsers);
            Swal.fire('¡Eliminada!', 'La reseña ha sido eliminada con éxito', 'success');
            // Aquí puedes agregar lógica adicional, como actualizar el estado del componente o redirigir a otra página.
          })
          .catch(error => {
            Swal.fire('Error', 'Hubo un error al reseña la publicación', 'error');
            console.error(error);
          });
      }
    });
  };

 

  const handleDeleteSelected = () => {
    selectedItems.forEach((itemId) => {
      handleDeleteUser(itemId);
    });

    setSelectedItems([]); // Limpiar los elementos seleccionados después de eliminarlos
  };


  function handleClick(id) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
      setSelectedItemCount(selectedItemCount - 1);
    } else {
      setSelectedItems([...selectedItems, id]);
      setSelectedItemCount(selectedItemCount + 1);
    }
  
    setIsDeleteButtonDisabled(selectedItemCount + 1 > 1);
  }

  
  const buttonClass = selectedUserCount > 1 ? style.disabledButton : '';



  const handleDeleteReviews = () => {
    if (selectedItems.length > 0) {
      Swal.fire({
        title: `Eliminar ${selectedItems.length} reseñas`,
        text: `¿Estás seguro de eliminar las ${selectedItems.length} reseñas seleccionadas?`,
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
            .put("/api/admin/review", {
               userIds: userIds 
            })
            .then((response) => {
              // Actualizar la lista de publicaciones en el estado local o cualquier otra acción necesaria
              const updatedPublications = currentPublications.filter(publication => !userIds.includes(publication.id));
              setCurrentPublications(updatedPublications);
  
              Swal.fire({
                title: "¡Reseñas eliminadas correctamente!",
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





  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Reseñas de los usuarios</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>


      {loading ? (
      <Loader />
    ) : ( <div>


      {selectedItems.length > 1 && (
  <div className={style.checkbox_padre}>
    <h2>{`Cantidad de Reseñas seleccionadas: ${selectedItems.length}`}</h2>
    <button className={style.botonEliminar} onClick={handleDeleteReviews}>Eliminar Reseñas</button>
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
                    onChange={() => handleClick(d.id)}
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
                    className={`${style.botonDelete} ${buttonClass} ${isDeleteButtonDisabled ? style.disabledButton : ''}`}
                    onClick={() => handleDeleteClick(d.title, d.id)}
                    disabled={isDeleteButtonDisabled}
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
            <p>No hay reseñas🚩</p>
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

      </div >
      </div>)}
    </div >
  );
}

export default Reviews;
