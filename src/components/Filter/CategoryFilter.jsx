import React from 'react';

export default function CategoryFilter({ categories, selectedCategory, handleCategoryChange }) {   

  //console.log('estoyenCategoryFilter', selectedCategory)

  return (
    <div>
      <label htmlFor="category"></label>
      <div>
        <button onClick={handleCategoryChange} value="">Todas</button>
        {categories.map((category) => (
          <button onClick={handleCategoryChange} key={category} value={category}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}