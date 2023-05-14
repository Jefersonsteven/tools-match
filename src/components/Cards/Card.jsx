import React from "react";
import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";


const Card = ({ title, photo, price, type, perDay, id}) => {
  return (
    <Link href={`/post/${id}`}>
    <div className={`${styles.cardContainer} bg-white rounded-md p-4`}>
      <img 
      onError={(event)=> event.target.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ5uqj17TEhCijObvQMPqwOXCIgOF36SvFw&usqp=CAU'}
      src={photo} alt={title} className={`${styles.cardImage} rounded-md`}/>
      {/* <Image 
      onError={(event)=> event.target.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ5uqj17TEhCijObvQMPqwOXCIgOF36SvFw&usqp=CAU'}
      width={230} height={152} src={photo} alt={title} className={`${styles.cardImage} rounded-md`}/> */}
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
    </Link>
  );
};

export default Card;
