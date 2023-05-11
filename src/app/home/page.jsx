import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import SearchBarconCSS from "@/components/SearchBar/SearchBarconCSS";

function Home() {
<<<<<<< HEAD
    return (
        <div>
        <div>
          <SearchBarconCSS/>
        </div>
        <div>
            <FilterBar/>
        </div>
        </div>
    );
=======
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
>>>>>>> f8e16c68b4e4e28395afb5ba8e059582b17f6b2c
}

export default Home;
