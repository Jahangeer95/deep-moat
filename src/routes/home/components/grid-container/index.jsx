import React, { useEffect, useState } from "react";
import { gridInitialState, lettersObj } from "../../constants";
import styles from "../../styles.module.css";

export function GridContainer({ randomLetters }) {
  const [grid, setGrid] = useState(gridInitialState);

  useEffect(() => {
    const letter1 = lettersObj[randomLetters[0]];
    const letter2 = lettersObj[randomLetters[1]];
    setGrid(fillGridWithPattern(letter1, letter2));
  }, [randomLetters]);

  function fillGridWithPattern(pattern1, pattern2) {
    const patternRows = pattern1?.length || 0;
    const patternCols = pattern1[0]?.length || 0;

    let firstLetterRowStart = 2;
    let firstLetterColStart = 3;
    let secondLetterRowStart = 13;
    let sedondLetterColStart = 15;

    return gridInitialState?.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        if (
          rowIdx >= firstLetterRowStart &&
          rowIdx < firstLetterRowStart + patternRows &&
          colIdx >= firstLetterColStart &&
          colIdx < firstLetterColStart + patternCols
        ) {
          return pattern1[rowIdx - firstLetterRowStart]?.[
            colIdx - firstLetterColStart
          ] === 1
            ? true
            : false;
        }
        if (
          rowIdx >= secondLetterRowStart &&
          rowIdx < secondLetterRowStart + patternRows &&
          colIdx >= sedondLetterColStart &&
          colIdx < sedondLetterColStart + patternCols
        ) {
          return pattern2[rowIdx - secondLetterRowStart]?.[
            colIdx - sedondLetterColStart
          ] === 1
            ? true
            : false;
        }
        return cell;
      });
    });
  }

  const handleDrop = (e, row, col) => {
    const { row: startRow, col: startCol } = JSON.parse(
      e.dataTransfer.getData("text/plain")
    );
    setGrid((prevGrid) => {
      const deepCloneGrid = JSON.parse(JSON.stringify(prevGrid));
      const temp = prevGrid[row][col];
      deepCloneGrid[row][col] = prevGrid[startRow][startCol];
      deepCloneGrid[startRow][startCol] = temp;
      return deepCloneGrid;
    });
  };

  const handleDragStart = (e, row, col) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ row, col }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  function getGridItemClasses(colNo, rowNo, arrayLength, item) {
    let classes = [""];
    if (colNo === arrayLength - 1) {
      classes.push(styles.borderRight);
    }

    if (rowNo === arrayLength - 1) {
      classes.push(styles.borderBottom);
    }

    if (item) {
      classes.push(styles.fill);
    }

    return classes.join(" ");
  }

  return (
    <div className={styles.gridContainer}>
      {grid.map((state, rowIdx) => {
        return state.map((item, colIdx) => (
          <GridItem
            key={rowIdx + colIdx}
            state={item}
            classes={getGridItemClasses(colIdx, rowIdx, state.length, item)}
            onDragStart={(e) => handleDragStart(e, rowIdx, colIdx)}
            onDrop={(e) => handleDrop(e, rowIdx, colIdx)}
            onDragOver={handleDragOver}
          />
        ));
      })}
    </div>
  );
}

function GridItem({ classes, onDragStart, onDragOver, onDrop }) {
  return (
    <div
      className={`${styles.gridItem} ${classes}`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
}
