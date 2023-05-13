"use client"
import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';
import Card from '../Cards/Card';
import SearchBarconCSS from '../SearchBar/SearchBarconCSS';

export default function FilterBar() {
  const { selectedType, setSelectedType, cards, setCards, selectedCategory, setSelectedCategory, title, setTitle } = useContext(AppContext);

  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(()=>{
    if (cards.length ===0)setCards(cards)
    console.log(cards)
  }, [cards])

  function handleSort(sortBy){
    const sortedTools = cards.sort((a, b) => {
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
    setCards(sortedTools);    
  }

  function handleFilter(){
    const filteredTools = [...cards].filter(
      (tool) =>
        (!selectedCategory || tool.category === selectedCategory) &&        
        (!title || tool.title.toLowerCase().includes(title.toLowerCase()))&&
        (!selectedType || tool.type === selectedType)
    ) 
    setCards(filteredTools)
  }
  return (
    <AppProvider>
      <div className="flex flex-col w-64 bg-gray-100">
        <div className="flex justify-between items-center py-2 px-4 bg-gray-200 font-medium">
          <button
            className="py-2 px-4 hover:bg-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </button>
          <button
            className="py-2 px-4 hover:bg-gray-200"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            Sort
          </button>
        </div>
        {showFilters && (
          <div className="py-4 px-4 bg-white">
            <CategoryFilter
              categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="flex justify-between py-2">
              {/* <SearchBarconCSS title={title} onTitleChange={setTitle} /> */}
              <button
                className="py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleFilter}
              >
                Apply
              </button>
            </div>
          </div>
        )}
        {showSortOptions && (
          <div className="py-4 px-4 bg-white">
            <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('titleAsc')}>
              Title (A-Z)
            </button>
            <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('titleDesc')}>
              Title (Z-A)
            </button>
            <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('priceAsc')}>
              Price (asc)
            </button>
            <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('priceDesc')}>
              Price (desc)
            </button>
            <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('ratingAsc')}>
              Rating (asc)
            </button>
            <button className="py-2 px-4 hover:bg-gray-200" onClick={() => handleSort('ratingDesc')}>
              Rating (desc)
            </button>
          </div>
        )}
      </div>
    </AppProvider>
  );
}
  
  
  
  
  
  