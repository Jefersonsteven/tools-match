"use client";
import { createContext, useState } from "react";

import saveInLocalStorage from "./assets/saveInLocalStorage";
import removeFromLocalStorage from "./assets/removeFromLocalStorage";
import endSession from "./assets/endSession";

const AppContext = createContext();

function AppProvider({ children }) {
  // * Detalles de la publicación
  const [postDetail, setPostDetail] = useState({});
  const [userData, setUserData] = useState(
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("token"))
  );
  const [userId, setUserId] = useState(
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("id"))
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

  const [selected, setSelected] = useState({
    category: "",
    type: "",
    order: {
      type: "",
      order: "",
    },
  }); //lo agrego JeanHey para filtros de cards en el back

  return (
    <AppContext.Provider
      value={{
        selected,
        setSelected,
        postDetail,
        setPostDetail,
        cards,
        setCards,
        title,
        setTitle,
        selectedType,
        setSelectedType,
        sortBy,
        setSortBy,
        searchTerm,
        setSearchTerm,
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
        form,
        setForm,
        errors,
        setErrors,
        postDetail,
        setPostDetail,
        selectedCategory,
        setSelectedCategory,
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
