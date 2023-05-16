"use client";
import { createContext, useState } from "react";

import saveInLocalStorage from "./assets/saveInLocalStorage";
import removeFromLocalStorage from "./assets/removeFromLocalStorage";
import endSession from "./assets/endSession";

import axios from "axios";
const AppContext = createContext();

function AppProvider({ children }) {
  // * Detalles de la publicación
  const [postDetail, setPostDetail] = useState({});
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("id")) || null
  );

  // * Formulario para crear publicaciones */
  const [form, setForm] = useState({
    title: "",
    content: "",
    photo: [],
    category: "",
    price: "",
    type: "",
    authorId: userId,
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    photo: "",
    category: "",
    price: "",
    type: "",
    authorId: "",
  });
  // *---------------------------------------* //

  // * Filtros *//
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rent, setRent] = useState("");
  const [sale, setSale] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [name, setName] = useState("");

  const [title, setTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);
  const [filter, setFilter] = useState("");

  const tools = async () => {
    const response = await axios.get("http://localhost:3000/api/admin/post");
    return response.data;
  };

  return (
    <AppContext.Provider
      value={{
        postDetail,
        setPostDetail,
        cards,
        setCards,
        selectedCategory,
        setSelectedCategory,
        title,
        setTitle,
        userId,
        setUserId,
        selectedType,
        setSelectedType,
        sortBy,
        setSortBy,
        searchTerm,
        setSearchTerm,
        tools,
        filteredCards,
        setFilteredCards,
        rent,
        setRent,
        sale,
        setSale,
        name,
        setName,
        filter,
        setFilter,
        userId,
        setUserId,

        userData,
        setUserData,
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
        userData,
        setUserData,
        saveInLocalStorage,
        removeFromLocalStorage,
        endSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
