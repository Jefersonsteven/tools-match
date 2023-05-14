'use client'
import CategoryFilter from './CategoryFilter';
import SearchBar from '../SearchBar/SearchBar';
import { AppContext, AppProvider } from "@/context/AppContext";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';


export default function FilterBar() {
  const { cards, setCards, title, setTitle, selectedType, setSelectedType, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useContext(AppContext);

  // const tools = async () => {
  //   const response = await axios.get('http://localhost:3000/api/admin/post');
  //   return response.data;
  // }

  // useEffect(()=>{
  //   if (cards.length ===0)setCards(tools)
  // }, [])  


//  useEffect(async () => {
//     const toolsData = await tools();
//     setCards(toolsData);
// }, []);

  useEffect(()=>{
    FilterLechu()
  }, [title, selectedCategory, selectedType, sortBy]) 

  //console.log('selectedCategory', selectedCategory)
  // console.log('selectedType', selectedType)
  // console.log('title', title)
  // console.log('sortBy', sortBy)

  const FilterLechu = () => {    

    let myFilter = [...cards]
    if (title !== '') myFilter = myFilter.filter(tool => tool.title.toLowerCase().includes(title.toLowerCase()))
    if (title === '') myFilter = [...cards]
    if (selectedCategory !== '') myFilter = myFilter.filter (tool => tool.category == selectedCategory)
    if (selectedType !== '') myFilter = myFilter.filter (tool => tool.type === selectedType)
    if (sortBy !== '') {
      if (sortBy === 'titleAsc') {
        myFilter = myFilter.sort((a, b) => a.title.localeCompare(b.title));
      } if (sortBy === 'titleDesc') {
        myFilter = myFilter.sort((a, b) => b.title.localeCompare(a.title));
      } if (sortBy === 'priceAsc') {
        myFilter = myFilter.sort((a, b) => a.price - b.price);
      } if (sortBy === 'priceDesc') {
        myFilter = myFilter.sort((a, b) => b.price - a.price);
      } if (sortBy === 'ratingAsc') {
        myFilter = myFilter.sort((a, b) => a.rating - b.rating);
      } if (sortBy === 'ratingDesc') {
        myFilter = myFilter.sort((a, b) => b.rating - a.rating);
      }
    }
    setCards(myFilter);      
  }

  return (
    <AppProvider>
      <div className="flex flex-col w-64 bg-gray-100">
  <SearchBar
    title = {title}
    setTitle = {setTitle}
  />
  <CategoryFilter
    categories={['Carpintería', 'Electricidad', 'Excavación', 'Jardinería']}
    selectedCategory = {selectedCategory}
    setSelectedCategory = {setSelectedCategory}    
  />
  <button onClick={()=> setSelectedType('')}>Todos</button>
  <button onClick={()=> setSelectedType('LEASE')}>Arriendo</button>
  <button onClick={()=> setSelectedType('SALE')}>Venta</button>
  <div className="py-2 px-4 bg-gray-200 font-medium">Ordenar por:</div>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('')}>Default</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('titleAsc')}>Nombre (A-Z)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('titleDesc')}>Nombre (Z-A)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('priceAsc')}>Precio (Asc)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('priceDesc')}>Precio (Des)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('ratingAsc')}>Rating (Asc)</button>
    <button className="py-2 px-4 hover:bg-gray-200" onClick={() => setSortBy('ratingDesc')}>Rating (Des)</button>
</div>
    </AppProvider>
  );
}