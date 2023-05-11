import React from 'react';
import styles from './Card.module.css';

const Card = ({ name, description, imageUrl, price, sale, rental }) => {
  return (
    <div className={`${styles.cardContainer} bg-white rounded-md p-4`}>
      <img src={imageUrl} alt={name} className={`${styles.cardImage} rounded-md`} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardName}>{name}</h2>       
      
      <h2 className={styles.cardPrice}>
        <span className={styles.cardPrice}> ${price} </span>
        {rental > 0 ? (
          <span className="text-sm text-gray-500">
            Alquiler {rental} {rental === 1 ? 'día' : 'días'} {rental > 0 && sale > 0 && '|'}
          </span>
        ) : null}
        {sale > 0 ? (
          <span className="text-sm text-gray-500">
            Venta {sale} {sale === 1 ? 'día' : 'días'}
          </span>
        ) : null}
        {rental > 0 && <span className="text-sm text-gray-500">por día</span>}
      </h2>
      </div>
    </div>
  );
};

export default Card;