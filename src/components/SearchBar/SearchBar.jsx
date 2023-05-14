import React from 'react';
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ title, onTitleChange }) {

  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar herramienta..."
        className="block w-full py-5 pl-8 pr-16 leading-tight rounded-full bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
        value={title}
        onChange={handleTitleChange}
      />
      <button className="absolute top-0 right-0 mt-1.5 mr-1.5 p-5 rounded-full bg-green-500">
        <FaSearch className="text-white" />
      </button>
    </div>
  );
}