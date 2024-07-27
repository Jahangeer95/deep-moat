import React from "react";
import { GridContainer } from "./components";
import styles from "./styles.module.css";

export function HomeContent() {
  return (
    <main className={styles.mainContainer}>
      <button type="button">Generate</button>
      <GridContainer />
    </main>
  );
}
