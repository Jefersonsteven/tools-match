"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FaUserCircle, FaShoppingCart, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import Logo from "../Logo/Logo";
import { GiHamburgerMenu } from "react-icons/gi";

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
    favorite,
  } = useContext(AppContext);

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

  const [href, setHref] = useState("");
  const [menu, setMenu] = useState("");
  const [submenu, setSubmenu] = useState("");

  useEffect(() => {
    setHref(userData ? "/crear-publicacion" : "/form/login");
  }, [userData]);

  return (
    <header className={styles.header}>
      {/* // logo */}
      <div className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
        <h2>Tools Match</h2>
      </div>

      {/* // navbar */}
      <nav className={styles.navbar}>
        <>
          <ul className={styles.nav} style={{ display: menu }}>
            {userId &&
              userData.admin &&
              !(pathname.split("/")[1] === "dashboard") && (
                <li className={styles.navLi}>
                  <Link href="/dashboard/users">Dashboard</Link>
                </li>
              )}
            {pathname !== "/team" && (
              <li className={styles.navLi}>
                <Link href="/team">Nosotros</Link>
              </li>
            )}
            <li className={styles.navLi}>
              <Link href="/home">
                {pathname === "/" ? "Home" : "Publicaciones"}
              </Link>
            </li>
            <li className={styles.navLi}>
              {pathname !== "/" && <Link href={href}>Crear Publicaciones</Link>}
            </li>
          </ul>

          {pathname !== "/favorite" && pathname !== "/" && userData && (
            <Link href="/favorite" className={styles.cart}>
              <FaHeart size="25" color="white" />
              {favorite.count !== 0 && (
                <span className={styles.cartCount}>{favorite.count}</span>
              )}
              <span className={styles.cartText}>Favoritos</span>
            </Link>
          )}

          {pathname !== "/" && (
            <div className={styles.navbar}>
              <div
                className={styles.perfil}
                onClick={() => {
                  submenu === "none" || submenu === ""
                    ? setSubmenu("flex")
                    : setSubmenu("none");
                }}
              >
                {userData && userData.photo ? (
                  <Image
                    className={styles.userImg}
                    width={25}
                    height={25}
                    src={userData.photo}
                    alt="user"
                  />
                ) : (
                  <FaUserCircle
                    className={styles.userImg}
                    size={25}
                    color="white"
                  />
                )}

                <ul className={styles.openSubmenu} style={{ display: submenu }}>
                  {userData && (
                    <li>
                      <Link href={`/perfil/${userId}`}>Ver Perfil</Link>
                    </li>
                  )}
                  {userData && (
                    <li>
                      <Link href={`/perfil/${userId}/changePassword`}>
                        Cambiar Contraseña
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

          <div
            className={styles.menubutton}
            onClick={() => {
              menu === "none" ? setMenu("flex") : setMenu("none");
            }}
          >
            <GiHamburgerMenu size={25} />
          </div>
        </>
      </nav>
    </header>
  );
}

export default Header;
