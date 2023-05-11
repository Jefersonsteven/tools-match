"use client";

import style from './landing.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Modal from "./modal";


export default function LandingPage() {


    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };


    const teamMembers = [
        {
            name: 'Axel',
            image: 'Axel.jpg',
        },
        {
            name: 'Celes',
            image: 'Celeste.jpg',
        },
        {
            name: 'Ema',
            image: 'Emanuel.jpg',
        },
        {
            name: 'Franco',
            image: 'Franco.jpg',
        },
        {
            name: 'Adri',
            image: 'Adriana.jpg',
        },
        {
            name: 'Jean',
            image: 'Jean.jpg',
        },
        {
            name: 'Yael',
            image: 'Yael.jpg',
        },
        {
            name: 'Jeffer',
            image: 'Jeffer.jpg',
        },
    ];
    return (
        <div className={style.landingPageContainer}>
            <header className={style.nabvarContainer}>
                <div className={style.navbarLogo}>
                <Link href='/home'>
                    <Image src='/../public/images/logo/toolsMatch.jpg' alt='logo' width={100} height={100}/>
                </Link>

                </div>
                <div className={style.navbarMenu}>
                <Link href='/home'><button>Home</button></Link>
                    <button>Contacto</button>
                <Link href='form/login' className={style.navbarMenuLogin}>Iniciar Sesión</Link>
                </div>
            </header>
            <main className={style.mainInfo}>
                <div className={style.mainInfoApp}>
                    <h1> ToolsMatch es una aplicación innovadora que se centra en satisfacer
                        las necesidades de la Comunidad para la compra y el arriendo
                        de herramientas usadas. 
                        <br/><br/>
                        Ofrecemos una solución práctica para aquellos que buscan
                        compartir recursos y ahorrar dinero en la compra de herramientas costosas.
                        <br/><br/>
                        Esto no solo ayuda a los vecinos a ahorrar dinero, sino que también fomenta
                        una cultura de colaboración y compartición de recursos en la comunidad.
                        Si está buscando una forma práctica y segura de compartir herramientas  de 
                        construcción y otros equipos necesarios para el hogar entre sus vecinos, y/ó
                        realizar una excelente inversión vendiendo sus herramientas usadas en buen estado
                        o rentarlas, ToolsMatch es una excelente opción.</h1>
                </div>
            </main>
            <section className={style.sponsorsContainer}>
                    <h2 className={style.sponsorsTitle}>Nuestros Patrocinadores</h2>
                    <div className={style.sponsorsLogos}>
                        <Image src='/../public/images/sponsors/dewaltt.png' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images/sponsors/bosch.png' alt='sponsors' width={150} height={200}/>
                        <Image src='/../public/images/sponsors/dremel.png' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images/sponsors/karcher.png' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images/sponsors/makita.png' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images/sponsors/stanley.png' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images/sponsors/castellari.png' alt='sponsors' width={230} height={200}/>
                    </div>
            </section>
            <footer className={style.footer}>
                <div className={style.footerLogo}>
                <Link href='/home'>
                    <Image src='/../public/images/logo/toolsMatch.jpg' alt='logo' width={70} height={70}/>
                    </Link>
                </div>
                <div className={style.footerRights}>
                    <p>Copyright - ToolsMatch</p>
                </div>
                <div className={style.footerTerms}>
                    <Link href="#" onClick={handleOpenModal}>Términos y Condiciones</Link>
                </div>
                {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
            </footer>
        </div>
    )
}


// javascript:void(0)
  