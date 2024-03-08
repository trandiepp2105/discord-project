import React from "react";
import styles from "./FeatureCard.module.css";
const FeatureCard = ({ text }) => {
  return (
    <button type="button" className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <img src="/images/add_friend_img.png" alt="" className={styles.icon} />
      </div>
      <p className={styles.text}>{text}</p>
      <div className={styles.wrapperClickIcon}>
        <img src="/images/dropdown.svg" alt="" className={styles.clickIcon} />
      </div>
    </button>
  );
};

export default FeatureCard;
