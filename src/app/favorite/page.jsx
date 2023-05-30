"use client";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from "@/components/Cards/Card";
import styles from "./Favorites.module.css";
import Back from "@/components/back/Back";
import Swal from "sweetalert2";

const Favorites = () => {
  const [favoriteArray, setFavoriteArray] = useState([]);
  const [visibleCards, setVisibleCards] = useState(4);
  const { userData, favorite, setFavorite } = useContext(AppContext);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`api/user/${userData.email}`);
      if (userData && userData.email) {
        setFavoriteArray(
          user.data.favorites.map((card) => ({ ...card, checked: false }))
        );
        setFavorite((prevFavorite) => ({
          ...prevFavorite,
          count: user.data.favorites.length,
        }));
      }
    };

    fetchData();
    if (!favorite) {
      setFavorite({
        count: 0,
      });
    }
  }, [favorite, userData.email]);

  const handleCheckboxChange = (event, cardId) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, cardId]);
    } else {
      setSelectedCards((prevSelectedCards) =>
        prevSelectedCards.filter((id) => id !== cardId)
      );
    }

    setFavoriteArray((prevFavoriteArray) => {
      return prevFavoriteArray.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            checked: checked,
          };
        }
        return card;
      });
    });
  };

  const handleCheckboxChangeAddToCart = (event) => {
    const { checked } = event.target;

    setFavoriteArray((prevFavoriteArray) => {
      return prevFavoriteArray.map((card) => {
        return {
          ...card,
          checked: checked,
        };
      });
    });
  };

  const handleDeleteFavorites = () => {
    const updatedFavoriteArray = favoriteArray.map((card) => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          deleted: true,
        };
      }
      return card;
    });

    setFavoriteArray(updatedFavoriteArray);
    setSelectedCards([]);

    setFavorite((prevFavorite) => ({
      ...prevFavorite,
      count: prevFavorite.count - selectedCards.length,
    }));
    localStorage.setItem(
      "favorite",
      JSON.stringify({
        count: prevFavorite.count - selectedCards.length,
      })
    );

    Swal.fire(
      "Agregado al carrito",
      "Los favoritos seleccionados han sido agregados al carrito.",
      "success"
    );
  };

  const handleSeeMoreClick = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
  };

  return (
    <div>
      <Back />
      <h1 className={styles.favTitle}>Favoritos</h1>
      {favoriteArray.length > 0 && (
        <div className={styles.checkboxContainer1}>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={handleCheckboxChangeAddToCart}
          />
          <button
            className={styles.checkboxLabel}
            onClick={handleDeleteFavorites}
          >
            Agregar Al Carrito
          </button>
        </div>
      )}
      <div className={styles.favContainer}>
        {favoriteArray.length > 0 ? (
          favoriteArray
            .filter((card) => !card.deleted) // Filtrar los elementos eliminados
            .slice(0, visibleCards)
            .map((card) => (
              <div className={styles.favInfo} key={card.id}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={card.checked}
                    onChange={(event) => handleCheckboxChange(event, card.id)}
                  />
                </div>
                <Card
                  photo={card.photo[0]}
                  title={card.title}
                  price={card.price}
                  id={card.id}
                  typeStyle={{ width: "100%", textAlign: "center" }}
                  type={card.type === "RENTAL" ? "Arriendo" : "Venta"}
                />
              </div>
            ))
        ) : (
          <h2 className={styles.favSubTitle}>No Tiene Ningún Favorito</h2>
        )}
      </div>
      {favoriteArray.length > visibleCards && (
        <div>
          <button className={styles.favSeeMore} onClick={handleSeeMoreClick}>
            Ver Más
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;

{
  /* <button className={styles.favAddToCart}>Añadir al carrito</button> */
}
// CODIGO
// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "@/context/AppContext";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import Card from "@/components/Cards/Card";
// import styles from "./Favorites.module.css";
// import Back from "@/components/back/Back";
// import Swal from "sweetalert2";

// const Favorites = () => {
//   const [favoriteArray, setFavoriteArray] = useState([]);
//   const [visibleCards, setVisibleCards] = useState(4);
//   const { userData, favorite, setFavorite } = useContext(AppContext);
//   const [selectedCards, setSelectedCards] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const user = await axios.get(`api/user/${userData.email}`);
//       if (userData && userData.email) {
//         setFavoriteArray(
//           user.data.favorites.map((card) => ({ ...card, checked: false }))
//         );
//         setFavorite((prevFavorite) => ({
//           ...prevFavorite,
//           count: user.data.favorites.length,
//         }));
//       }
//     };

//     fetchData();
//     if (!favorite) {
//       setFavorite({
//         count: 0,
//       });
//     }
//   }, [favorite, userData.email]);

//   const handleCheckboxChange = (event, cardId) => {
//     const { checked } = event.target;

//     if (checked) {
//       setSelectedCards((prevSelectedCards) => [...prevSelectedCards, cardId]);
//     } else {
//       setSelectedCards((prevSelectedCards) =>
//         prevSelectedCards.filter((id) => id !== cardId)
//       );
//     }

//     setFavoriteArray((prevFavoriteArray) => {
//       return prevFavoriteArray.map((card) => {
//         if (card.id === cardId) {
//           return {
//             ...card,
//             checked: checked,
//           };
//         } else {
//           return card;
//         }
//       });
//     });
//   };

//   const handleCheckboxChangeAddToCart = (event) => {
//     const { checked } = event.target;

//     setFavoriteArray((prevFavoriteArray) => {
//       return prevFavoriteArray.map((card) => {
//         return {
//           ...card,
//           checked: checked,
//         };
//       });
//     });
//   };

//   const handleDeleteFavorites = () => {
//     const updatedFavoriteArray = favoriteArray.filter(
//       (card) => !selectedCards.includes(card.id)
//     );
//     setFavoriteArray(updatedFavoriteArray);
//     setSelectedCards([]);

//     setFavorite((prevFavorite) => ({
//       ...prevFavorite,
//       count: updatedFavoriteArray.length,
//     }));
//     localStorage.setItem(
//       "favorite",
//       JSON.stringify({
//         count: updatedFavoriteArray.length,
//       })
//     );

//     Swal.fire(
//       "Agregado al carrito",
//       "Los favoritos seleccionados han sido agregados al carrito.",
//       "success"
//     );
//   };

//   const handleSeeMoreClick = () => {
//     setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
//   };

//   return (
//     <div>
//       <Back />
//       <h1 className={styles.favTitle}>Favoritos</h1>
//       {favoriteArray.length > 0 && (
//         <div className={styles.checkboxContainer1}>
//           <input
//             type="checkbox"
//             className={styles.checkbox}
//             onChange={handleCheckboxChangeAddToCart}
//           />
//           <button
//             className={styles.checkboxLabel}
//             onClick={handleDeleteFavorites}
//           >
//             Agregar Al Carrito
//           </button>
//         </div>
//       )}
//       <div className={styles.favContainer}>
//         {favoriteArray.length > 0 ? (
//           favoriteArray.slice(0, visibleCards).map((card) => (
//             <div className={styles.favInfo} key={card.id}>
//               <div className={styles.checkboxContainer}>
//                 <input
//                   type="checkbox"
//                   className={styles.checkbox}
//                   checked={card.checked}
//                   onChange={(event) => handleCheckboxChange(event, card.id)}
//                 />
//               </div>
//               <Card
//                 photo={card.photo[0]}
//                 title={card.title}
//                 price={card.price}
//                 id={card.id}
//                 typeStyle={{ width: "100%", textAlign: "center" }}
//                 type={card.type === "RENTAL" ? "Arriendo" : "Venta"}
//               />
//             </div>
//           ))
//         ) : (
//           <h2 className={styles.favSubTitle}>No Tiene Ningún Favorito</h2>
//         )}
//       </div>
//       {favoriteArray.length > visibleCards && (
//         <div>
//           <button className={styles.favSeeMore} onClick={handleSeeMoreClick}>
//             Ver Más
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;
