import React from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

import Logo from "static/images/rocket.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.linkLogo}>
        <img src={Logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.headerTitle}>Aggile Engine Image Gallery</h1>
      </Link>
    </header>
  );
};

export default Header;
