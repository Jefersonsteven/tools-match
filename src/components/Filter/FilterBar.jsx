'use client'
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';

export default function FilterBar() {
  const { cards, setCards, title, setTitle, selectedType, setSelectedType, selectedCategory, setSelectedCategory, sortBy, setSortBy, selected, setSelected } = useContext(AppContext);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const handleTitleChange = async (newTitle) => {
    setTitle(newTitle);
    const response = await fetch(`/api/filter/${newTitle}`);
    const data = await response.json();
    setCards(data || []);
  };
  useEffect(() => {
    const getCategoryParam = () => selected.category ? `category=${selected.category}` : '';
    const getTypeParam = () => selected.type ? `type=${selected.type}` : '';

    const fetchCards = async () => {
      const categoryParam = getCategoryParam();
      const typeParam = getTypeParam();
      const orderParam = selected.order ? `order=${selected.order.order}&` : '';

      const response = await fetch(`/api/filter?${categoryParam}&${typeParam}`);
      const data = await response.json();
      let cards = data ||  [];

      if (selected.order?.type === 'price') {
        const orderResponse = await fetch(`/api/orderPrice?${orderParam}${typeParam}&${categoryParam}`);
        const orderData = await orderResponse.json();
        cards = orderData || [];
      }

      if (selected.order?.type === 'alpha') {
        const orderResponse = await fetch(`/api/orderAlphabetically?${orderParam}${typeParam}&${categoryParam}`);
        const orderData = await orderResponse.json();
        cards = orderData || [];
      }

      set
      setCards(cards);
    };

    fetchCards();
  }, [selected, setCards]);

  const handleCategoryChange = (event) => {
    setSelected({ ...selected, category: event.target.value }); // Mantener las propiedades existentes y actualizar solo la propiedad category
  };

  const handleTypeChange = (event) => {
    setSelected({ ...selected, type: event.target.value }); // Mantener las propiedades existentes y actualizar solo la propiedad type
  };

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
                value={selected.type}
                onChange={handleTypeChange}
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
                selectedCategory={selected.category}
                handleCategoryChange={handleCategoryChange}
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
                  onClick={() => setSelected({ ...selected, order: {
                    ...selected.order,
                    type: "alpha",
                    order: "A-Z"
                  } })}
                >
                  Nombre (A-Z)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSelected({ ...selected, order: {
                    ...selected.order,
                    type: "alpha",
                    order: "Z-A"
                  } })}
                >
                  Nombre (Z-A)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSelected({ ...selected, order: {
                    ...selected.order,
                    type: "price",
                    order: "asc"
                  } })}
                >
                  Precio (Asc)
                </button>
                <button
                  className="py-2 px-4 hover:bg-gray-200"
                  onClick={() => setSelected({ ...selected, order: {
                    ...selected.order,
                    type: "price",
                    order: "desc"
                  } })}
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
        <SearchBar title={title} onTitleChange={handleTitleChange} style={{ width: '150px' }} />
      </div>

    </AppProvider>
  )
}

