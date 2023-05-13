"use client"
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import SearchBarconCSS from "@/components/SearchBar/SearchBarconCSS";

function Home() {

  const { cards, tools, title, setTitle, selectedType, setSelectedType, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useContext(AppContext);

    return (
      <AppProvider>
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <SearchBarconCSS/>
        </div>
        <div className="flex flex-1">
          <div className="w-1/4">
            <FilterBar/>            
          </div>
          <div className="w-3/4">
            <Cards/>
          </div>
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