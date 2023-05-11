'use client'
import React from 'react';
import CategoryFilter from './CategoryFilter';
import RentFilter from './RentFilter';
import SaleFilter from './SaleFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

const tools = [
  { name: 'Martillo', category: 'Carpintería', rating: 4, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://example.com/martillo.jpg', description: 'Martillo de carpintería con mango de madera' },
  { name: 'Sierra circular', category: 'Carpintería', rating: 5, price: { venta: 120, alquiler: 0 }, imageUrl: 'https://example.com/sierra-circular.jpg', description: 'Sierra circular profesional con hoja de 12 pulgadas' },
  { name: 'Taladro', category: 'Electricidad', rating: 4, price: { venta: 80, alquiler: 10 }, imageUrl: 'https://example.com/taladro.jpg', description: 'Taladro de percusión con cable de 10 pies' },
  { name: 'Amoladora', category: 'Electricidad', rating: 3, price: { venta: 90, alquiler: 0 }, imageUrl: 'https://example.com/amoladora.jpg', description: 'Amoladora angular de 4.5 pulgadas con velocidad variable' },
  { name: 'Pala', category: 'Excavación', rating: 2, price: { venta: 30, alquiler: 3 }, imageUrl: 'https://example.com/pala.jpg', description: 'Pala cuadrada con mango de madera de 48 pulgadas' },
  { name: 'Martillo perforador', category: 'Excavación', rating: 0, price: { venta: 150, alquiler: 20 }, imageUrl: 'https://example.com/martillo-perforador.jpg', description: 'Martillo perforador de alta potencia con mandril de 1/2 pulgada' },
  { name: 'Cortacésped', category: 'Jardinería', rating: 4, price: { venta: 0, alquiler: 30 }, imageUrl: 'https://example.com/cortacesped.jpg', description: 'Cortacésped a gasolina de 21 pulgadas con tracción trasera' },
  { name: 'Tijeras de podar', category: 'Jardinería', rating: 0, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://example.com/tijeras-podar.jpg', description: 'Tijeras de podar de acero con mango ergonómico' }
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
      <div className="flex flex-col w-64 bg-gray-100">
  <SearchBar name={name} onNameChange={setName} />
  <CategoryFilter
    categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
  />
  <div className="flex justify-between items-center py-2 px-4 bg-gray-200 font-medium">
    {/* <div>Ordenar por:</div> */}
    <div>
      <button
        className={`py-2 px-4 ${rent ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        onClick={() => setRent(!rent)}
      >
        Arriendo
      </button>
      <button
        className={`ml-2 py-2 px-4 ${sale ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        onClick={() => setSale(!sale)}
      >
        Venta
      </button>
    </div>
  </div>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('nameAsc')}>Nombre (A-Z)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('nameDesc')}>Nombre (Z-A)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('priceAsc')}>Precio de Venta (menor a mayor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('priceDesc')}>Precio de Venta (mayor a menor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('priceAlqAsc')}>Precio de Renta (menor a mayor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('priceAlqDesc')}>Precio de Renta (mayor a menor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('ratingAsc')}>Rating (menor a mayor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('ratingDesc')}>Rating (mayor a menor)</button>
</div>
<div>
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