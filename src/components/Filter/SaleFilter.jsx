import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

export default function SaleFilter({ sale, onSaleChange }) {
  return (
    <AppProvider>
    <div>
      <label htmlFor="rent">Venta:</label>
      <select id="sale" value={sale} onChange={(e) => onSaleChange(e.target.value)}>
        <option value="">Todas</option>
        <option value="sale">Venta</option>        
      </select>
    </div>
    </AppProvider>
  );
}