import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

export default function SearchBar({ title, onTitleChange }) {
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <div className={style.searchbar}>
      <input
        type="text"
        placeholder="Buscar herramienta..."
        value={title}
        onChange={handleTitleChange}
      />
      <button
        className={`${styles.searchBarButton} absolute top-0 right-0 mt-1.5 mr-1.5 p-5 rounded-full bg-green-500 ml`}
      >
        <FaSearch className="text-white" />
      </button>
    </div>
  );
}
