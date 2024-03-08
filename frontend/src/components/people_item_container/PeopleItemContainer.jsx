import React from "react";
import styles from "./PeopleItemContainer.module.css";
import Avatar from "../avatar/Avatar";
const PeopleItemContainer = ({ userName, status, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.userInfor}>
        <div className={styles.wrapperAvatar}>
          <Avatar />
        </div>
        <div className={styles.text}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.status}>{status}</div>
        </div>
      </div>
      <div className={styles.actionsContainer}>
        <div className={styles.wrapperAction}>
          <Avatar
            enableStatus={false}
            src="/images/message.svg"
            className={styles.actionAvatar}
          />
        </div>
        <div className={styles.wrapperAction}>
          <Avatar
            enableStatus={false}
            src="/images/menu.svg"
            className={styles.actionAvatar}
          />
        </div>
      </div>
    </div>
  );
};

export default PeopleItemContainer;
