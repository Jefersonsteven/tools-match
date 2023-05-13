import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

export default function SaleFilter({ sale, onSaleChange }) {
  return (
    <AppProvider>
    <div>
      {/* <label htmlFor="rent">Arrendamiento:</label> */}
      <button onClick={() => onRentChange('SALE')}>Arriendo</button>
    </div>
    </AppProvider>
  );
}