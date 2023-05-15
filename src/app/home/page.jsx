"use client"
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import Map from "@/components/Map/Map";

function Home() {

  return (
    <div className="flex flex-col mt-8 ">
      <h1 className="text-4xl font-bold text-center m-5">Renta o Compra Herramientas en Tu Comunidad</h1>
      <div className="container mx-auto px-4">
        <div className="bg-green-80 flex justify-between py-4 px-4 sm:px-6 lg:px-8">
          <FilterBar />
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap my-4 mx-0">
            <Map />
            <Cards className="mb-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

  export default Home;