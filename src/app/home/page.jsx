import Cards from "@/components/Cards/Cards";
import FilterBarDevelop from "@/components/Filter/FilterBarDevelop";
import SearchBarconCSS from "@/components/SearchBar/SearchBarconCSS";
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

function Home() {
    return (
      <AppProvider>
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <SearchBarconCSS/>
        </div>
        <div className="flex flex-1">
          <div className="w-1/4">
            <FilterBarDevelop/>            
          </div>
          <div className="w-3/4">
            <Cards/>
          </div>
        </div>
      </div>
      </AppProvider>
    );
  }
  
  export default Home;