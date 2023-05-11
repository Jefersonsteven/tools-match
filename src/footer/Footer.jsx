"use client";

import style from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Modal from "./modal";



export default function Footer() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };


    return (
        <div>
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
                </div>
                {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
            </footer>
        </div>
    )
}
