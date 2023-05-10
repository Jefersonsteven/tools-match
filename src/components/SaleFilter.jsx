import React from 'react';

export default function SaleFilter({ sale, onSaleChange }) {
  return (
    <div>
      <label htmlFor="rent">Venta:</label>
      <select id="sale" value={sale} onChange={(e) => onSaleChange(e.target.value)}>
        <option value="">Todas</option>
        <option value="sale">Venta</option>
        {/* <option value="non-rental">Non-Rental</option> */}
      </select>
    </div>
  );
}