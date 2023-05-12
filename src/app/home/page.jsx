import Cards from "@/components/Cards/Cards";
import FilterBarDevelop from "@/components/Filter/FilterBarDevelop";
import SearchBarconCSS from "@/components/SearchBar/SearchBarconCSS";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <SearchBarconCSS />
      </div>
      <div className="flex flex-1">
        <div className="w-1/4">
          <FilterBarDevelop />
        </div>
        <div className="w-3/4">
          <Cards />
        </div>
      </div>
    </div>
  );
}

export default Home;