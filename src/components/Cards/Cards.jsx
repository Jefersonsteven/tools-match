import Card from './Card.jsx';

const tools = [
  { name: 'Martillo', category: 'Carpintería', rating: 4, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RE25sL7PPH-WQsGEqThwl_pnSf04ZHsCQtL1C5fjRyk9Stp7GZaC6PbI_GtfHS2hGS8&usqp=CAU', description: 'Martillo de carpintería con mango de madera' },
  { name: 'Sierra circular', category: 'Carpintería', rating: 5, price: { venta: 120, alquiler: 0 }, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzLA__pyI7l9mqP3oDMx9o6MTBI3XpzaohFSRlVl3F5Cm6-I81gOBrGujE6LGTrMV6smj4CAQgJGtU1R1pV0kS97rfzCHwS61FaFM8-6H79ZOO7fwu0iuTXsgWUQ2C_IUpmwI&usqp=CAc', description: 'Sierra circular profesional con hoja de 12 pulgadas' },
  { name: 'Taladro', category: 'Electricidad', rating: 4, price: { venta: 0, alquiler: 10 }, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBarmuk7dbs9TBrq7b4mcACyo_BarqRJKcLad_x219aO-9GFgkmRG5aQZ4zzUVLhc7jlF2DfYgNfpukczq9FD3koPd8fPLPCgD6KHpdXjDLz75yUXWvfU0AiaI5F9OPsfphms&usqp=CAc', description: 'Taladro de percusión con cable de 10 pies' },
  { name: 'Amoladora', category: 'Electricidad', rating: 3, price: { venta: 90, alquiler: 0 }, imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7XtSHjObVZ1gYSBGsiAjf1cYI66F5hAFeGP8kBtwabxOBdjYE8VypFH-OBj8Xf7M2mcL5w4RUEyEGrnQLkgM4lpE0wKApMy1Wgtmjs_czzJWBi9O66-W6tL6RUnfZPJ3rvw&usqp=CAc', description: 'Amoladora angular de 4.5 pulgadas con velocidad variable' },
  { name: 'Pala', category: 'Excavación', rating: 2, price: { venta: 0, alquiler: 3 }, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQWsdFgFwKeh0QOobzWmz7Hg7-Eh49BHDpHQo3cumjg4Ygwea7UnGu3A9B0ZvwLxmS87SUwux3UGdIL_0qDlxr1nrwFEZmUvkye2ljFcEhyMrBmO0Oy3GF4R5KuUEfNl7PrXA&usqp=CAc', description: 'Pala cuadrada con mango de madera de 48 pulgadas' },
  { name: 'Martillo perforador', category: 'Excavación', rating: 0, price: { venta: 150, alquiler: 0 }, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmUlklTGBNEDLcsUn6yeRL9ZrDGeUwk4k4QHz_2tquPp5hSC1REqd8eFuez3FFUwT6bE_Dt4n794uAvPOJ6MMVWzqqSmwHlxN1QwJ1FEQHn9gtv-qimIIixVE3toO52HEWk-w&usqp=CAc', description: 'Martillo perforador de alta potencia con mandril de 1/2 pulgada' },
  { name: 'Cortacésped', category: 'Jardinería', rating: 4, price: { venta: 0, alquiler: 30 }, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRVszEOu1Pe7afrlEKJcGK__yfbJ4n62G1HTxzlT6N4TTSDmOPLTlh_iOcl4R3aCoWhUCpeT_luIlZmlh8grNTOIIEKpKMeJYdQ9YYQt7CpX7wY69myeitr9zaSaqIYAS_bPIY&usqp=CAc', description: 'Cortacésped a gasolina de 21 pulgadas con tracción trasera' },
  { name: 'Tijeras de podar', category: 'Jardinería', rating: 0, price: { venta: 0, alquiler: 5 }, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ_9NAmeJK2WFmkzY3OUrErWzySJyH3-G-GDKoofCkAPGa_IH5Rq7SprK5Hn3jebGp9UhLkNsMUzzA-n1OrkLP8A6ETCBCMFq0NEiTfkGlP79Zd6EqwkN81wot4XC2Rcv5urrs&usqp=CAc', description: 'Tijeras de podar de acero con mango ergonómico' }
];

// const tools = [
//   { name: 'Martillo', category: 'Carpintería', rating: 4, price: { venta: 0, alquiler: 5 }, description: 'Martillo de carpintería con mango de madera' },
//   { name: 'Sierra circular', category: 'Carpintería', rating: 5, price: { venta: 120, alquiler: 0 }, description: 'Sierra circular profesional con hoja de 12 pulgadas' },
//   { name: 'Taladro', category: 'Electricidad', rating: 4, price: { venta: 0, alquiler: 10 }, description: 'Taladro de percusión con cable de 10 pies' },
//   { name: 'Amoladora', category: 'Electricidad', rating: 3, price: { venta: 90, alquiler: 0 }, description: 'Amoladora angular de 4.5 pulgadas con velocidad variable' },
//   { name: 'Pala', category: 'Excavación', rating: 2, price: { venta: 0, alquiler: 3 }, description: 'Pala cuadrada con mango de madera de 48 pulgadas' },
//   { name: 'Martillo perforador', category: 'Excavación', rating: 0, price: { venta: 150, alquiler: 0 }, description: 'Martillo perforador de alta potencia con mandril de 1/2 pulgada' },
//   { name: 'Cortacésped', category: 'Jardinería', rating: 4, price: { venta: 0, alquiler: 30 }, description: 'Cortacésped eléctrico de 12 amperios con bolsa recolectora' }
// ];

const Cards = () => {
  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold mb-4">Herramientas</h1> */}
      <div className="grid grid-cols-4 gap-4">
        {tools.map(tool => (
          <div className="w-full" key={tool.name}>
            <Card
              // description={tool.description}
              imageUrl={tool.imageUrl}
              name={tool.name}
              price={tool.price.venta > 0 ? tool.price.venta : tool.price.alquiler + ' por dia'}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;