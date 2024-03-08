import React from "react";
import styles from "./Avatar.module.css";
import classNames from "classnames";
const Avatar = ({
  src = "/images/logo.png",
  size = 32,
  online = false,
  bgColor = "#6265f6",
  onClick,
  className,
  enableStatus = true,
}) => {
  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{ color: bgColor, width: size + "px", height: size + "px" }}
      onClick={onClick}
    >
      <img src={src} alt="avatar" className={styles.avatarImg} />
      {enableStatus && (
        <div className={styles.wrapperStatusMark}>
          {online === true ? (
            <span className={styles.onlineStatusMark}></span>
          ) : (
            <span className={styles.statusMark}></span>
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
