"use client"


function Busqueda({ searchTerm, setSearchTerm }) {
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
    };
    return (
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
      </div>
    );
  }
  
  export default Busqueda;