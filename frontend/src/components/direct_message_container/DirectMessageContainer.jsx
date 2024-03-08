import React from "react";
import styles from "./DirectMessageContainer.module.css";
import classnames from "classnames";
import { FaXmark } from "react-icons/fa6";
const DirectMessageContainer = ({
  userName,
  online = false,
  active = false,
  onClick,
  handleCloseMark,
}) => {
  return (
    <div
      className={classnames(
        styles.wrapper,
        active === true ? styles.activeChannel : null
      )}
      onClick={onClick}
    >
      {/*
      <div className={styles.title}>{title}</div> */}
      <div className={styles.avatar}>
        <img src={"/images/logo.png"} alt="" className={styles.avatarImg} />
        <div className={styles.wrapperStatusMark}>
          {online === true ? (
            <span className={styles.onlineStatusMark}></span>
          ) : (
            <span className={styles.statusMark}></span>
          )}
        </div>
      </div>
      <div className={styles.userName}>{userName}</div>
      <FaXmark className={styles.closeMark} onClick={handleCloseMark} />
    </div>
  );
};

export default DirectMessageContainer;
