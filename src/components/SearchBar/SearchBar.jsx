import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

export default function SearchBar({title, setTitle}) {

 
  return (
    <AppProvider>
    <div>
      <input
        type="text"
        placeholder="Buscar herramienta..."
        //value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />
    </div>
    </AppProvider>
  );
}