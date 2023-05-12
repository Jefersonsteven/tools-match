import Link from "next/link";
import styles from "./Header.module.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

function Header() {
  const pathname = usePathname();
  const { push } = useRouter();
  const { userSession } = useContext(AppContext);

  const sessionRouter = (route) => {
    userSession ? push(route) : push("/form/login");
  };

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
                  <span onClick={() => sessionRouter("/crear-publicaciones")}>
                    Crear Publicaciones
                  </span>
                )}
              </li>
            </ul>

            {pathname !== "/" && (
              <div className={styles.nav}>
                <FaUserCircle
                  color="white"
                  onClick={() => sessionRouter("/")}
                />
                {/* añadir evento */}
                <Link href="/team">
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
