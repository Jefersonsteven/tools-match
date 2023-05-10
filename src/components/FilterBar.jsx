import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import RentFilter from './RentFilter';
import SaleFilter from './SaleFilter';
import SearchBar from './SearchBar';

const tools = [
  { name: 'Martillo', category: 'Carpintería', rating: 4, price: { venta: 0, alquiler: 5 } },
  { name: 'Sierra circular', category: 'Carpintería', rating: 5, price: { venta: 120, alquiler: 0 } },
  { name: 'Taladro', category: 'Electricidad', rating: 4, price: { venta: 80, alquiler: 10 } },
  { name: 'Amoladora', category: 'Electricidad', rating: 3, price: { venta: 90, alquiler: 0 } },
  { name: 'Pala', category: 'Excavación', rating: 2, price: { venta: 30, alquiler: 3 } },
  { name: 'Martillo perforador', category: 'Excavación', rating: 0, price: { venta: 150, alquiler: 20 } },
  { name: 'Cortacésped', category: 'Jardinería', rating: 4, price: { venta: 0, alquiler: 30 } },
  { name: 'Tijeras de podar', category: 'Jardinería', rating: 0, price: { venta: 0, alquiler: 5 } }
];

export default function FilterBar() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rent, setRent] = useState('');
  const [sale, setSale] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [name, setName] = useState('');
 

  const filteredTools = tools
    .filter(
      (tool) =>
      (!selectedCategory || tool.category === selectedCategory) &&
      (!rent || (rent === 'rental' ? tool.price.alquiler > 0 : tool.price.alquiler === 0)) &&
      (!sale || tool.price.venta > 0) &&
      (!name || tool.name.toLowerCase().includes(name.toLowerCase()))
  )

    const sortedTools = filteredTools.sort((a, b) => {
      if (sortBy === 'nameAsc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'nameDesc') {
        return b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return a.price.venta - b.price.venta;
      } else {
        return b.rating - a.rating;
      }
    });  


  return (
    <div>
      <SearchBar name={name} onNameChange={setName} />
      <CategoryFilter
        categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <RentFilter rent={rent} onRentChange={setRent} />
      <SaleFilter sale={sale} onSaleChange={setSale} />
      <button onClick={() => setSortBy('nameAsc')}>Ordenar A-Z</button>
      <button onClick={() => setSortBy('nameDesc')}>Ordenar Z-A</button>
      {/* <PriceSorter sortBy={sortBy} onSortByChange={setSortBy} /> */}
      <ul>
        {filteredTools.map((tool) => (
          <li key={tool.name}>
            {tool.name} - {tool.category} - ${tool.price.venta} - ${tool.price.alquiler}/día
          </li>
        ))}
      </ul>
    </div>
  );
}