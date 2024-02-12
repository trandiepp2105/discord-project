import React from "react";
import styles from "./HomePage.module.css";
import Header from "../../components/header/Header";
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={styles.overlay}>
        <img src="images/signup-bg.png" alt="" className={styles.bgImg} />
      </div>
    </div>
  );
};

export default HomePage;
