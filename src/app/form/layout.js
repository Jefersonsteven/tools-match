"use client";

import Image from "next/image";
import styles from "./form.module.css";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormLayout({ children }) {
  const pathname = usePathname();
  const [route, setRoute] = useState();

  useEffect(() => {
    const path = pathname.split("/");
    setRoute(path[2]);
  }, [pathname]);

  return (
    <html lang="en">
      <title>Iniciar Sesión | Registrarse</title>
      <body>
        <div className={styles.container}>
          <div className={styles.left}>
            <Image
              className={styles.image}
              src="/assets/saly-31.png"
              width={500}
              height={500}
              alt="foto acerca de formulario de login - logout "
            />
          </div>
          <div className={styles.right}>
            <div className={styles.buttons}>
              <Link
                className={route === "login" ? styles.activeLink : styles.link}
                href="/form/login"
              >
                Iniciar Sesión
              </Link>
              <span>o</span>
              <Link
                className={route === "logout" ? styles.activeLink : styles.link}
                href="/form/logout"
              >
                Registrarme
              </Link>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
