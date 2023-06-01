"use client"
import Link from "next/link";
import styles from "./dashboard.module.css";
import { AppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";


export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { userData } = useContext(AppContext);

  
  const [activeButton, setActiveButton] = useState('');
  
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  
  // Verificar si el usuario no es administrador y redireccionar al home
  useEffect(() => {
    if (userData === null || !userData.admin) {
      router.push("/home");
    }
  },);


  return (
    <>
      <>
      <div className={styles.body}>
        <div className={styles.contenedor}>
          <div className={styles.title}>
            <p>Panel de Admin</p>
          </div>
          <div>
            <div
              className={`${styles.boton} ${activeButton === 'users' && styles.active}`}
              onClick={() => handleButtonClick('users')}
            >
              <Link href="/dashboard/users">Usuarios</Link>
            </div>
            <div
              className={`${styles.boton} ${activeButton === 'vetados' && styles.active}`}
              onClick={() => handleButtonClick('vetados')}
            >
              <Link href="/dashboard/usersBan">Vetados</Link>
            </div>
            <div
              className={`${styles.boton} ${activeButton === 'publications' && styles.active}`}
              onClick={() => handleButtonClick('publications')}
            >
              <Link href="/dashboard/publications">Publicaciones</Link>
            </div>
            <div
              className={`${styles.boton} ${activeButton === 'reviews' && styles.active}`}
              onClick={() => handleButtonClick('reviews')}
            >
              <Link href="/dashboard/reviews">Reseñas</Link>
            </div>
          </div>
        </div>
        {children}
      </div>
      </>
    </>
    
  );
}