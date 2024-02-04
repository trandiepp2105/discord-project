import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapperLogo}>LOGO</div>

      <div className={styles.navBar}>
        <Link to="/" className={styles.navLink}>
          Download
        </Link>
        <Link to="/" className={styles.navLink}>
          Nitro
        </Link>
        <Link to="/" className={styles.navLink}>
          Discover
        </Link>
        <Link to="/" className={styles.navLink}>
          Safety
        </Link>
        <Link to="/" className={styles.navLink}>
          Support
        </Link>
        <Link to="/" className={styles.navLink}>
          Blog
        </Link>
        <Link to="/" className={styles.navLink}>
          Careers
        </Link>
      </div>

      <Link to="/login">
        <button className={styles.loginBtn} type="button">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Header;
