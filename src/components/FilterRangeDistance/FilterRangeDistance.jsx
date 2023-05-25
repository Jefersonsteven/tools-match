import { useContext, useState } from "react";
import styles from "./FilterRangeDistance.module.css";
import { AppContext } from "@/context/AppContext";
import axios from "axios";

function FilterRangeDistance({ handleKm }) {
  const { userData } = useContext(AppContext);
  const [range, setRange] = useState(4000);

  async function exitInput() {
    if (userData) {
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
