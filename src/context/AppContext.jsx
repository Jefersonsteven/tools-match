"use client";
import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {

  // * El id del usuario de la Sesion
  const [userId, setUserId] = useState("932a3adf-9203-4b25-89ca-777b00411730");

  // * Formulario para crear publicaciones */
  const [form, setForm] = useState({
    title: '',
    content: '',
    photo: [],
    category: '',
    price: '',
    type: '',
    authorId: userId
  });

  const [errors, setErrors] = useState({
    title: '',
    content: '',
    photo: '',
    category: '',
    price: '',
    type: '',
    authorId: ''
  });
// *---------------------------------------* //

  // * Detalles de la publicación
  const [postDetail, setPostDetail] = useState({});

  // * Filtros *//
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rent, setRent] = useState("");
  const [sale, setSale] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [name, setName] = useState("");
  // *----------------------------------* //


  //* Crear estado para saber si el usuario esta logeado o no (booleano)
  const [userSession, setUserSession] = useState(false);

  return (
    <AppContext.Provider
      value={{
        form,
        setForm,
        errors,
        setErrors,
        postDetail,
        setPostDetail,
        selectedCategory,
        setSelectedCategory,
        rent,
        setRent,
        sale,
        setSale,
        sortBy,
        setSortBy,
        name,
        setName,
        userId,
        setUserId,
        userSession,
        setUserSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
