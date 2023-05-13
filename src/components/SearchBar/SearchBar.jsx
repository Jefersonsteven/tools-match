import React from 'react';

export default function SearchBar({title, setTitle}) {

 
  return (
        <div>
      <input
        type="text"
        placeholder="Buscar herramienta..."
        //value={title}
        onChange={(e)=> setTitle(e.target.value)}
      />
    </div>
   );
}