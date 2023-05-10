import React from 'react';

export default function SaleFilter({ sale, onSaleChange }) {
  return (
    <div>
      <label htmlFor="rent">Filter by sale:</label>
      <select id="sale" value={sale} onChange={(e) => onSaleChange(e.target.value)}>
        <option value="">All</option>
        <option value="sale">Sale</option>
        {/* <option value="non-rental">Non-Rental</option> */}
      </select>
    </div>
  );
}