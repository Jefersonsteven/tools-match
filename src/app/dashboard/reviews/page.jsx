"use client";
import style from "./reviews.module.css";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import UserForm from "../components/Form";
import axios from "axios";
import Swal from "sweetalert2";
import { icons } from "react-icons";
import { TiDelete } from "react-icons/ti";
import Paginated from "@/components/paginated/Paginated";
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
  const [selectedItemsEmails, setSelectedItemsEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const publicationsPerPage = 5;


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

  const handleDeleteClick = (title, id, userEmail) => {
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
            axios.post("/api/sendEmail/deleteReviews",{
              email: userEmail
            })
            const updatedUsers = records.filter((user) => user.id !== id);
            setRecords(updatedUsers);
            Swal.fire('¡Eliminada!', 'La reseña ha sido eliminada con éxito', 'success');
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
      setSelectedItemsEmails(selectedItemsEmails.filter((item) => item.id !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
      setSelectedItemCount(selectedItemCount + 1);
      const selectedUser = records.find((user) => user.id === id);
      setSelectedItemsEmails([...selectedItemsEmails, { id: id, email: selectedUser.author.email }]);
    }
    setIsDeleteButtonDisabled(selectedItemCount + 1 > 1);
  }

  const buttonClass = selectedUserCount > 1 ? style.disabledButton : '';

  const handleDeleteReviews = () => {
    if (selectedItems.length > 0) {
      const userIds = selectedItems; 
      const userEmails = selectedItemsEmails.map((item) => item.email);
      Swal.fire({
        title: `Eliminar ${selectedItems.length} reseñas`,
        text: `¿Estás seguro de eliminar las ${selectedItems.length} reseñas seleccionadas?`,
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
            .put("/api/admin/review", {
               userIds: userIds 
            })
            .then((response) => {
              axios.post("/api/sendEmail/deleteReviews",{
                email: userEmails
              })

            setSelectedUserCount(0);
              Swal.fire({
                title: "¡Reseñas eliminadas correctamente!",
                icon: "success",
              });
              fetchUsers();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };
 
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = filteredUsuarios.slice(
    indexOfFirstPublication,
    indexOfLastPublication
  );
  const isPageEmpty = currentPublications.length === 0;
    
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  return (
    <div className={style.contenedorPadre}>
      <div className={style.searchbarContainer}>
        <h2>Reseñas de los usuarios</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      {loading ? (
<div className={style.loaderContainer}>
<LoaderRadial />
</div>
    ) : ( <div>
      {selectedItems.length > 1 && (
  <div className={style.checkbox_padre}>
    <h2>{`Cantidad de Reseñas seleccionadas: ${selectedItems.length}`}</h2>
    <button className={style.botonEliminar} onClick={handleDeleteReviews}>Eliminar Reseñas</button>
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
                <th>PUNTAJE</th>
                <th>USUARIO</th>
                <th>CREADA</th>
                <th>AUTOR PUBLICACION</th>
                <th>ELIMINAR</th>
              </tr>
            </thead>
            <tbody className={style.bodyTabla}>
              {currentPublications.map((d, i) => (
                <tr className={style.namesTable} key={i}>
                  <td> <input
                    type="checkbox"
                    checked={selectedItems.includes(d.id)}
                    onChange={() => handleClick(d.id)}
                  /></td>
                  <td>{d.title}</td>
                  <td>{d.rating}</td>
                  <td>{d.author.email}</td>
                  <td>{d.createdAt.slice(0, 10)}</td>
                  <td>{d.received.email}</td>
                  <td className={style.td_button}>
                  <button
                    className={`${style.botonDelete} ${buttonClass} ${isDeleteButtonDisabled ? style.disabledButton : ''}`}
                    onClick={() => handleDeleteClick(d.title, d.id, d.author.email)}
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
            <p>No hay reseñas. . . . . 🚀</p>
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
      {filteredUsuarios.length > publicationsPerPage && (
            <Paginated
            currentPage={currentPage}
            publicationsPerPage={publicationsPerPage}
            totalPagesProp={Math.ceil(filteredUsuarios.length / publicationsPerPage)}
            onPageChange={handlePageChange}
            setCurrentPage={setCurrentPage}
          />
          )}
      </div>)}
    </div >
  );
}

export default Reviews;