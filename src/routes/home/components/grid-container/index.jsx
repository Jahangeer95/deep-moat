import React, { useState } from "react";
import { gridInitialState } from "../../constants";
import styles from "../../styles.module.css";

export function GridContainer() {
  const [grid, setGrid] = useState(gridInitialState);

  return (
    <div className={styles.gridContainer}>
      {grid.map((state, rowIdx) => {
        return state.map((item, colIdx) => (
          <GridItem
            key={rowIdx + colIdx}
            state={item}
            isBorderRight={colIdx === state.length - 1}
            isBorderBottom={rowIdx === state.length - 1}
          />
        ));
      })}
    </div>
  );
}

function GridItem({ state, isBorderRight, isBorderBottom }) {
  return (
    <div
      className={`${styles.gridItem} ${
        isBorderRight ? styles.borderRight : ""
      } ${isBorderBottom ? styles.borderBottom : ""}`}
    />
  );
}
