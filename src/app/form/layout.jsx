"use client";

import Image from "next/image";
import styles from "./form.module.css";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function FormLayout({ children }) {
  const pathname = usePathname();
  const [route, setRoute] = useState();
  const { push } = useRouter();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    const path = pathname.split("/");
    setRoute(path[2]);
    userData && push("/home");
  }, [pathname, push, userData]);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      push("/home");
    }
  }, [push]);

  return (
    <>
      <>
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
      </>
    </>
  );
}
