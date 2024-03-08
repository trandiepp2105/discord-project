import React from "react";
import styles from "./TextPopup.module.css";
import classNames from "classnames";
const TextPopup = ({ text, position = 6, rotate = false }) => {
  return (
    <div className={styles.wrapperTextPopup}>
      {text}
      {rotate === true ? (
        <span
          className={styles.bottomTriangle}
          style={{ left: `calc(50% - ${position + "px"})` }}
        ></span>
      ) : (
        <span
          className={styles.topTriangle}
          style={{ left: `calc(50% - ${position + "px"})` }}
        ></span>
      )}
    </div>
  );
};

export default TextPopup;
