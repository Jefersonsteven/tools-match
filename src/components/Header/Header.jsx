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
    cart,
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

  const href = userData ? "/crear-publicacion" : "/form/login";

  return (
        <header className={styles.header}>
          <ul className={styles.logo}>
            <li>
              <Link href="/">
                Tools Match
                {/* <Image
              src="/../public/images/logo/toolsMatch.jpg"
              alt="logo"
              width={70}
              height={70}
            /> */}
              </Link>
            </li>
            {userId &&
              userData.admin &&
              !(pathname.split("/")[1] === "dashboard") && (
                <li>
                  <Link href="/dashboard/users">
                    <button>Dashboard</button>
                  </Link>
                </li>
              )}
          </ul>
          <nav className={styles.nav}>
            <>
              <ul className={styles.nav}>
                {pathname !== "/team" && (
                  <li>
                    <Link href="/team">Nosotros</Link>
                  </li>
                )}
                <li>
                  <Link href="/home">
                    {pathname === "/" ? "Home" : "Publicaciones"}
                  </Link>
                </li>
                <li>
                  {pathname !== "/" && (
                    <Link
                      href={userData && href}
                    >
                      Crear Publicaciones
                    </Link>
                  )}
                </li>
                {pathname !== "/favorite" || pathname !== "/" && (
                  <li>
                    <Link href="/favorite">Favoritos</Link>
                  </li>
                )}
              </ul>

              {pathname !== "/" && (
                <div className={styles.nav}>
                  <div className={styles.perfil}>
                    {userData && userData.photo ? (
                      <Image
                        className={styles.userImg}
                        width={25}
                        height={25}
                        src={userData.photo}
                        alt="user"
                        onClick={() => setSubmenu((state) => !state)}
                      />
                    ) : (
                      <FaUserCircle
                        size={25}
                        onClick={() => setSubmenu((state) => !state)}
                        color="white"
                      />
                    )}

                    <ul
                      className={
                        submenu ? styles.openSubmenu : styles.closeSubmenu
                      }
                    >
                      {userData && (
                        <li>
                          <Link href={`/perfil/${userId}`}>ver Perfil</Link>
                        </li>
                      )}
                      {userData && (
                        <li>
                          <Link href={`/perfil/${userId}/changePassword`}>
                            Cambiar contraseña
                          </Link>
                        </li>
                      )}
                      <li onClick={handleCloseSession}>
                        <Link href={userData ? "/" : "/form/login"}>
                          {userData ? "Cerrar Sesion" : "Iniciar Sesion"}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <Link href="/cart" className={styles.cart}>
                    <FaShoppingCart size="25" color="white" />
                    {cart?.count > 0 && (
                      <span className={styles.cartCount}>{cart.count}</span>
                    )}
                    <span className={styles.cartText}>Carrito de compras</span>
                  </Link>
                </div>
              )}
            </>
          </nav>
        </header>
  );
}

export default Header;
