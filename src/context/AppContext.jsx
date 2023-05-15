"use client";
import { createContext, useState } from "react";
import axios from "axios";
const AppContext = createContext();

function AppProvider({ children }) {
  // * El id del usuario de la Sesion
  const [userId, setUserId] = useState("289be228-6466-4dcc-b8e5-b94839c0de60");

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

  // * Detalles de la publicación
  const [postDetail, setPostDetail] = useState({});
  const [userData, setUserData] = useState(null);

  // * Filtros *//
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rent, setRent] = useState("");
  const [sale, setSale] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [name, setName] = useState("");
  // *----------------------------------* //


  //* Crear estado para saber si el usuario esta logeado o no (booleano)
  const [userSession, setUserSession] = useState(false);

    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([]);
    const [selectedType, setSelectedType] = useState('');    
    const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredCards, setFilteredCards] = useState([])   
    const [filter, setFilter] = useState('')


    const tools = async () => {
      const response = await axios.get('http://localhost:3000/api/admin/post');
      return response.data;
    }

    
    return (
        <AppContext.Provider value={{            
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
            userSession,
            setUserSession,
            userData,
            setUserData,
        form,
        setForm,
        errors,
        setErrors
        }}>
            {children}
        </AppContext.Provider >   
  );
}

export { AppProvider, AppContext };
