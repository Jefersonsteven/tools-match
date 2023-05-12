'use client'
import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [userId, setUserId] = useState("932a3adf-9203-4b25-89ca-777b00411730");
    const [postDetail, setPostDetail] = useState({})


    const [selectedCategory, setSelectedCategory] = useState('');    
    const [name, setName] = useState('');
    const [cards, setCards] = useState([]);   

    return (
        <AppContext.Provider value={{            
            postDetail,
            setPostDetail,
            cards,
            setCards,
            selectedCategory,
            setSelectedCategory,
            name,
            setName,
            userId,
            setUserId,
        }}>
            {children}
        </AppContext.Provider >
    );
}

export { AppProvider, AppContext };