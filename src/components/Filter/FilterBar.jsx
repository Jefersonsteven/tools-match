"use client";
import SearchBar from "../SearchBar/SearchBar";
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import { fetchCards } from "./UseFetchCard";
import style from "./FilterBar.module.css";

export default function FilterBar() {
  const { setCards, title, setTitle, selected, setSelected } =
    useContext(AppContext);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState(""); // Nuevo estado para el filtro de marca

  const handleTitleChange = async (newTitle) => {
    setTitle(newTitle);
    const response = await fetch(`/api/filters/title/${newTitle}`);
    if (newTitle.length === 0) {
      setSelected({ ...selected, title: "" });
    }
    const data = await response.json();
    setCards(data || []);
  };

  useEffect(() => {
    fetchCards(selected, setCards);
  }, [selected, setCards]);

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelected({ ...selected, category: categoryValue });
    setCategoryFilter(categoryValue);
  };

  const handleTypeChange = (event) => {
    const typeValue = event.target.value;
    setSelected({ ...selected, type: typeValue });
    setTypeFilter(typeValue);
  };

  const handleBrandChange = (event) => {
    const brandValue = event.target.value;
    setSelected({ ...selected, brand: brandValue });
    setBrandFilter(brandValue);
  };

  const handleOrderChange = (type, order) => {
    setSelected({ ...selected, order: { type, order } });
    setOrderFilter(`${type}-${order}`);
  };

  return (
    <AppProvider>
      <div className="relative z-10">
        <div className="flex-1 flex flex-row items-center justify-between px-2">
        <div className="mr-10" style={{ width: "400px" }}>
        <SearchBar
          title={title}
          onTitleChange={handleTitleChange}
          style={{ width: "150px" }}
        />
      </div>
          <div className={`mr-2 relative ${style.button}`}>
            <div className={`py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-xl`}>
              Filtrar <FaFilter className="ml-2" />
            </div>
            <div className={style.filter}>
            <div className={`mr-2 relative ${style.subButton}`}>  
              <div>Tipo de Transacción:</div>
              <div>
              <div className={style.type}>
                <button
                  onClick={handleTypeChange}
                  value=""
                  className={typeFilter === "" ? style.selected : ""}
                >
                  Todos
                </button>
                <button
                  onClick={handleTypeChange}
                  value="RENTAL"
                  className={typeFilter === "RENTAL" ? style.selected : ""}
                >
                  Arriendo
                </button>
                <button
                  onClick={handleTypeChange}
                  value="SALE"
                  className={typeFilter === "SALE" ? style.selected : ""}
                >
                  Venta
                </button>
              </div>
              </div>
              </div>
              <div className={`mr-2 relative ${style.subButton}`}>
              <div>Categoría:</div>
              <div>
              <div className={style.category}>
                <button
                  onClick={handleCategoryChange}
                  value=""
                  className={categoryFilter === "" ? style.selected : ""}
                >
                  Todas
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="electrica"
                  className={
                    categoryFilter === "electrica" ? style.selected : ""
                  }
                >
                  Eléctrica
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="manual"
                  className={categoryFilter === "manual" ? style.selected : ""}
                >
                  Manual
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="medicion"
                  className={
                    categoryFilter === "medicion" ? style.selected : ""
                  }
                >
                  Medición
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="corte"
                  className={categoryFilter === "corte" ? style.selected : ""}
                >
                  Corte
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="jardin"
                  className={categoryFilter === "jardin" ? style.selected : ""}
                >
                  Jardín
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="fontaneria"
                  className={
                    categoryFilter === "fontaneria" ? style.selected : ""
                  }
                >
                  Fontanería
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="pintar"
                  className={categoryFilter === "pintar" ? style.selected : ""}
                >
                  Pintar
                </button>
                <button
                  onClick={handleCategoryChange}
                  value="soldar"
                  className={categoryFilter === "soldar" ? style.selected : ""}
                >
                  Soldar
                </button>
                </div>
                </div>
              </div>
              <div className={`mr-2 relative ${style.subButton}`}>
              <div>Marca:</div>
              <div>
              <div className={style.brand}>
                <button
                  onClick={handleBrandChange}
                  value=""
                  className={brandFilter === "" ? style.selected : ""}
                >
                  Todas
                </button>
                <button
                  onClick={handleBrandChange}
                  value="philips"
                  className={brandFilter === "Phillips" ? style.selected : ""}
                >
                  Phillips
                </button>
                <button
                  onClick={handleBrandChange}
                  value="Stanley"
                  className={brandFilter === "Stanley" ? style.selected : ""}
                >
                  Stanley
                </button>
                <button
                  onClick={handleBrandChange}
                  value="Bosch"
                  className={brandFilter === "Bosch" ? style.selected : ""}
                >
                  Bosch
                </button>
                <button
                  onClick={handleBrandChange}
                  value="dewalt"
                  className={brandFilter === "Dewalt" ? style.selected : ""}
                >
                  Dewalt
                </button>
                <button
                  onClick={handleBrandChange}
                  value="skil"
                  className={brandFilter === "Skil" ? style.selected : ""}
                >
                  Skil
                </button>
                <button
                  onClick={handleBrandChange}
                  value="castellari"
                  className={brandFilter === "castellari" ? style.selected : ""}
                >
                  Castellari
                </button>
                <button
                  onClick={handleBrandChange}
                  value="dremel"
                  className={brandFilter === "dremel" ? style.selected : ""}
                >
                  Dremel
                </button>
                <button
                  onClick={handleBrandChange}
                  value="fischer"
                  className={brandFilter === "fischer" ? style.selected : ""}
                >
                  Fischer
                </button>
                <button
                  onClick={handleBrandChange}
                  value="karcher"
                  className={brandFilter === "karcher" ? style.selected : ""}
                >
                  Karcher
                </button>
                <button
                  onClick={handleBrandChange}
                  value="libus"
                  className={brandFilter === "libus" ? style.selected : ""}
                >
                  Libus
                </button>
                <button
                  onClick={handleBrandChange}
                  value="makita"
                  className={brandFilter === "makita" ? style.selected : ""}
                >
                  Makita
                </button>
                <button
                  onClick={handleBrandChange}
                  value="truper"
                  className={brandFilter === "truper" ? style.selected : ""}
                >
                  Truper
                </button>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex relative ${style.button}`}>
            <div className="py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-xl">
              Ordenar <FaSort className="ml-2" />
            </div>
            <div className={style.order}>
              <button
                onClick={() => handleOrderChange("", "")}
                className={orderFilter === "" ? style.selected : ""}
              >
                Default
              </button>
              <button
                onClick={() => handleOrderChange("alpha", "A-Z")}
                className={orderFilter === "alpha-asc" ? style.selected : ""}
              >
                Nombre (A-Z)
              </button>
              <button
                onClick={() => handleOrderChange("alpha", "Z-A")}
                className={orderFilter === "alpha-desc" ? style.selected : ""}
              >
                Nombre (Z-A)
              </button>
              <button
                onClick={() => handleOrderChange("price", "asc")}
                className={orderFilter === "price-asc" ? style.selected : ""}
              >
                Precio (Asc)
              </button>
              <button
                onClick={() => handleOrderChange("price", "desc")}
                className={orderFilter === "price-desc" ? style.selected : ""}
              >
                Precio (Des)
              </button>
              <button
                onClick={() => handleOrderChange("rating", "asc")}
                className={orderFilter === "rating-asc" ? style.selected : ""}
              >
                Rating (Asc)
              </button>
              <button
                onClick={() => handleOrderChange("rating", "desc")}
                className={orderFilter === "rating-desc" ? style.selected : ""}
              >
                Rating (Des)
              </button>
            </div>
          </div>
          <div className={`ml-8 relative ${style.button}`}>
          <div className={`py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-xl ${style.clear}`}>
          <span>Limpiar</span>
          <span>Filtros</span> 
            </div>
            </div>
        </div>
      </div>
      
    </AppProvider>
  );
}
