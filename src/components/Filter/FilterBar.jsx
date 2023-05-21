'use client'
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from 'react';
import { FaFilter, FaSort } from 'react-icons/fa';
import { fetchCards } from './UseFetchCard';
import style from "./FilterBar.module.css"


export default function FilterBar() {
  const { setCards, title, setTitle, selected, setSelected } = useContext(AppContext);

    const handleTitleChange = async (newTitle) => {
    setTitle(newTitle);
    const response = await fetch(`/api/filters/title/${newTitle}`);
    if (newTitle.length==0) {
      setSelected({...selected,title:""})
    }
    
    const data = await response.json();
    setCards(data || []);
  };

  useEffect(() => {
    fetchCards(selected, setCards);
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
          <div className={`mr-2 relative ${style.button}`}>
            <div
              className={`py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-none`}
            >
              Filtrar <FaFilter className="ml-2" />
            </div>
          <div className={style.filter}>
              <h3>Tipo de Transacción:</h3>
              <div>
                <button onClick={handleTypeChange} value="">Todos</button>
                <button onClick={handleTypeChange} value="RENTAL">Arriendo</button>
                <button onClick={handleTypeChange} value="SALE">Venta</button>
              </div>
              <h3>Categoría:</h3>
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
          </div>
          <div className={`flex relative ${style.button}`}>
            <div
              className="py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-none"
            >
              Ordenar <FaSort className="ml-2" />
            </div>
            <div className={style.order}>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "",
                    order: ""
                  }
                })}
              >
                Default
              </button>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "alpha",
                    order: "A-Z"
                  }
                })}
              >
                Nombre (A-Z)
              </button>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "alpha",
                    order: "Z-A"
                  }
                })}
              >
                Nombre (Z-A)
              </button>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "price",
                    order: "asc"
                  }
                })}
              >
                Precio (Asc)
              </button>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "price",
                    order: "desc"
                  }
                })}
              >
                Precio (Des)
              </button>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "rating",
                    order: "asc"
                  }
                })}
              >
                Rating (Asc)
              </button>
              <button
                onClick={() => setSelected({
                  ...selected, order: {
                    ...selected.order,
                    type: "rating",
                    order: "desc"
                  }
                })}
              >
                Rating (Des)
              </button>
            </div>

          </div>
        </div>
      </div>

      <div style={{ width: '400px' }}>
        <SearchBar title={title} onTitleChange={handleTitleChange} style={{ width: '150px' }} />
      </div>

    </AppProvider>
  )
}

