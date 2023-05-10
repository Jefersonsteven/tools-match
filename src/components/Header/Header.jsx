import Link from "next/link";
import styles from './Header.module.css';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';

function Header() {
    return (
        <header className={styles.header}>
            <figure>
                <h5>TOOL WATCH</h5>
            </figure>
            <nav className={styles.nav}>
                <ul className={styles.nav}>
                    <li>
                        <Link href="/team">Nosotros</Link>
                    </li>
                    <li>
                        <Link href="/team">Publicaciones</Link>
                    </li>
                    <li>
                        <Link href="/team">Crear Publicaciones</Link>
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