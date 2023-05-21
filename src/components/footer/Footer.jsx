"use client";

import style from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className={style.footer}>
      <div className={style.footerLogo}>
        <Link href="/home">
          <Image
            src="/../public/images/logo/toolsMatch.jpg"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <div className={style.footerRights}>
        <p>Copyright - ToolsMatch</p>
      </div>
      <div className={style.footerTerms}>
        <Link href="/terms">Términos y Condiciones</Link>
      </div>
      <div className={style.contact}>
        <p>Contacto</p>
        <Link href="mailto:toolsmatch.gmail.com">
          <Image
            src="/images/icons/mail.png"
            alt="mail"
            width={30}
            height={30}
          />
          <Image
            src="/images/icons/twitter.png"
            alt="mail"
            width={30}
            height={30}
          />
        </Link>
      </div>
    </footer>
  );
}
