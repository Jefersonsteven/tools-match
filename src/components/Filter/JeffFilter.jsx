'use client'
import React, { useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

export default function FilterBar() {
  const { filter, tools, setFilter, cards, setCards, selectedCategory, setSelectedCategory, title, setTitle } = useContext(AppContext);


  useEffect(()=>{
    if (cards.length ===0)setCards(tools)
  }, [cards])

  function handleSort(sortBy) {
    const temp = [...cards]
    const sortedTools = temp.sort((a, b) => {
      if (sortBy === 'titleAsc') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'titleDesc') {
        return b.title.localeCompare(a.title);
      } else if (sortBy === 'priceAsc') {
        return a.price - b.price;
      } else if (sortBy === 'priceDesc') {
        return b.price - a.price;
      } else if (sortBy === 'ratingAsc') {
        return a.rating - b.rating;
      } else if (sortBy === 'ratingDesc') {
        return b.rating - a.rating;
      } else {
        return 0;
      }
    })
    // console.log(sortedTools)
    setFilter(sortedTools);
  }

  function handleFilter(selectedType = null, type = null) {
    const temp = [...cards]
    const filteredTools = temp.filter(
      (tool) => {
        if (selectedType === null) {
          if (type !== "Todas") return tool.category === type
          return tool
        }
        if (selectedType !== "ALLS") {
          if (selectedType === "SALE") {
            return tool.type === selectedType
          }
          if (selectedType === "LEASE") {
            return tool.type === selectedType
          }
        } else {
          return tool
        }

        // (!selectedCategory || tool.category === selectedCategory) &&
        //   (!title || tool.title.toLowerCase().includes(title.toLowerCase())) &&
        //   (!selectedType || tool.type === selectedType)
      }
    )
    setFilter(filteredTools)
  }

  return (
    <div className="flex flex-col w-64 bg-gray-100">
      <SearchBar title={title} onTitleChange={setTitle} />
      <CategoryFilter
        categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        handleFilter={handleFilter}
      />
      <div className="flex justify-between items-center py-2 px-4 bg-gray-200 font-medium">
        {/* <div>Ordenar por:</div> */}
        <div>
          <button
            className={`py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300`}
            onClick={() => {
              // setSelectedType('LEASE');
              handleFilter('LEASE');
            }}
          >
            Arriendo
          </button>
          <button
            className={`ml-2 py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300`}
            onClick={() => {
              // setSelectedType('SALE');
              handleFilter('SALE');
            }}
          >
            Venta
          </button>
          <button
            className={`ml-2 py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300`}
            onClick={() => {
              // setSelectedType('SALE');
              handleFilter('ALLS');
            }}
          >
            Todos
          </button>
        </div>
      </div>
      <button className="py-2 px-4 hover:bg-gray-200" onClick={() => { handleSort('nameAsc') }}>Nombre (A-Z)</button>
      <button className="py-2 px-4 hover:bg-gray-200" onClick={() => { handleSort('nameDes') }}>Nombre (Z-A)</button>
      <button className="py-2 px-4 hover:bg-gray-200" onClick={() => { handleSort('priceAsc') }}>Precio (asc)</button>
      <button className="py-2 px-4 hover:bg-gray-200" onClick={() => { handleSort('priceDesc') }}>Precio(desc)</button>
      <button className="py-2 px-4 hover:bg-gray-200" onClick={() => { handleSort('ratingAsc') }}>Rating (asc)</button>
      <button className="py-2 px-4 hover:bg-gray-200" onClick={() => { handleSort('ratingDesc') }}>Rating (des)</button>
    </div>
  );
}