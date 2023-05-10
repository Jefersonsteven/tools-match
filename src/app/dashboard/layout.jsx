"use client"

import Link from "next/link";
import style from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={style.body}>
        <div className={style.contenedor}>
          <div className={style.title}> 
            <p>Dashboard</p>
          </div>
          <div>
            <div className={style.boton}>
              <Link href="/dashboard/users">Users</Link>
            </div>
            <div className={style.boton}>
              <Link href="/dashboard/payments">Payments</Link>
            </div>
            <div className={style.boton}>
              <Link href="/dashboard/publications">Publications</Link>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
