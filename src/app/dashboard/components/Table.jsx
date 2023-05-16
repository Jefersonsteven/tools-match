"use client"

import React from "react";
import style from "./Table.module.css";



function Table({ columns, filteredUsuarios, handleClick, handleDeleteClick }) {

    if (filteredUsuarios.length === 0) {
        return <div>No hay usuarios</div>;
      };

  return (
    <div className={style.contenedorTable}>
        <table className={style.table}>
          <tbody>
            <tr>
              {columns
                .filter((c) => c !== "ID")
                .map((c, i) => {
                  return <th key={i}>{c}</th>;
                })}
            </tr>

            {filteredUsuarios.map((d, i) => (
              <tr className={style.namesTable} key={i}>
                <td>{d.nombre}</td>
                <td>{d.telefono}</td>
                <td>{d.email}</td>
                <td>{d.reportes}</td>
                <td>{d.ordenes}</td>
                <td>
                  <button
                  className={style.botonEditar}
                    onClick={()=> handleClick(d.nombre)}>Editar
                    </button>
                  <button
                    className={style.botonDelete}
                    onClick={() => handleDeleteClick(d.nombre)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )}

export default Table;