"use client";
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import Paginated from "@/components/paginated/Paginated";
import styles from "./Home.module.css";
import Image from "next/image";
import Slider from "./Slider";

function Home({ cards, currentPage, setCards, setCurrentPage }) {
  return (
    <div>
      {/* ---------- Banner de publicidad --------- */}
      <div className={styles.container}>
        <div className={styles.banner}>
          <p className={styles.bannerTitle}>Unete a la Comunidad TOOLSMATCH</p>
          <p className={styles.bannerSubTitle}>
            !Registrate hoy mismo y comienza a aprovechar todas las ventajas de
            nuestra Comunidad de compradores y vendedores locales!
          </p>
        </div>
        <div className={styles.image}>
          <Image
            src="/images/image/construction.jpg"
            alt="ToolsMatch"
            width={600}
            height={500}
          />
        </div>
      </div>

      <Slider />
      {/* -----------------------------------------  */}
      <h2 className={styles.info}>
        Renta o Compra Herramientas en Tu Comunidad
      </h2>
      <div className="container mx-auto px-4">
        <div className="bg-green-80 flex justify-between py-4 px-4 sm:px-6 lg:px-8">
          <FilterBar />
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap my-4 mx-0">
            <Cards className="mb-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
