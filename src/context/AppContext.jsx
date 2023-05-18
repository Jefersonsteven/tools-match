"use client";
import { createContext, useState } from "react";

import saveInLocalStorage from "./assets/saveInLocalStorage";
import removeFromLocalStorage from "./assets/removeFromLocalStorage";
import endSession from "./assets/endSession";
import { newPetition } from "./assets/customFetch";


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
  const [currentPage, setCurrentPage] = useState(1);

  const [selected, setSelected] = useState({ category: '', type: '' ,order: {
    type:'',
    order:''
  }});//lo agrego JeanHey para filtros de cards en el back
  // * Data de países *//

  const [countries, setCountries] = useState({
    null: "---",
    AR: "Argentina",
    BO: "Bolivia",
    BR: "Brasil",
    CL: "Chile",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    EC: "Ecuador",
    SV: "El Salvador",
    GT: "Guatemala",
    HT: "Haití",
    HN: "Honduras",
    MX: "México",
    NI: "Nicaragua",
    PA: "Panamá",
    PY: "Paraguay",
    PE: "Perú",
    DO: "República Dominicana",
    UY: "Uruguay",
    VE: "Venezuela",
  });

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
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

        countries,
        setCountries,
        newPetition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
