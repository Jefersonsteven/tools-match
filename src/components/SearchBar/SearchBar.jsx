import React from "react";
import { FaSearch } from "react-icons/fa";
import style from "./SearchBar.module.css";

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
      <div className={style.icon}>
        <FaSearch color="var(--white)" />
      </div>
    </div>
  );
}
