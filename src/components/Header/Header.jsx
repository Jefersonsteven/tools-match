"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AppContext } from "@/context/AppContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

function Header() {
  const pathname = usePathname();
  const { push } = useRouter();

  const {
    userData,
    setUserData,
    setUserId,
    userId,
    removeFromLocalStorage,
    endSession,
  } = useContext(AppContext);

  const [submenu, setSubmenu] = useState(false);

  const handleCloseSession = async () => {
    if (userData) {
      push("/");
      await endSession(userData.email);
      removeFromLocalStorage("token");
      removeFromLocalStorage("id");
      setUserData(null);
      setUserId(null);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "info",
        title: "Sesión cerrada",
      });
    }
  };

  return (
    <div>
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
          {
            <Link href="/dashboard/users">
              <button>Dashboard</button>
            </Link>
          }
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
                      href={userData ? "/crear-publicacion" : "/form/login"}
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
                      <li onClick={handleCloseSession}>
                        <Link href={userData ? "/" : "/form/login"}>
                          {userData ? "Cerrar Sesion" : "Iniciar Sesion"}
                        </Link>
                      </li>
                      {userData && (
                        <li>
                          <Link href={`/perfil/${userId}`}>Perfil</Link>
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
    </div>
  );
}

export default Header;
