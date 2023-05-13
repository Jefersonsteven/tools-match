'use client'
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';
import React, { useEffect, useState } from 'react';

export default function FilterBar() {
  const { cards, setCards, tools, title, setTitle, selectedType, setSelectedType, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useContext(AppContext);

  useEffect(()=>{
    if (cards.length ===0)setCards(tools)
  }, [cards])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filteredTools = tools.filter(
      (tool) =>
        (!selectedType || tool.type === selectedType) &&
        (!title || tool.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedCategory ? tool.category === selectedCategory : true)
    );
    setCards(filteredTools);
  };

  const handleTitleChange = (title) => {
    setTitle(title);
    const filteredTools = tools.filter(
      (tool) =>
        (!selectedType || tool.type === selectedType) &&
        (!title || tool.title.toLowerCase().includes(title.toLowerCase())) &&
        (!selectedCategory || tool.category === selectedCategory)
    );
    setCards(filteredTools);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const filteredTools = tools.filter(
      (tool) =>
        (!selectedCategory || tool.category === selectedCategory) &&
        (!title || tool.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedType ? tool.type === selectedType : true)
    );
    setCards(filteredTools);
  };

    const handleSort = (sortBy) => {
    setSortBy(sortBy);
    let sortedTools = [...cards];
    if (sortBy === 'titleAsc') {
      sortedTools.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'titleDesc') {
      sortedTools.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'priceAsc') {
      sortedTools.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      sortedTools.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'ratingAsc') {
      sortedTools.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'ratingDesc') {
      sortedTools.sort((a, b) => b.rating - a.rating);
    }
    setCards(sortedTools);
  };

  const handleRentClick = () => {
    setSelectedType('LEASE');
    setCards(tools.filter((tool) => tool.type === 'LEASE'));
  };

  const handleSaleClick = () => {
    setSelectedType('SALE');
    setCards(tools.filter((tool) => tool.type === 'SALE'));  
  };


  return (
    <AppProvider>
      <div className="flex flex-col w-64 bg-gray-100">
  <SearchBar name={title} onTitleChange={setTitle} />
  <CategoryFilter
    categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
  />
  <button onClick={handleRentClick}>Arriendo</button>
  <button onClick={handleSaleClick}>Venta</button>
  <div className="py-2 px-4 bg-gray-200 font-medium">Ordenar por:</div>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('titleAsc')}>Nombre (A-Z)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('titleDesc')}>Nombre (Z-A)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('priceAsc')}>Precio (Asc)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('priceDesc')}>Precio (Des)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('ratingAsc')}>Rating (Asc)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('ratingDesc')}>Rating (Des)</button>
</div>
{/* <div>
        <ul>
          {filteredTools.map((tool) => (
            <li key={tool.title}>
              {tool.title} - {tool.category} - ${tool.price} - {tool.type} - {tool.rating} Jeffersons - 
            </li>
          ))}
        </ul>
      </div> */}
    </AppProvider>
  );
}