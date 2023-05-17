"use client";
import Card from "../../components/Cards/Card";
import style from "./Paginated.module.css";
import { useEffect, useState } from "react";

export default function Paginated({}) {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/paginated?page=${currentPage}&limit=8`
        );
        const data = await response.json();
        setCards(data.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [currentPage]);

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
      {/* Contenedor de las cards con estilos de Cards */}
      {/* <div className={style.cardsContainer}>
        {cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            type={card.type === "SALE" ? "Venta" : "Arriendo"}
          />
        ))}
      </div> */}

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

// "use client";

// import Card from "../../components/Cards/Card";
// import style from "./Paginated.module.css";
// import Cards from "../Cards/Cards";

// export default function Paginated({ currentPage, setCurrentPage }) {
//   return (
//     <div>
//       {/* Contenedor de las cards con estilos de Cards */}
//       {/* <div className={style.cardsContainer}>
//         {cards.map((card) => (
//           <Card
//             key={card.id}
//             {...card}
//             type={card.type === "SALE" ? "Venta" : "Arriendo"}
//           />
//         ))}
//       </div> */}

//       {/* Agrega botones de navegación para el paginado */}
//       <div className={style.pagination}>
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`${style.arrowButton} ${style.leftArrow}`}
//         >
//           &lt;
//         </button>

//         {/* Cuadritos de paginación */}
//         {Array.from({ length: 10 }).map((_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => setCurrentPage(index + 1)}
//             disabled={currentPage === index + 1}
//             className={`${style.pageNumber} ${
//               currentPage === index + 1 ? style.active : ""
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}

//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           disabled={currentPage === 10}
//           className={`${style.arrowButton} ${style.rightArrow}`}
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// }
