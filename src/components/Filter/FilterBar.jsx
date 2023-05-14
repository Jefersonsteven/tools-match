'use client'
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from 'react';


export default function FilterBar() {
  const { cards, setCards, title, setTitle, selectedType, setSelectedType, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useContext(AppContext);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };


  useEffect(()=>{
    FilterLechu()
  }, [title, selectedCategory, selectedType, sortBy]) 

  //console.log('selectedCategory', selectedCategory)
  // console.log('selectedType', selectedType)
  // console.log('title', title)
  // console.log('sortBy', sortBy)

  const FilterLechu = () => {    

    let myFilter = [...cards]
    if (title !== '') myFilter = myFilter.filter(tool => tool.title.toLowerCase().includes(title.toLowerCase()))
    if (title === '') myFilter = [...cards]
    if (selectedCategory !== '') myFilter = myFilter.filter (tool => tool.category == selectedCategory)
    if (selectedType !== '') myFilter = myFilter.filter (tool => tool.type === selectedType)
    if (sortBy !== '') {
      if (sortBy === 'titleAsc') {
        myFilter = myFilter.sort((a, b) => a.title.localeCompare(b.title));
      } if (sortBy === 'titleDesc') {
        myFilter = myFilter.sort((a, b) => b.title.localeCompare(a.title));
      } if (sortBy === 'priceAsc') {
        myFilter = myFilter.sort((a, b) => a.price - b.price);
      } if (sortBy === 'priceDesc') {
        myFilter = myFilter.sort((a, b) => b.price - a.price);
      } if (sortBy === 'ratingAsc') {
        myFilter = myFilter.sort((a, b) => a.rating - b.rating);
      } if (sortBy === 'ratingDesc') {
        myFilter = myFilter.sort((a, b) => b.rating - a.rating);
      }
    }
    setCards(myFilter);      
  }

    return (
      <AppProvider>
        <div className="flex flex-row w-full bg-gray-100">
          <div className="flex-1 flex flex-row items-center justify-center">
            <div className="mr-2">
              <button
                className="py-2 px-4 bg-black text-white hover:bg-gray-800"
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              >
                Filter
              </button>
            </div>
            {showFilterOptions && (
              <div>
                <div className="py-2 px-4 bg-gray-200 font-medium">
                  Tipo de transacción:
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="RENTAL">Arriendo</option>
                  <option value="SALE">Venta</option>
                </select>
                <div className="py-2 px-4 bg-gray-200 font-medium">Categoría:</div>
                <CategoryFilter
                  categories={[
                    'tecnologia',
                    'herramientas eléctricas',
                    'Excavación',
                    'Jardinería'
                  ]}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-row items-center justify-center">
            <div className="mr-2">
              <button
                className="py-2 px-4 bg-black text-white hover:bg-gray-800"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                Sort
              </button>
            </div>
            {showSortOptions && (
              <div>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('')}
                >
                  Default
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('titleAsc')}
                >
                  Nombre (A-Z)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('titleDesc')}
                >
                  Nombre (Z-A)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('priceAsc')}
                >
                  Precio (Asc)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('priceDesc')}
                >
                  Precio (Des)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('ratingAsc')}
                >
                  Rating (Asc)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSortBy('ratingDesc')}
                >
                  Rating (Des)
                </button>
              </div>
            )}
          </div>
        <SearchBar title={title} onTitleChange={handleTitleChange} />  
      </div>
    </AppProvider>
  )}