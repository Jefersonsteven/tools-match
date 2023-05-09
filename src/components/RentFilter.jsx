import React from 'react';

export default function RentFilter({ rent, onRentChange }) {
  return (
    <div>
      <label htmlFor="rent">Filter by rent:</label>
      <select id="rent" value={rent} onChange={(e) => onRentChange(e.target.value)}>
        <option value="">All</option>
        <option value="rental">Rental</option>
        <option value="non-rental">Non-Rental</option>
      </select>
    </div>
  );
}