"use client";
import Cards from "@/components/Cards/Cards";
import FilterBar from "@/components/Filter/FilterBar";
import FormReview from "@/components/FormReview";
import Paginated from "@/components/paginated/Paginated";

function Home({cards, currentPage, setCards, setCurrentPage } ) {

  return (
    <div>
      <FormReview/>

    </div>
  );
}

export default Home;
