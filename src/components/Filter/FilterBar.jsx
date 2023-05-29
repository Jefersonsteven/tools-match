"use client";
import SearchBar from "../SearchBar/SearchBar";
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import { fetchCards } from "./UseFetchCard";
import style from "./FilterBar.module.css";
import { FaGlobeAmericas } from 'react-icons/fa'
import {
  handleTitleChange,
  handleTitleButtonChange,
  handleCategoryChange,
  handleTypeChange,
  handleBrandChange,
  handleOrderChange,
  handleClearFilters,
  handleKmChange,
  handleCountryChange
} from "./handlers";
import FilterRangeDistance from "../FilterRangeDistance/FilterRangeDistance";
import { AiOutlineClear } from "react-icons/ai";

export default function FilterBar() {
  const { setCards, title, setTitle, selected, setSelected,userId } =
    useContext(AppContext);
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState(""); // Nuevo estado para el filtro de marca

  useEffect(() => {
    fetchCards(selected, setCards, title,userId);
  }, [selected]);


  const handleTitle = (newTitle) => {
    handleTitleChange(newTitle, setTitle, setSelected, selected);
  };

  const handleTitleButton = () => {
    handleTitleButtonChange(title, setCards, setSelected, selected,userId);
  };

  const handleCategory = (event) => {
    handleCategoryChange(event, setSelected, setCategoryFilter);
  };
  const handleType = (event) => {
    handleTypeChange(event, setSelected, setTypeFilter);
  };

  const handleBrand = (event) => {
    handleBrandChange(event, setSelected, setBrandFilter);
  };

  const handleOrder = (type, order) => {
    handleOrderChange(type, order, setSelected, setOrderFilter);
  };

  // handleKm - Jeffer
  const handleKm = (km, coorde1, coorde2) => {
    handleKmChange(setSelected, km, coorde1, coorde2);
  };

  const handleCountry = (event) => {
    handleCountryChange(event,setSelected);
  };

  const handleCleanFilters = () => {
    handleClearFilters(
      setSelected,
      setCategoryFilter,
      setTypeFilter,
      setBrandFilter,
      setOrderFilter
    );
  };

  return (
    <AppProvider>
      <div className="relative z-10">
      <div className="mr-10 ml-2" style={{ width: "400px" }}>
      <FilterRangeDistance handleKm={handleKm}  />
      </div>
        <div className="flex-1 flex flex-row items-center justify-between px-2">
          <div className="mr-10" style={{ width: "400px" }}>
            {/* // filter per distance - Jeffer */}
            
            <SearchBar
              title={title}
              onTitleChange={handleTitle}
              onTitleButton={handleTitleButton}
              style={{ width: "150px" }}
            />
          </div>
          <div className={`flex relative mr-2 ${style.button}`}>
            <div className="py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-xl ">
              Pais <FaGlobeAmericas className="ml-2" />
            </div>
            <div className={style.order}>
              <button
                value=""
                onClick={handleCountry}
                className={orderFilter === "" ? style.selected : ""}
              >
                Todos
              </button>
              <button
                value="CO"
                onClick={handleCountry}
                className={orderFilter === "alpha-asc" ? style.selected : ""}
              >
                Colombia
              </button>
              <button
                value="MEX"
                onClick={handleCountry}
                className={orderFilter === "alpha-desc" ? style.selected : ""}
              >
                Mexico
              </button>
              <button
               value="AR"
                onClick={handleCountry}
                className={orderFilter === "alpha-desc" ? style.selected : ""}
              >
                Argentina
              </button>                     
            </div>
          </div>
          <div className={`mr-2 relative ${style.button}`}>
            <div
              className={`py-4 px-40 bg-black text-white hover:bg-gray-800 flex items-center rounded-xl`}
            >
              Filtrar <FaFilter className="ml-2" />
            </div>
            <div className={style.filter}>
              <div className={`mr-2 relative ${style.subButton}`}>
                <div>Tipo de Transacción:</div>
                <div>
                  <div className={style.type}>
                    <button
                      onClick={handleType}
                      value=""
                      className={typeFilter === "" ? style.selected : ""}
                    >
                      Todos
                    </button>
                    <button
                      onClick={handleType}
                      value="RENTAL"
                      className={typeFilter === "RENTAL" ? style.selected : ""}
                    >
                      Arriendo
                    </button>
                    <button
                      onClick={handleType}
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
                      onClick={handleCategory}
                      value=""
                      className={categoryFilter === "" ? style.selected : ""}
                    >
                      Todas
                    </button>
                    <button
                      onClick={handleCategory}
                      value="electrica"
                      className={
                        categoryFilter === "electrica" ? style.selected : ""
                      }
                    >
                      Eléctrica
                    </button>
                    <button
                      onClick={handleCategory}
                      value="manual"
                      className={
                        categoryFilter === "manual" ? style.selected : ""
                      }
                    >
                      Manual
                    </button>
                    <button
                      onClick={handleCategory}
                      value="medicion"
                      className={
                        categoryFilter === "medicion" ? style.selected : ""
                      }
                    >
                      Medición
                    </button>
                    <button
                      onClick={handleCategory}
                      value="corte"
                      className={
                        categoryFilter === "corte" ? style.selected : ""
                      }
                    >
                      Corte
                    </button>
                    <button
                      onClick={handleCategory}
                      value="jardin"
                      className={
                        categoryFilter === "jardin" ? style.selected : ""
                      }
                    >
                      Jardín
                    </button>
                    <button
                      onClick={handleCategory}
                      value="fontaneria"
                      className={
                        categoryFilter === "fontaneria" ? style.selected : ""
                      }
                    >
                      Fontanería
                    </button>
                    <button
                      onClick={handleCategory}
                      value="pintar"
                      className={
                        categoryFilter === "pintar" ? style.selected : ""
                      }
                    >
                      Pintar
                    </button>
                    <button
                      onClick={handleCategory}
                      value="soldar"
                      className={
                        categoryFilter === "soldar" ? style.selected : ""
                      }
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
                      onClick={handleBrand}
                      value=""
                      className={brandFilter === "" ? style.selected : ""}
                    >
                      Todas
                    </button>
                    <button
                      onClick={handleBrand}
                      value="philips"
                      className={
                        brandFilter === "Phillips" ? style.selected : ""
                      }
                    >
                      Phillips
                    </button>
                    <button
                      onClick={handleBrand}
                      value="Stanley"
                      className={
                        brandFilter === "Stanley" ? style.selected : ""
                      }
                    >
                      Stanley
                    </button>
                    <button
                      onClick={handleBrand}
                      value="Bosch"
                      className={brandFilter === "Bosch" ? style.selected : ""}
                    >
                      Bosch
                    </button>
                    <button
                      onClick={handleBrand}
                      value="dewalt"
                      className={brandFilter === "Dewalt" ? style.selected : ""}
                    >
                      Dewalt
                    </button>
                    <button
                      onClick={handleBrand}
                      value="skil"
                      className={brandFilter === "Skil" ? style.selected : ""}
                    >
                      Skil
                    </button>
                    <button
                      onClick={handleBrand}
                      value="castellari"
                      className={
                        brandFilter === "castellari" ? style.selected : ""
                      }
                    >
                      Castellari
                    </button>
                    <button
                      onClick={handleBrand}
                      value="dremel"
                      className={brandFilter === "dremel" ? style.selected : ""}
                    >
                      Dremel
                    </button>
                    <button
                      onClick={handleBrand}
                      value="fischer"
                      className={
                        brandFilter === "fischer" ? style.selected : ""
                      }
                    >
                      Fischer
                    </button>
                    <button
                      onClick={handleBrand}
                      value="karcher"
                      className={
                        brandFilter === "karcher" ? style.selected : ""
                      }
                    >
                      Karcher
                    </button>
                    <button
                      onClick={handleBrand}
                      value="libus"
                      className={brandFilter === "libus" ? style.selected : ""}
                    >
                      Libus
                    </button>
                    <button
                      onClick={handleBrand}
                      value="makita"
                      className={brandFilter === "makita" ? style.selected : ""}
                    >
                      Makita
                    </button>
                    <button
                      onClick={handleBrand}
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
                onClick={() => handleOrder("", "")}
                className={orderFilter === "" ? style.selected : ""}
              >
                Default
              </button>
              <button
                onClick={() => handleOrder("alpha", "A-Z")}
                className={orderFilter === "alpha-asc" ? style.selected : ""}
              >
                Nombre (A-Z)
              </button>
              <button
                onClick={() => handleOrder("alpha", "Z-A")}
                className={orderFilter === "alpha-desc" ? style.selected : ""}
              >
                Nombre (Z-A)
              </button>
              <button
                onClick={() => handleOrder("price", "asc")}
                className={orderFilter === "price-asc" ? style.selected : ""}
              >
                Precio (Asc)
              </button>
              <button
                onClick={() => handleOrder("price", "desc")}
                className={orderFilter === "price-desc" ? style.selected : ""}
              >
                Precio (Des)
              </button>
              <button
                onClick={() => handleOrder("rating", "asc")}
                className={orderFilter === "rating-asc" ? style.selected : ""}
              >
                Rating (Asc)
              </button>
              <button
                onClick={() => handleOrder("rating", "desc")}
                className={orderFilter === "rating-desc" ? style.selected : ""}
              >
                Rating (Des)
              </button>
            </div>
          </div>
          <div className={` flex relative ${style.clearBbutton}`}>
            {/* <div className={style.clear}> */}
              <button onClick={handleCleanFilters}className="bg-black text-white hover:bg-gray-800 flex items-center rounded-xl" style={{ height: '46px', padding: '0 40px' }}>
                <AiOutlineClear className="mr-2 text-4xl" />
              </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
