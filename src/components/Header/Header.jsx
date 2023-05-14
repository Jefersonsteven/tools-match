"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

function Header() {
  const pathname = usePathname();

  const { userSession } = useContext(AppContext);

  return (
    <header className={styles.header}>
      <figure>
        <Link href="/">
          <Image
            src="/../public/images/logo/toolsMatch.jpg"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
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
                    href={userSession ? "/crear-publicaciones" : "/form/login"}
                  >
                    Crear Publicaciones
                  </Link>
                )}
              </li>
            </ul>

            {pathname !== "/" && (
              <div className={styles.nav}>
                <Link href={userSession ? "/" : "/form/login"}>
                  <FaUserCircle color="white" />
                </Link>

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
