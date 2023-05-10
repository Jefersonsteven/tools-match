import React from 'react';

export default function RentFilter({ rent, onRentChange }) {
  return (
    <div>
      <label htmlFor="rent">Arrendamiento:</label>
      <select id="rent" value={rent} onChange={(e) => onRentChange(e.target.value)}>
        <option value="">Todas</option>
        <option value="rental">Arrendamiento</option>
        {/* <option value="non-rental">Non-Rental</option> */}
      </select>
    </div>
  );
}