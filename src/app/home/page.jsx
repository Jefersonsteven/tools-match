import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";

function Home() {
  return (
    <div className="flex">
      <div className="w-1/4">
        <FilterBar/>            
      </div>
      <div className="w-3/4">
        <Cards/>
      </div>
    </div>
  );
}

export default Home;
