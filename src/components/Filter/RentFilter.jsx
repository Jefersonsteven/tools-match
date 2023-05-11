import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

export default function RentFilter({ rent, onRentChange }) {
  return (
    <AppProvider>
    <div>
      <label htmlFor="rent">Arrendamiento:</label>
      <select id="rent" value={rent} onChange={(e) => onRentChange(e.target.value)}>
        <option value="">Todas</option>
        <option value="rental">Arrendamiento</option>
        {/* <option value="non-rental">Non-Rental</option> */}
      </select>
    </div>
    </AppProvider>
  );
}