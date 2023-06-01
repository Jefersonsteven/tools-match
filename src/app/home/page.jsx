"use client";
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import Paginated from "@/components/paginated/Paginated";
import styles from "./Home.module.css";
import Image from "next/image";
import Slider from "./Slider";
import InfiniteSlider from "@/components/InfiniteSlider/InfiniteSlider";

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
      <InfiniteSlider />
      {/*       <Slider /> */}
      {/* -----------------------------------------  */}
      <h2 className={styles.info}>
        Renta o Compra Herramientas en Tu Comunidad
      </h2>
      <div className="container mx-auto w-full">
        <div
          className=" w-full bg-green-80"
          style={{ position: "relative", zIndex: 2 }}
        >
          <FilterBar />
        </div>
        {/* <div className="flex-grow"> */}
        <div
          className={`w-full flex justify-center flex-wrap my-4 mx-0 min-h-full ${styles.containerTwo}`}
        >
          <div className="card-container">
            <Cards className="mb-1" />
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
