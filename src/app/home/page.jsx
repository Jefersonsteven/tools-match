"use client"
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";

function Home() {

   return (   
      <div className="flex flex-col h-screen">
        <div className="w-full bg-gray-100">
          <div className="flex justify-between max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <FilterBar />
            </div>            
            </div>
        </div>
        <div className="flex flex-1">
          <div className="w-full">
            <div className="flex flex-wrap justify-center">
              <Cards className="mb-4" />
            </div>
          </div>
        </div>
      </div>
  )}
  
  export default Home;