'use client'
import React, { useEffect } from 'react';
import CategoryFilter from './CategoryFilter';
import RentFilter from './RentFilter';
import SaleFilter from './SaleFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';
import Card from '../Cards/Card';

// const tools = [
//   { name: 'Martillo', category: 'Carpintería', rating: 4, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://example.com/martillo.jpg', description: 'Martillo de carpintería con mango de madera' },
//   { name: 'Sierra circular', category: 'Carpintería', rating: 5, price: { venta: 120, alquiler: 0 }, imageUrl: 'https://example.com/sierra-circular.jpg', description: 'Sierra circular profesional con hoja de 12 pulgadas' },
//   { name: 'Taladro', category: 'Electricidad', rating: 4, price: { venta: 80, alquiler: 10 }, imageUrl: 'https://example.com/taladro.jpg', description: 'Taladro de percusión con cable de 10 pies' },
//   { name: 'Amoladora', category: 'Electricidad', rating: 3, price: { venta: 90, alquiler: 0 }, imageUrl: 'https://example.com/amoladora.jpg', description: 'Amoladora angular de 4.5 pulgadas con velocidad variable' },
//   { name: 'Pala', category: 'Excavación', rating: 2, price: { venta: 30, alquiler: 3 }, imageUrl: 'https://example.com/pala.jpg', description: 'Pala cuadrada con mango de madera de 48 pulgadas' },
//   { name: 'Martillo perforador', category: 'Excavación', rating: 0, price: { venta: 150, alquiler: 20 }, imageUrl: 'https://example.com/martillo-perforador.jpg', description: 'Martillo perforador de alta potencia con mandril de 1/2 pulgada' },
//   { name: 'Cortacésped', category: 'Jardinería', rating: 4, price: { venta: 0, alquiler: 30 }, imageUrl: 'https://example.com/cortacesped.jpg', description: 'Cortacésped a gasolina de 21 pulgadas con tracción trasera' },
//   { name: 'Tijeras de podar', category: 'Jardinería', rating: 0, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://example.com/tijeras-podar.jpg', description: 'Tijeras de podar de acero con mango ergonómico' }
// ];

