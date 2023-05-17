"use client";

import style from "./Paginated.module.css";
import { useEffect, useState } from "react";

export default function Paginated({ url, currentPage, setCurrentPage }) {
  const [paginatedCards, setPaginatedCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPaginatedCards(data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();
  }, [url, currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div>
      {/* Agrega botones de navegación para el paginado */}
      <div className={style.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${style.arrowButton} ${style.leftArrow}`}
        >
          &lt;
        </button>

        {/* Cuadritos de paginación */}
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            disabled={currentPage === index + 1}
            className={`${style.pageNumber} ${
              currentPage === index + 1 ? style.active : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === 10}
          className={`${style.arrowButton} ${style.rightArrow}`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}