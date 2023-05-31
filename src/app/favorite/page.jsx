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
  const [visibleCards, setVisibleCards] = useState(4);
  const {
    userData,
    favorite,
    setFavorite,
    favoriteArray,
    setFavoriteArray,
    cart,
    setCart,
  } = useContext(AppContext);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [deletedCards, setDeletedCards] = useState([]);

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
  }, []);

  const handleCheckboxChange = (event, cardId) => {
    const { checked } = event.target;

    setSelectedCards((prevSelectedCards) => {
      if (checked) {
        return [...prevSelectedCards, cardId];
      } else {
        return prevSelectedCards.filter((id) => id !== cardId);
      }
    });

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

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAllChecked(checked);

    setFavoriteArray((prevFavoriteArray) => {
      return prevFavoriteArray.map((card) => ({
        ...card,
        checked: checked,
      }));
    });

    if (checked) {
      setSelectedCards(favoriteArray.map((card) => card.id));
    } else {
      setSelectedCards([]);
    }
  };

  const handleSeeMoreClick = () => {
    setVisibleCards((prevVisibleCards) =>
      Math.min(prevVisibleCards + 4, favoriteArray.length)
    );
  };

  const handleRemoveFromFavorites = () => {
    const updatedFavoriteArray = favoriteArray.map((card) => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          checked: false,
          deleted: true,
        };
      }
      return card;
    });

    const deletedCardsList = favoriteArray.filter((card) =>
      selectedCards.includes(card.id)
    );

    setFavoriteArray(updatedFavoriteArray);
    setSelectedCards([]);
    setDeletedCards((prevDeletedCards) => [
      ...prevDeletedCards,
      ...deletedCardsList,
    ]);

    setFavorite((prevFavorite) => ({
      ...prevFavorite,
      count: prevFavorite.count - deletedCardsList.length,
    }));
  };

  const addToCart = () => {
    const selectedItems = favoriteArray.filter((card) =>
      selectedCards.includes(card.id)
    );

    const updatedFavoriteArray = favoriteArray.map((card) => {
      if (selectedCards.includes(card.id)) {
        return {
          ...card,
          checked: false,
        };
      }
      return card;
    });

    setFavoriteArray(updatedFavoriteArray);

    setSelectedCards([]);

    setFavorite((prevFavorite) => ({
      ...prevFavorite,
      count: prevFavorite.count - selectedItems.length,
    }));

    selectedItems.forEach((item) => {
      if (!cart.items.some((cartItem) => cartItem.id === item.id)) {
        setCart(({ count, items }) => ({
          count: count + 1,
          items: [...items, item],
        }));
        Swal.fire(
          "Agregado al carrito",
          "Los favoritos seleccionados han sido agregados al carrito.",
          "success"
        );
      } else {
        Swal.fire(
          "Ya agregado",
          "Una o más tarjetas seleccionadas ya han sido agregadas al carrito.",
          "warning"
        );
      }
    });
  };
  return (
    <div>
      <Back />
      <h1 className={styles.favTitle}>Favoritos</h1>
      {favoriteArray.length > 0 && (
        <div className={styles.checkboxContainer1}>
          <input
            type="checkbox"
            id="select-all"
            checked={selectAllChecked}
            onChange={handleSelectAllChange}
            className={styles.checkbox}
          />
          <label className={styles.favSelectCheck} htmlFor="select-all">
            Select All
          </label>
          <button className={styles.checkboxLabel} onClick={addToCart}>
            Agregar Al Carrito
          </button>
          <button
            className={styles.removeButton}
            onClick={handleRemoveFromFavorites}
          >
            Eliminar de Favoritos
          </button>
        </div>
      )}
      <div className={styles.favContainer}>
        {favoriteArray.length > 0 ? (
          favoriteArray
            .filter((card) => !card.deleted)
            .slice(0, visibleCards)
            .map((card) => (
              <div className={styles.favInfo} key={card.id}>
                <div className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={card.id}
                    name={card.title}
                    checked={card.checked}
                    onChange={(event) => handleCheckboxChange(event, card.id)}
                    className={styles.checkbox}
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
//   const [visibleCards, setVisibleCards] = useState(4);
//   const {
//     userData,
//     favorite,
//     setFavorite,
//     favoriteArray,
//     setFavoriteArray,
//     cart,
//     setCart,
//   } = useContext(AppContext);
//   const [selectedCards, setSelectedCards] = useState([]);
//   const [selectAllChecked, setSelectAllChecked] = useState(false);

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
//   }, []);

//   const handleCheckboxChange = (event, cardId) => {
//     const { checked } = event.target;

//     setSelectedCards((prevSelectedCards) => {
//       if (checked) {
//         return [...prevSelectedCards, cardId];
//       } else {
//         return prevSelectedCards.filter((id) => id !== cardId);
//       }
//     });

//     setFavoriteArray((prevFavoriteArray) => {
//       return prevFavoriteArray.map((card) => {
//         if (card.id === cardId) {
//           return {
//             ...card,
//             checked: checked,
//           };
//         }
//         return card;
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

//   const handleSelectAllChange = (event) => {
//     const { checked } = event.target;
//     setSelectAllChecked(checked);

//     setFavoriteArray((prevFavoriteArray) => {
//       return prevFavoriteArray.map((card) => ({
//         ...card,
//         checked: checked,
//       }));
//     });

//     if (checked) {
//       setSelectedCards(favoriteArray.map((card) => card.id));
//     } else {
//       setSelectedCards([]);
//     }
//   };

//   const handleSeeMoreClick = () => {
//     setVisibleCards((prevVisibleCards) =>
//       Math.min(prevVisibleCards + 4, favoriteArray.length)
//     );
//   };

//   const addToCard = () => {
//     let count;
//     let items = [];
//     const updatedFavoriteArray = favoriteArray.filter(
//       (card) => !selectedCards.includes(card.id)
//     );

//     const selectedItems = favoriteArray.filter((card) =>
//       selectedCards.includes(card.id)
//     );

//     setFavoriteArray(updatedFavoriteArray);
//     setSelectedCards([]);

//     setFavorite((prevFavorite) => ({
//       ...prevFavorite,
//       count: updatedFavoriteArray.length,
//     }));

//     selectedItems.forEach((item) => {
//       if (!cart.items.some((cartItem) => cartItem.id === item.id)) {
//         setCart(({ count, items }) => ({
//           count: count + 1,
//           items: [...items, item],
//         }));
//         Swal.fire(
//           "Agregado al carrito",
//           "Los favoritos seleccionados han sido agregados al carrito.",
//           "success"
//         );
//       } else {
//         Swal.fire(
//           "Ya agregado",
//           "Una o más tarjetas seleccionadas ya han sido agregadas al carrito.",
//           "warning"
//         );
//       }
//     });
//   };

//   return (
//     <div>
//       <Back />
//       <h1 className={styles.favTitle}>Favoritos</h1>
//       <div className={styles.checkboxContainer1}>
//         <input
//           type="checkbox"
//           id="select-all"
//           checked={selectAllChecked}
//           onChange={handleSelectAllChange}
//           className={styles.checkbox}
//         />
//         <label className={styles.favSelectCheck} htmlFor="select-all">
//           Select All
//         </label>
//         <button className={styles.checkboxLabel} onClick={addToCard}>
//           Agregar Al Carrito
//         </button>
//       </div>
//       <div className={styles.favContainer}>
//         {favoriteArray.length > 0 ? (
//           favoriteArray.slice(0, visibleCards).map((card) => (
//             <div className={styles.favInfo} key={card.id}>
//               <div className={styles.checkboxContainer}>
//                 <input
//                   type="checkbox"
//                   id={card.id}
//                   name={card.title}
//                   checked={card.checked}
//                   onChange={(event) => handleCheckboxChange(event, card.id)}
//                   className={styles.checkbox}
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
