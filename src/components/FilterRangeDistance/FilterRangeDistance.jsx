import { useState } from "react";
import styles from "./FilterRangeDistance.module.css";

function FilterRangeDistance() {
  const [range, setRange] = useState(4000);
  function handleRange(e) {
    const value = e.target.value;
    setRange(value);
  }
  return (
    <div>
      <div className={styles.rangeContainer}>
        <span style={{ left: `${range / 50}%` }}>{range}Km</span>
        <input
          onChange={handleRange}
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
