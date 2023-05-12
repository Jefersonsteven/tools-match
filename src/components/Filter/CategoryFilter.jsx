import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';


export default function CategoryFilter({ handleFilter, categories, selectedCategory, onCategoryChange }) {
  return (
    <div>
      <label htmlFor="category">Categoria:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => {
          const value = event.target.value;
          onCategoryChange(value)
          handleFilter(null, value)
        }}
      >
        <option value="Todas">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}