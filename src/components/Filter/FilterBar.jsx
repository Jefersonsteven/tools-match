'use client'
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';



export default function FilterBar() {
  const { cards, setCards, title, setTitle, selectedType, setSelectedType, selectedCategory, setSelectedCategory, sortBy, setSortBy, filteredCards, setFilterdCards } = useContext(AppContext);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const FilterLechu = () => {        

    let myFilter = [...cards] 
    if (title !== '') myFilter = [...filteredCards].filter(tool => tool.title.toLowerCase().includes(title.toLowerCase()))
    if (title === '') myFilter = [...filteredCards]
    if (selectedCategory !== '') myFilter = [...filteredCards].filter (tool => tool.category == selectedCategory)
    if (selectedType !== '') myFilter = [...filteredCards].filter (tool => tool.type === selectedType)
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

  useEffect(()=>{
    FilterLechu()
  }, [title, selectedCategory, selectedType, sortBy])

  return (
    <AppProvider>
       <div className="relative z-10">
      <div className="flex-1 flex flex-row items-center flex justify-between px-2">
        <div className="mr-2">
          <button
            className="py-4 px-40 bg-black text-white hover:bg-gray-800 mr-4 flex items-center"
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            Filtrar <FaFilter className="ml-2" />
          </button>
        </div>
        {showFilterOptions && (
          <div className="absolute bg-white shadow mt-1 top-12 left-0">
              <div className="py-2 px-4 bg-gray-200 font-medium">Tipo de Transacción</div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="RENTAL">Arriendo</option>
                <option value="SALE">Venta</option>
              </select>
              <div className="py-2 px-4 bg-gray-200 font-medium">Categoría</div>
              <CategoryFilter
                categories={[
                  'electrica',
                    'manual',
                    'medicion',
                    'corte',
                    'jardin',
                    'fontaneria',
                    'pintar',
                    'soldar',
                ]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          )}
  
  <div className="flex space-x-4 relative">
          <button
            className="py-4 px-40 bg-black text-white hover:bg-gray-800 mr-4 flex items-center"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            Ordenar <FaSort className="ml-2" />
          </button>
          {showSortOptions && (
            <div className="absolute bg-white shadow mt-1 top-12 left-0">
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
        </div>
      </div>     
  
          <div style={{ width: '400px' }}>
        <SearchBar title={title} onTitleChange={handleTitleChange} style={{ width: '150px' }}/> 
        </div> 
      
    </AppProvider>
  )}

