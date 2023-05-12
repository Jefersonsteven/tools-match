import styles from './Card.module.css';
import React from 'react';


const Card = ({ title, description, photo, price, type, perDay }) => {
  return (
    <div className={`${styles.cardContainer} bg-white rounded-md p-4`}>
      <img src={photo} alt={title} className={`${styles.cardImage} rounded-md`} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardName}>{title}</h2>               
        <h2 className={styles.cardPrice}>
        <span className={styles.cardPrice}> ${price} </span>        
        </h2>
      </div>  
      <div className={styles.saleTypeContent}>        
      <p className={type == 'Arriendo' ? 'text-yellow-500' : 'text-green-500'}>{type}</p>
      <p >{perDay}</p> 
      </div>     
    </div>
  );
};

export default Card;