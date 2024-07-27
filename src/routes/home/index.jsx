import React, { useState } from "react";
import { GridContainer } from "./components";
import styles from "./styles.module.css";
import { lettersObj } from "./constants";

export function HomeContent() {
  const [randomChars, setRandomChars] = useState(["A", "C"]);

  const getRandomChars = () => {
    const lettersArr = Object.keys(lettersObj);

    function getRandomIndex() {
      return Math.floor(Math.random() * lettersArr.length);
    }

    const char1 = lettersArr[getRandomIndex()];
    const char2 = lettersArr[getRandomIndex()];

    setRandomChars([char1, char2]);
  };

  return (
    <main className={styles.mainContainer}>
      <button type="button" onClick={getRandomChars}>
        Generate
      </button>
      <GridContainer randomLetters={randomChars} />
    </main>
  );
}
