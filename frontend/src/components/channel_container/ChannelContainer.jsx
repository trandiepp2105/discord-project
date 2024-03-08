import React from "react";
import styles from "./ChannelContainer.module.css";
import classnames from "classnames";
const ChannelContainer = ({ src, title, onClick, active = false }) => {
  return (
    <div
      className={classnames(
        styles.wrapper,
        active === true ? styles.activeChannel : null
      )}
      onClick={onClick}
    >
      <div className={styles.avatar}>
        <img src={src} alt="" className={styles.avatarImg} />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default ChannelContainer;
