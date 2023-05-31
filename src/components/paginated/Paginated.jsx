"use client";

import style from "./Paginated.module.css";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

export default function Paginated({
  url,
  currentPage,
  setCurrentPage,
  totalPagesProp,
  itemsPerPage,
}) {
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(totalPagesProp);
  const [isLeftArrowClicked, setIsLeftArrowClicked] = useState(false);
  const [isRightArrowClicked, setIsRightArrowClicked] = useState(false);

 /*  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPaginatedData(data.users);
        setTotalPages(data.pageInfo.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [url, currentPage]); */

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
    <div className={style.container}>
      {/* Agrega botones de navegación para el paginado */}
      <div className={style.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`${style.arrowButton} ${style.leftArrow} ${
            isLeftArrowClicked ? style.active : ""
          }`}
          onMouseDown={() => {
            setIsLeftArrowClicked(true);
            setIsRightArrowClicked(false);
          }}
          onMouseUp={() => setIsLeftArrowClicked(false)}
        >
          { <BiLeftArrowAlt/> }
        </button>

        {/* Cuadritos de paginación */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            disabled={currentPage === index + 1}
            className={`${style.pageNumber} ${
              currentPage === index + 1 ? style.active : ""
            } ${
              (isLeftArrowClicked || isRightArrowClicked) &&
              currentPage !== index + 1
                ? style.highlight
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${style.arrowButton} ${style.rightArrow} ${
            isRightArrowClicked ? style.active : ""
          }`}
          onMouseDown={() => {
            setIsLeftArrowClicked(false);
            setIsRightArrowClicked(true);
          }}
          onMouseUp={() => setIsRightArrowClicked(false)}
        >
          { <BiRightArrowAlt/> }
        </button>
      </div>
    </div>
  );
}
