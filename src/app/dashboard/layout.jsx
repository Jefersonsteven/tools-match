
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
              <Link href="/dashboard/payments">Pagos</Link>
            </div>
            <div className={styles.boton}>
              <Link href="/dashboard/publications">Publicaciones</Link>
            </div>
          </div>
        </div>
        {children}
        </div>
      </body>
    </html>
  );
}
