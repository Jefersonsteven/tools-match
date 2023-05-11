import styles from './Card.module.css';
import React from 'react';

const Card = ({ name, description, imageUrl, price, saleType, perDay }) => {
  return (
    <div className={`${styles.cardContainer} bg-white rounded-md p-4`}>
      <img src={imageUrl} alt={name} className={`${styles.cardImage} rounded-md`} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardName}>{name}</h2>               
        <h2 className={styles.cardPrice}>
  <span className={styles.cardPriceValue}>${price.venta}</span>
  {price.alquiler > 0 && <span className={styles.cardPriceType}>/día</span>}
</h2>
      </div>  
      <div className={styles.saleTypeContent}>        
      <p className={saleType === 'Arriendo' ? 'text-yellow-500' : 'text-green-500'}>{saleType}</p>
      <p >{perDay}</p> 
      </div>     
    </div>
  );
};

export default Card;