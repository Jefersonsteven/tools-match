'use client'
import React from 'react';
import CategoryFilter from './CategoryFilter';
import RentFilter from './RentFilter';
import SaleFilter from './SaleFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

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
  const { selectedCategory, setSelectedCategory, rent, setRent, sale, setSale, sortBy, setSortBy, name, setName } = useContext(AppContext);


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
    } else if (sortBy === 'priceAsc') {
      return a.price.venta - b.price.venta;
    } else if (sortBy === 'priceDesc') {
      return b.price.venta - a.price.venta;
    } else if (sortBy === 'priceAlqAsc') {
      return a.price.alquiler - b.price.alquiler;
    } else if (sortBy === 'priceAlqDesc') {
      return b.price.alquiler - a.price.alquiler;
    } else if (sortBy === 'ratingAsc') {
      return a.rating - b.rating;
    } else if (sortBy === 'ratingDesc') {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });


  return (
    <AppProvider>
      <div>
        <SearchBar name={name} onNameChange={setName} />
        <CategoryFilter
          categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <RentFilter rent={rent} onRentChange={setRent} />
        <SaleFilter sale={sale} onSaleChange={setSale} />
        <div><button onClick={() => setSortBy('nameAsc')}>Ordenar A-Z</button></div>
        <div><button onClick={() => setSortBy('nameDesc')}>Ordenar Z-A</button></div>
        <div><button onClick={() => setSortBy('priceAsc')}>Precio de Venta (menor a mayor)</button></div>
        <div><button onClick={() => setSortBy('priceDesc')}>Precio de Venta (mayor a menor)</button></div>
        <div><button onClick={() => setSortBy('priceAlqAsc')}>Precio de Renta (menor a mayor)</button></div>
        <div><button onClick={() => setSortBy('priceAlqDesc')}>Precio de Renta (mayor a menor)</button></div>
        <div><button onClick={() => setSortBy('ratingAsc')}>Rating (menor a mayor)</button></div>
        <div><button onClick={() => setSortBy('ratingDesc')}>Rating (mayor a menor)</button></div>
        <ul>
          {filteredTools.map((tool) => (
            <li key={tool.name}>
              {tool.name} - {tool.category} - ${tool.price.venta} - ${tool.price.alquiler}/día - {tool.rating} Jeffersons
            </li>
          ))}
        </ul>
      </div>
    </AppProvider>
  );
}