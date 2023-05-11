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
                <Link href='#'>
                    <Image src='/../public/images-landing/toolsMatch.jpg' alt='logo' width={100} height={100}/>
                </Link>

                </div>
                <div className={style.navbarMenu}>
                    <button>Home</button>
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
                        <Image src='/../public/images-landing/bosch.jpg' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images-landing/dewalt.jpg' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images-landing/dremel.jpg' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images-landing/karcher.jpg' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images-landing/makita.jpg' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images-landing/stanley.jpg' alt='sponsors' width={200} height={200}/>
                        <Image src='/../public/images-landing/castellari.jpg' alt='sponsors' width={200} height={200}/>
                    </div>
            </section>
            <footer className={style.footer}>
                <div className={style.footerLogo}>
                <Link href='#'>
                    <Image src='/../public/images-landing/toolsMatch.jpg' alt='logo' width={70} height={70}/>
                    </Link>
                </div>
                <div className={style.footerRights}>
                    <p>Copyright - ToolsMatch</p>
                </div>
                <div className={style.footerTerms}>
                    <Link href="#" onClick={handleOpenModal}>Términos y Condiciones</Link>
                    {/* TODO:  Change*/}
                </div>
                {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
            </footer>
        </div>
    )
}


// javascript:void(0)
   {/* <section className={style.teamContainer}>
                <div className={style.infoTeam}>
                    <p className={style.teamTitle}>EQUIPO</p>
                    <p className={style.teamSubTitle}>Somos un equipo de colaboradores detrás de ToolsMatch demostrando un alto
                        nivel de compromiso, pasión y profesionalismo en nuestro trabajo. Es inspirador
                        ver cómo trabajamos juntos para lograr los objetivos y ofrecer un servicio
                        excepcional a nuestros clientes. </p>
                </div>
                <div className={style.teamContact}>
                    {teamMembers.map(person => (
                        <div key={person.name} className={style.teamContactInfo}>
                            <Image
                                src={`/../public/images-landing/${person.image}`}
                                width={250}
                                height={250}
                                alt={person.name}
                                className={style.teamImage}
                            />
                            <h2 className={style.teamName}>{person.name}</h2>
                            <div className={style.teamLinks}>
                                <a href='https://github.com' target='_blanket'>
                                    <Image className={style.github} src='/../public/images-landing/github.jpg' alt='GitHub' width={35} height={40} />
                                </a>
                                <a href='https://linkedin.com' target='_blanket'>
                                    <Image className={style.linkedin} src='/../public/images-landing/linkedin.jpg' alt='LinkedIn' width={50} height={40} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}