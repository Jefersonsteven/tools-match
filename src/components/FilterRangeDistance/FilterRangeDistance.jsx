import { useContext, useState } from "react";
import styles from "./FilterRangeDistance.module.css";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { getLocation } from "@/app/crear-publicacion/asset/getLocation";

function FilterRangeDistance({ handleKm }) {
  const { userData } = useContext(AppContext);
  const [range, setRange] = useState(6000);

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

  async function exitInput() {
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
        <span style={{ left: `${range / 70}%` }}>{range}Km</span>
        <input
          onInput={handleRange}
          onBlur={exitInput}
          type="range"
          min={1}
          max={6000}
          value={range}
        />
      </div>
    </div>
  );
}

export default FilterRangeDistance;
