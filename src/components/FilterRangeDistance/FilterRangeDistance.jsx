import { useContext, useState, useEffect } from "react";
import styles from "./FilterRangeDistance.module.css";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { getLocation } from "@/app/crear-publicacion/asset/getLocation";

function FilterRangeDistance({ handleKm }) {
  const { userData, range, setRange } = useContext(AppContext);
  const [coorders, setCoorders] = useState({
    coorde1: "",
    coorde2: "",
  });

  async function coords(latitude, longitude) {
    try {
      const mapImage = await axios.post("/api/maps", { latitude, longitude });
      const addMap = await axios.put(`/api/user/${userData.email}`, {
        map: mapImage.data,
      });
      const coordinates = await axios.put(`/api/user/${userData.email}`, {
        coordinates: [latitude.toString(), longitude.toString()],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    async function obtenerCoordenadas() {
      if (userData) {
        const position = await getLocation();
        const { latitude, longitude } = position.coords;
        if (
          latitude !== userData.coordinates[0] &&
          longitude !== userData.coordinates[1]
        ) {
          await coords(latitude, longitude);
        }
        const user = await axios.get(`/api/user/${userData.email}`);
        const { coordinates } = user.data;
        if (coordinates[0] && coordinates[1]) {
          setCoorders({
            coorde1: coordinates[0],
            coorde2: coordinates[1],
          });
        }
      }
    }

    obtenerCoordenadas();
  }, [userData]);

  function exitInput() {
    handleKm(range, coorders.coorde1, coorders.coorde2);
  }

  function handleRange(e) {
    const value = e.target.value;
    setRange(value);
  }

  return (
    <div>
      <div className={styles.rangeContainer}>
        <span style={{ left: `${range / 70}%` }}>{range}Km</span>
        <input
          onInput={handleRange}
          onMouseUp={exitInput}
          type="range"
          min={0}
          max={6000}
          value={range}
        />
      </div>
    </div>
  );
}

export default FilterRangeDistance;
