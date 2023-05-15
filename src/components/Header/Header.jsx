"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";

function Header() {
  const pathname = usePathname();

  const { userSession } = useContext(AppContext);
  const [submenu, setSubmenu] = useState(false);

  return (
    <header className={styles.header}>
      <figure className={styles.logo}>
        <Link href="/">
          <Image
            src="/../public/images/logo/toolsMatch.jpg"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
        {<Link href="/dashboard/users">
          <button>Dashboard</button>
        </Link>}
      </figure>
      <nav className={styles.nav}>
        {pathname !== "/team" ? (
          <>
            <ul className={styles.nav}>
              <li>
                <Link href="/team">Nosotros</Link>
              </li>
              <li>
                <Link href="/home">
                  {pathname === "/" ? "Home" : "Publicaciones"}
                </Link>
              </li>
              <li>
                {pathname !== "/" && (
                  <Link
                    href={userSession ? "/crear-publicacion" : "/form/login"}
                  >
                    Crear Publicaciones
                  </Link>
                )}
              </li>
            </ul>

            {pathname !== "/" && (
              <div className={styles.nav}>
                <div className={styles.perfil}>
                  <FaUserCircle
                    onClick={() => setSubmenu((state) => !state)}
                    color="white"
                  />
                  <ul
                    className={
                      submenu ? styles.openSubmenu : styles.closeSubmenu
                    }
                  >
                    <li>
                      <Link href={userSession ? "/" : "/form/login"}>
                        {userSession ? "Cerrar Sesion" : "Iniciar Sesion"}
                      </Link>
                    </li>
                    {userSession && (
                      <li>
                        <Link href="/perfil">Perfil</Link>
                      </li>
                    )}
                  </ul>
                </div>

                <Link href="/cart">
                  <FaShoppingCart color="white" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <ul className={styles.home}>
            <li>
              <Link href="/home">Home</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
