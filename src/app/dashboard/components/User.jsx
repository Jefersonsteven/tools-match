"use client"

import style from './user.module.css'

export default function User({name, telefono, email, reportes, ordenes, id}) {
   
    const handleDelete = () => {
        alert('Usuario Eliminado')
    };
    
    return ( 
        <div>
            <div className={style.userContainer}>
            <h1>{name}</h1>
            <h2>{telefono}</h2>
            <h2>{email}</h2>
            <h2>{reportes}</h2>
            <h2>{ordenes}</h2>
            <button className={style.userButton} onClick={()=>handleDelete()}>Eliminar Usuario</button>
            </div>
        </div>
     );
};
