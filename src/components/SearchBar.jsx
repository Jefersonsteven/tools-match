import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-gray-100 p-2">
      <BiSearch className="text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar herramientas"
        className="bg-transparent outline-none text-gray-700 flex-grow"
      />
    </div>
  );
};

export default SearchBar;