'use client'

import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
const [selectedCategory, setSelectedCategory] = useState('');
  const [rent, setRent] = useState('');
  const [sale, setSale] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [name, setName] = useState('');


    return (
        <AppContext.Provider value={{
            rent,
            setRent,
            sale,
            setSale,
            sortBy,
            setSortBy,
            name,
            setName,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppProvider, AppContext };