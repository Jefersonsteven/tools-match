import Link from "next/link";
import styles from './Header.module.css';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { usePathname } from "next/navigation";

function Header() {
    const pathname = usePathname();
    return (
        <header className={styles.header}>
            <figure>
                <h5>TOOLS MATCH</h5>
            </figure>
            <nav className={styles.nav}>
                <ul className={styles.nav}>
                    <li className={pathname === '/team' ? styles.route : ''}>
                        <Link href="/team">Nosotros</Link>
                    </li>
                    <li className={pathname === '/home' ? styles.route : ''}>
                        <Link href="/home">Publicaciones</Link>
                    </li>
                    <li className={pathname === '/crear-publicaciones' ? styles.route : ''}>
                        <Link href="/crear-publicaciones">Crear Publicaciones</Link>
                    </li>
                </ul>
                <div className={styles.nav}>
                    <FaUserCircle color="white" />
                    <Link href="/team">
                        <FaShoppingCart color="white" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;