"use client";
import { useEffect } from "react";
import { getLocation } from "./getLocation";
import axios from "axios";

const MyPage = () => {
  
  useEffect(() => {
    getLocation()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitud:", latitude);
        console.log("Longitud:", longitude);
        axios.post("/api/maps", { latitude, longitude }).then((response) => {
          console.log(response.data);
        });
        // la respuesta de post me entrega una url
        // /api/user/${userData.email} peticion put {map: respuesta del post}
      })
      .catch((error) => {
        console.error("Error al obtener la ubicación:", error.message);
      });
  }, []);

  return (
    <div>
      <h1>Prueba de mapa</h1>
    </div>
  );
};

export default MyPage;
