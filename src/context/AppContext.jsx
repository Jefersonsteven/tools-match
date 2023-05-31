"use client";
import { createContext, useEffect, useState } from "react";

import saveInLocalStorage from "./assets/saveInLocalStorage";
import removeFromLocalStorage from "./assets/removeFromLocalStorage";
import endSession from "./assets/endSession";
import { newPetition } from "./assets/customFetch";
import checkSessionExpiration from "./assets/checkSessionExpiration";

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

  const [userPosts, setuserPosts] = useState([]);

  // * Formulario para crear publicaciones */
  const [form, setForm] = useState({
    title: "",
    content: "",
    photo: [],
    category: "",
    brand: "",
    price: "",
    type: "",
    authorId: userId,
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    photo: "",
    category: "",
    brand: "",
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
  const [isLoading, setIsLoading] = useState(false); //agregado por jean heyller
  const [range, setRange] = useState(0); // agregado por jean

  const [selected, setSelected] = useState({
    category: "",
    type: "",
    order: {
      type: "",
      order: "",
    },
    title: "",
    brand: "",
    coorde1: "",
    coorde2: "",
    km: "",
    country: "",
  }); //lo agrego JeanHey para filtros de cards en el back
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

  // *---------------------------------------* //
  // * Paginated *//
  const [currentPage, setCurrentPage] = useState(1); //agregado por Adriana

  // * Cart localStorage *//
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            count: 0,
            items: [],
          })
        );
      }
    }
  }, []);

  // * Cart *//
  const [cart, setCart] = useState(
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("cart")) //agregado por Adriana y Jefferson
  );

  useEffect(() => {
    checkSessionExpiration();
  }, []);

  // * Favorite *//
  const [favoriteArray, setFavoriteArray] = useState([]);

  const [favorite, setFavorite, isFavorite, setIsFavorite] = useState([]);

  // *---------------------------------------* //

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
        currentPage,
        setCurrentPage,
        countries,
        setCountries,
        newPetition,
        userPosts,
        setuserPosts,
        cart,
        setCart,
        favorite,
        setFavorite,
        isFavorite,
        setIsFavorite,
        favoriteArray,
        setFavoriteArray,
        isLoading,
        setIsLoading,
        range,
        setRange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
