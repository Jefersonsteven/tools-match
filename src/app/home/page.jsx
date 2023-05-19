"use client";
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import Paginated from "@/components/paginated/Paginated";
import style from "./Home.module.css";
import Image from "next/image";

function Home({ cards, currentPage, setCards, setCurrentPage }) {
  return (
    <div className="flex flex-col mt-8 p-28 min-h-screen">
      <div className={style.container}>
        <div>
          <h1 className={style.publicity}>
            Unete a la Comunidad TOOLSMATCH <br /> !Registrate hoy mismo y
            comienza a aprovechar todas las ventajas de nuestra Comunidad de
            compradores y vendedores locales!
          </h1>
        </div>
        <div className={style.image}>
          <Image
            src="/images/image/construction.png"
            alt="ToolsMatch"
            width={500}
            height={500}
          />
        </div>
      </div>
      <h2 className="text-4xl font-bold text-center m-5">
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
