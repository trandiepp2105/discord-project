import React from "react";
import styles from "./SimpleAvatar.module.css";
const SimpleAvatar = ({ src, size = 40 }) => {
  return (
    <div
      className={styles.wrapperAvatar}
      style={{ width: size + "px", height: size + "px" }}
    >
      <img src={"/images/logo.png"} alt="avatar" className={styles.avatarImg} />
    </div>
  );
};

export default SimpleAvatar;
