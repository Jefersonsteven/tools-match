import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';


export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <AppProvider>
    <div>
      <label htmlFor="category">Categoria:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
    </AppProvider>
  );
}