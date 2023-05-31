import React from "react";
import style from "./SearchBar.module.css";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar({ title, onTitleChange, onTitleButton ,handleKeyPress}) {
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <div className={style.searchbar}>
      <input
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Buscar herramienta..."
        value={title}
        onChange={handleTitleChange}
      />
      <div className={style.icon}>
        <button className={style.searchButton} onClick={onTitleButton}>
          <IoSearchOutline />
        </button>
      </div>
    </div>
  );
}
