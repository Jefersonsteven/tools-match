'use client'
import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [userId, setUserId] = useState("932a3adf-9203-4b25-89ca-777b00411730");
    const [postDetail, setPostDetail] = useState({})


    const [selectedCategory, setSelectedCategory] = useState('');
    const [rent, setRent] = useState('');
    const [sale, setSale] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [name, setName] = useState('');

    return (
        <AppContext.Provider value={{
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
        }}>
            {children}
        </AppContext.Provider >
    );
}

export { AppProvider, AppContext };