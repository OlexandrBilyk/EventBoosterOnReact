import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <a href="/" className={styles.logo}>
          <img src="/icons/logo.svg" alt="logo" className={styles.logoIcon} />
        </a>
        <h1 className={styles.title}>FIND BEST EVENTS AROUND THE WORLD</h1>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Start searching"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Enter country"
            className={styles.input}
          />
        </div>
      </div>
    </header>
  );
}
