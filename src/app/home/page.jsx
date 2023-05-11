import FilterBar from "@/components/Filter/FilterBar";
import SearchBarconCSS from "@/components/SearchBar/SearchBarconCSS";

function Home() {
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
}
export default Home;
