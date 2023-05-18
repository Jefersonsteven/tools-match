"use client"
import Link from "next/link";
import styles from "./dashboard.module.css";
import { AppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { userData } = useContext(AppContext);

  // // Verificar si el usuario no es administrador y redireccionar al home
  // useEffect(() => {
  //   if (!userData.admin) {
  //     router.push('/');
  //   }
  // }, [userData.admin, router]);

  // // Renderizar el panel de administrador solo si el usuario es administrador
  // if (!userData.admin) {
  //   return null;
  // }

  return (
    <>
        <div className={styles.body}>
        <div className={styles.contenedor}>
          <div className={styles.title}> 
            <p>Admin Panel</p>
          </div>
          <div>
            <div className={styles.boton}>
              <Link href="/dashboard/users">Usuarios</Link>
            </div>
            <div className={styles.boton}>
              <Link href="/dashboard/publications">Publicaciones</Link>
            </div>
            <div className={styles.boton}>
              <Link href="/dashboard/reviews">Reseñas</Link>
            </div>
          </div>
        </div>
        {children}
        </div>
    </>
  );
}
