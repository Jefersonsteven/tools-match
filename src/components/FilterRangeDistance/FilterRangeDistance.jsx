import { useContext, useState } from "react";
import styles from "./FilterRangeDistance.module.css";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { getLocation } from "@/app/crear-publicacion/asset/getLocation";

function FilterRangeDistance({ handleKm }) {
  const { userData } = useContext(AppContext);
  const [range, setRange] = useState(6000);

  async function coords(lat, long) {
    try {
      const mapImage = await axios.post("/api/maps", { lat, long });
      const addMap = await axios.put(`/api/user/${userData.email}`, {
        map: mapImage.data,
      });
      const coordinates = await axios.put(`/api/user/${userData.email}`, {
        coordinates: [lat.toString(), long.toString()],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function exitInput() {
    if (userData) {
      const position = await getLocation();
      const { latitude, longitude } = position.coords;
      await coords(latitude, longitude);

      const user = await axios.get(`/api/user/${userData.email}`);
      const { coordinates } = user.data;
      if (coordinates[0] && coordinates[1]) {
        handleKm(range, coordinates[0], coordinates[1]);
      }
    }
  }

  function handleRange(e) {
    const value = e.target.value;
    setRange(value);
  }
  return (
    <div>
      <div className={styles.rangeContainer}>
        <span style={{ left: `${range / 50}%` }}>{range}Km</span>
        <input
          onInput={handleRange}
          onBlur={exitInput}
          type="range"
          min={1}
          max={4000}
          value={range}
        />
      </div>
    </div>
  );
}

export default FilterRangeDistance;
