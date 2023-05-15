import React from 'react';

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {   

  //console.log('estoyenCategoryFilter', selectedCategory)

  return (
    <div>
      <label htmlFor="category">Categoria:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
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