const tools = [
  { name: 'Martillo', category: 'Carpintería', rating: 4, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RE25sL7PPH-WQsGEqThwl_pnSf04ZHsCQtL1C5fjRyk9Stp7GZaC6PbI_GtfHS2hGS8&usqp=CAU', description: 'Martillo de carpintería con mango de madera' ,type: 'LEASE' },
  { name: 'Sierra circular', category: 'Carpintería', rating: 5, price: { venta: 120, alquiler: 0 }, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzLA__pyI7l9mqP3oDMx9o6MTBI3XpzaohFSRlVl3F5Cm6-I81gOBrGujE6LGTrMV6smj4CAQgJGtU1R1pV0kS97rfzCHwS61FaFM8-6H79ZOO7fwu0iuTXsgWUQ2C_IUpmwI&usqp=CAc', description: 'Sierra circular profesional con hoja de 12 pulgadas', type: 'SALE' },
  { name: 'Taladro', category: 'Electricidad', rating: 4, price: { venta: 0, alquiler: 10 }, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBarmuk7dbs9TBrq7b4mcACyo_BarqRJKcLad_x219aO-9GFgkmRG5aQZ4zzUVLhc7jlF2DfYgNfpukczq9FD3koPd8fPLPCgD6KHpdXjDLz75yUXWvfU0AiaI5F9OPsfphms&usqp=CAc', description: 'Taladro de percusión con cable de 10 pies', type: 'SALE' },
  { name: 'Amoladora', category: 'Electricidad', rating: 3, price: { venta: 90, alquiler: 0 }, imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7XtSHjObVZ1gYSBGsiAjf1cYI66F5hAFeGP8kBtwabxOBdjYE8VypFH-OBj8Xf7M2mcL5w4RUEyEGrnQLkgM4lpE0wKApMy1Wgtmjs_czzJWBi9O66-W6tL6RUnfZPJ3rvw&usqp=CAc', description: 'Amoladora angular de 4.5 pulgadas con velocidad variable',type: 'SALE' },
  { name: 'Pala', category: 'Excavación', rating: 2, price: { venta: 0, alquiler: 3 }, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQWsdFgFwKeh0QOobzWmz7Hg7-Eh49BHDpHQo3cumjg4Ygwea7UnGu3A9B0ZvwLxmS87SUwux3UGdIL_0qDlxr1nrwFEZmUvkye2ljFcEhyMrBmO0Oy3GF4R5KuUEfNl7PrXA&usqp=CAc', description: 'Pala cuadrada con mango de madera de 48 pulgadas',type: 'SALE' },
  { name: 'Martillo perforador', category: 'Excavación', rating: 0, price: { venta: 150, alquiler: 0 }, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmUlklTGBNEDLcsUn6yeRL9ZrDGeUwk4k4QHz_2tquPp5hSC1REqd8eFuez3FFUwT6bE_Dt4n794uAvPOJ6MMVWzqqSmwHlxN1QwJ1FEQHn9gtv-qimIIixVE3toO52HEWk-w&usqp=CAc', description: 'Martillo perforador de alta potencia con mandril de 1/2 pulgada' ,type: 'LEASE'},
  { name: 'Cortacésped', category: 'Jardinería', rating: 4, price: { venta: 0, alquiler: 30 }, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRVszEOu1Pe7afrlEKJcGK__yfbJ4n62G1HTxzlT6N4TTSDmOPLTlh_iOcl4R3aCoWhUCpeT_luIlZmlh8grNTOIIEKpKMeJYdQ9YYQt7CpX7wY69myeitr9zaSaqIYAS_bPIY&usqp=CAc', description: 'Cortacésped a gasolina de 21 pulgadas con tracción trasera' ,type: 'LEASE'},
  { name: 'Tijeras de podar', category: 'Jardinería', rating: 0, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ_9NAmeJK2WFmkzY3OUrErWzySJyH3-G-GDKoofCkAPGa_IH5Rq7SprK5Hn3jebGp9UhLkNsMUzzA-n1OrkLP8A6ETCBCMFq0NEiTfkGlP79Zd6EqwkN81wot4XC2Rcv5urrs&usqp=CAc', description: 'Tijeras de podar de acero con mango ergonómico' ,type: 'LEASE' }
];

export default function FilterBar() {
  const { cards, setCards, selectedCategory, setSelectedCategory, name, setName } = useContext(AppContext);

  //const [cards, setCards] = useState([])
  useEffect(()=>{
    if (cards.length ===0)setCards(tools)
    console.log(cards)
  }, [cards])

  function handleSort(sortBy){
    const sortedTools = cards.sort((a, b) => {
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
    })
    // console.log(sortedTools)
    setCards(sortedTools);    
  }

  

  function handleFilter(type){
    const filteredTools = cards.filter(
      (tool) =>
        (!selectedCategory || tool.category === selectedCategory) &&
        tool.type === type &&
        (!name || tool.name.toLowerCase().includes(name.toLowerCase()))
    ) 
    setCards(filteredTools)
  }

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
        className={`py-2 px-4 bg-gray-200 text-gray-700 hover:bg-gray-300`}
        onClick={() => {handleFilter('LEASE')}}
      >
        Arriendo
      </button>
      <button
        className={`ml-2 py-2 px-4 bg-green-500 text-white hover:bg-gray-300`}
      onClick={() => {handleFilter('SALE')}}
      >
        Venta
      </button>
    </div>
  </div>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('nameAsc')}}>Nombre (A-Z)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('nameDesc')}}>Nombre (Z-A)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('priceAsc')}}>Precio de Venta (menor a mayor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('priceDesc')}}>Precio de Venta (mayor a menor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('priceAlqAsc')}}>Precio de Renta (menor a mayor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('priceAlqDesc')}}>Precio de Renta (mayor a menor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('ratingAsc')}}>Rating (menor a mayor)</button>
  <button className="py-2 px-4 hover:bg-gray-200" onClick={() => {handleSort('ratingDesc')}}>Rating (mayor a menor)</button>
</div>
    </AppProvider>
  );
}