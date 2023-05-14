"use client";
import { createContext, useState } from "react";
import axios from "axios";
const AppContext = createContext();

function AppProvider({ children }) {
  const [userId, setUserId] = useState("932a3adf-9203-4b25-89ca-777b00411730");
  const [postDetail, setPostDetail] = useState({});

  const [selectedCategory, setSelectedCategory] = useState("");
  const [rent, setRent] = useState("");
  const [sale, setSale] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [name, setName] = useState("");
  /* Crear estado para saber si el usuario esta logeado o no (booleano) */
  const [userSession, setUserSession] = useState(false);
 
    const [title, setTitle] = useState('');
    const [cards, setCards] = useState([]);
    const [selectedType, setSelectedType] = useState('');    
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredCards, setFilteredCards] = useState(cards)   
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
        }}>
            {children}
        </AppContext.Provider >   
  );
}

export { AppProvider, AppContext };
