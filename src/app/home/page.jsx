"use client";
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import Paginated from "@/components/paginated/Paginated";

function Home({cards, currentPage, setCards, setCurrentPage } ) {

  return (
    <div className="flex flex-col mt-8 p-28 min-h-screen">
      <h1 className="text-4xl font-bold text-center m-5">
        Renta o Compra Herramientas en Tu Comunidad
      </h1>
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
