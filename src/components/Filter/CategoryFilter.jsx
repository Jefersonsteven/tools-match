import React from 'react';

export default function CategoryFilter({ categories, selectedCategory, handleCategoryChange }) {   

  //console.log('estoyenCategoryFilter', selectedCategory)

  return (
    <div>
      <label htmlFor="category"></label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}