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
