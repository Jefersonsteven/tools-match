import React from 'react';
import { FaSearch } from "react-icons/fa";

export default function SearchBarconCSS(props) {
  const { name, onNameChange } = props;

  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="flex justify-end w-full">
  <div className="w-1/3 mr-9 mt-9">
    <div className="relative w-full">
      
    <input
        type="text"
        placeholder="Buscar herramienta..."
        className="block w-full py-6 pl-8 pr-16 leading-tight rounded-full bg-white border-2 border-gray-300 focus:outline-none focus:border-blue-500 mr-2"
      />
      <button className="absolute top-0 right-0 mt-1.5 mr-1.5 p-6 rounded-full bg-green-500">
        <FaSearch className="text-white" />
      </button>
    </div>
  </div>
</div>
  );
}