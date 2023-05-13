import React from 'react';
import { AppContext, AppProvider } from "@/context/AppContext";
import { useContext } from 'react';

export default function RentFilter({ rent, onRentChange }) {
  return (
    <AppProvider>
    <div>
      {/* <label htmlFor="rent">Arrendamiento:</label> */}
      <button onClick={() => onRentChange('LEASE')}>Arriendo</button>
    </div>
    </AppProvider>
  );
}