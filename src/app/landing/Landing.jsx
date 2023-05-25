"use client";

import style from "./landing.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import InfiniteSlider from "@/components/InfiniteSlider/InfiniteSlider";

export default function LandingPage() {
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const toggleNavbarMenu = () => {
    setShowNavbarMenu(!showNavbarMenu);
  };

  return (
    <div className={style.landingPageContainer}>
      <Header />
      <main className={style.mainInfo}>
        <div className={style.mainInfoApp}>
          <h1>
            ToolsMatch es una aplicación innovadora que se centra en satisfacer
            las necesidades de la Comunidad para la compra y el arriendo de
            herramientas usadas.
            <br />
            <br />
            Ofrecemos una solución práctica para aquellos que buscan compartir
            recursos y ahorrar dinero en la compra de herramientas costosas.
            <br />
            <br />
            Esto no solo ayuda a los vecinos a ahorrar dinero, sino que también
            fomenta una cultura de colaboración y compartición de recursos en la
            comunidad.
            <br />
            <br />
            Si estás buscando una forma práctica y segura de compartir
            herramientas de construcción y otros equipos necesarios para el
            hogar entre vecinos, y/ó realizar una excelente inversión vendiendo
            tus herramientas usadas en buen estado o rentarlas.
            <br />
            <br />
            <p className={style.toolsM}>
              No esperes más ToolsMatch es tu mejor opción.
            </p>
          </h1>
        </div>
        <div className={style.mainGoHome}>
          <Link href="/home">Ingresar</Link>
        </div>
      </main>
      <section className={style.sponsorsContainer}>
        <h2 className={style.sponsorsTitle}>Nuestros Patrocinadores</h2>
        <InfiniteSlider />
        {/*         <div className={style.sponsorsLogos}>
          <Image
            src="/images/sponsors/dewaltt.png"
            alt="sponsors"
            width={200}
            height={200}
          />
          <Image
            src="/images/sponsors/bosch.png"
            alt="sponsors"
            width={150}
            height={200}
          />
          <Image
            src="/images/sponsors/dremel.png"
            alt="sponsors"
            width={200}
            height={200}
          />
          <Image
            src="/images/sponsors/karcher.png"
            alt="sponsors"
            width={200}
            height={200}
          />
          <Image
            src="/images/sponsors/makita.png"
            alt="sponsors"
            width={200}
            height={200}
          />
          <Image
            src="/images/sponsors/stanley.png"
            alt="sponsors"
            width={200}
            height={200}
          />
          <Image
            src="/images/sponsors/castellari.png"
            alt="sponsors"
            width={230}
            height={200}
          />
          <Image
            src="/images/sponsors/fischer.png"
            alt="sponsors"
            width={230}
            height={200}
          />
          <Image
            src="/images/sponsors/irimo.png"
            alt="sponsors"
            width={130}
            height={180}
          />
          <Image
            src="/images/sponsors/libus.png"
            alt="sponsors"
            width={230}
            height={200}
          />
          <Image
            src="/images/sponsors/philips.png"
            alt="sponsors"
            width={150}
            height={150}
          />
          <Image
            src="/images/sponsors/skil.png"
            alt="sponsors"
            width={180}
            height={180}
          />
        </div> */}
      </section>
    </div>
  );
}
