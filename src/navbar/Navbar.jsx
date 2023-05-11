
import style from './Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {
    return (
        <div>
        <header className={style.nabvarContainer}>
                <div className={style.navbarLogo}>
                <Link href='#'>
                    <Image src='/../public/images-landing/toolsMatch.jpg' alt='logo' width={100} height={100}/>
                </Link>

                </div>
                <div className={style.navbarMenu}>
                    <Link href='/home'><button>Home</button></Link>
                    <button>Contacto</button>
                    <Link href='form/login' className={style.navbarMenuLogin}>Iniciar Sesión</Link>
                </div>
            </header>
        </div>
    )
}
