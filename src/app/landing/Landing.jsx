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
        <p className={style.sponsorsTitle}>Aliados Comerciales</p>
        <InfiniteSlider />
      </section>
    </div>
  );
}
