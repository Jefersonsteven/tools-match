"use client";

import style from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className={style.footer}>
      <div className={style.footerInfo}>
        <div className={style.footerLogo}>
          <Link href="/home">
            Tools Match
            {/* <Image
            src="/../public/images/logo/toolsMatch.jpg"
            alt="logo"
            width={70}
            height={70}
          /> */}
          </Link>
        </div>
        <div className={style.footerRights}>
          <p>Copyright-ToolsMatch</p>
        </div>
        <div className={style.footerTerms}>
          <Link href="/terms">Términos y Condiciones</Link>
        </div>
      </div>
      <div className={style.contact}>
        <div className={style.contactTitle}>
          <p>Contacto</p>
        </div>
        <div className={style.contactInfo}>
          <Link href="mailto:toolmatchnotificaciones@gmail.com.com">
            <FaEnvelope size={25} className={style.contactMail} />
          </Link>

          <Link href="https://www.twitter.com/toolsmatch/" target="_blank">
            <FaTwitter size={25} className={style.contactTwitter} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
