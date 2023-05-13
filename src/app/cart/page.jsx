"use client";

import Card from "../../components/Cards/Card";
import style from "./Cart.module.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import Footer from "../../components/footer/Footer";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showVenta, setShowVenta] = useState(false);
  const [total, setTotal] = useState(0);
  const [showCards, setShowCards] = useState(true);

  const [cartItems, setCartItems] = useState(() => {
    const items = localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddToCart = (tool) => {
    const itemIndex = cartItems.findIndex((item) => item.name === tool.name);

    if (itemIndex === -1) {
      setCartItems([
        ...cartItems,
        {
          imageUrl: tool.imageUrl,
          name: tool.name,
          price: tool.price.venta > 0 ? tool.price.venta : tool.price.alquiler,
          saleType: tool.price.alquiler > 0 ? "Arriendo" : "Venta",
          added: false, // Para mostrar el mensaje de "Agregado al carrito"
        },
      ]);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].price +=
        tool.price.venta > 0 ? tool.price.venta : tool.price.alquiler;
      setCartItems(updatedCartItems);
    }
  };

  const handleBuyClick = () => {
    const updatedCartItems = cartItems.filter((item) => !item.added);
    setCartItems(updatedCartItems);
    setShowVenta(true);
    setShowCards(false); // Agrega esta línea para ocultar las cards al hacer click en el botón comprar
    setCartItems([]);
  };

  const handleRemoveFromCart = (id, price) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(itemIndex, 1);
    setCartItems(updatedCartItems);
    setTotal((prevTotal) => prevTotal - price);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    let sum = 0;
    cartItems.forEach((cartItem) => {
      sum += cartItem.price;
    });
    setTotal(sum);
  }, [cartItems]);

  const tools = [
    {
      name: "Perforadora",
      category: "Excavación",
      rating: 0,
      price: { venta: 150, alquiler: 0 },
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmUlklTGBNEDLcsUn6yeRL9ZrDGeUwk4k4QHz_2tquPp5hSC1REqd8eFuez3FFUwT6bE_Dt4n794uAvPOJ6MMVWzqqSmwHlxN1QwJ1FEQHn9gtv-qimIIixVE3toO52HEWk-w&usqp=CAc",
      description:
        "Martillo perforador de alta potencia con mandril de 1/2 pulgada",
    },
    {
      name: "Martillo",
      category: "Carpintería",
      rating: 4,
      price: { venta: 35, alquiler: 0 },
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RE25sL7PPH-WQsGEqThwl_pnSf04ZHsCQtL1C5fjRyk9Stp7GZaC6PbI_GtfHS2hGS8&usqp=CAU",
      description: "Martillo de carpintería con mango de madera",
    },
    {
      name: "Sierra circular",
      category: "Carpintería",
      rating: 5,
      price: { venta: 120, alquiler: 0 },
      imageUrl:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSzLA__pyI7l9mqP3oDMx9o6MTBI3XpzaohFSRlVl3F5Cm6-I81gOBrGujE6LGTrMV6smj4CAQgJGtU1R1pV0kS97rfzCHwS61FaFM8-6H79ZOO7fwu0iuTXsgWUQ2C_IUpmwI&usqp=CAc",
      description: "Sierra circular profesional con hoja de 12 pulgadas",
    },
    {
      name: "Amoladora",
      category: "Electricidad",
      rating: 3,
      price: { venta: 90, alquiler: 0 },
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR7XtSHjObVZ1gYSBGsiAjf1cYI66F5hAFeGP8kBtwabxOBdjYE8VypFH-OBj8Xf7M2mcL5w4RUEyEGrnQLkgM4lpE0wKApMy1Wgtmjs_czzJWBi9O66-W6tL6RUnfZPJ3rvw&usqp=CAc",
      description: "Amoladora angular de 4.5 pulgadas con velocidad variable",
    },
  ];

  return (
    <div className="p-4">
      <div className={style.cartContainer}>
        <div className={style.cartList}>
          <h2 className={style.cartTitle}>Te Puede Interesar</h2>
          {tools.map((tool) => (
            <div className={style.cardCart} key={tool.name}>
              <Card
                imageUrl={tool.imageUrl}
                name={tool.name}
                price={`${
                  tool.price.venta > 0 ? tool.price.venta : tool.price.alquiler
                }`}
                saleType={`${tool.price.alquiler > 0 ? "Arriendo" : "Venta"}`}
              >
                {tool.price.alquiler > 0 && (
                  <div className="mt-2">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                    />
                  </div>
                )}
              </Card>
              <button
                className={style.addToCart}
                onClick={() => handleAddToCart(tool)}
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
        <div className={style.cartList2}>
          <h2 className={style.cartTitle2}>
            TOTAL: <span className={style.cartTotal}>${total}</span>
          </h2>
          {cartItems.map((item) => (
            <div className={style.cardCart2} key={item.id}>
              <Card
                imageUrl={item.imageUrl}
                name={item.name}
                price={`${item.price}`}
              />
              <button
                className={style.deleteCardCart}
                onClick={() => handleRemoveFromCart(item.id, item.price)}
              >
                Close
              </button>
            </div>
          ))}
          <div className={style.buying}>
            <Link href="/home" className={style.buying1}>
              Volver a Productos
            </Link>
            <button className={style.buying2} onClick={handleBuyClick}>
              Comprar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
