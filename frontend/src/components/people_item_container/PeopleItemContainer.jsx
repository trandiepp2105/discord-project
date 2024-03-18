import React from "react";
import styles from "./PeopleItemContainer.module.css";
import Avatar from "../avatar/Avatar";
const PeopleItemContainer = ({
  userName,
  status,
  onClick,
  handleOpenChat,
  handleOnpenMenu,
  handleAcceptRequest,
  handleDeleteRequest,
  handleUnblock,
  actions,
}) => {
  const actionsChoice = {
    OPEN_CHAT: "OPEN_CHAT",
    MENU: "MENU",
    ACCEPT_REQUEST: "ACCEPT_REQUEST",
    DELETE_REQUEST: "DELETE_REQUEST",
    UNBLOCK: "UNBLOCK",
  };

  const IconButton = (action) => {
    var iconUrl = "";
    var handleClick;
    switch (action) {
      case actionsChoice.OPEN_CHAT:
        iconUrl = "/images/message.svg";
        handleClick = handleOpenChat;
        break;
      case actionsChoice.MENU:
        iconUrl = "/images/menu.svg";
        handleClick = handleOnpenMenu;
        break;
      case actionsChoice.ACCEPT_REQUEST:
        iconUrl = "/images/success.svg";
        handleClick = handleAcceptRequest;
        break;
      case actionsChoice.DELETE_REQUEST:
        iconUrl = "/images/cancel.svg";
        handleClick = handleDeleteRequest;
        break;
      case actionsChoice.UNBLOCK:
        iconUrl = "/images/unblock.svg";
        handleClick = handleUnblock;
        break;
    }
    return (
      <button
        type="button"
        className={styles.wrapperAction}
        onClick={handleClick}
      >
        <img src={iconUrl} className={styles.actionAvatar} alt="menu" />
      </button>
    );
  };
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
        {/* <button type="button" className={styles.wrapperAction}>
          <img
            src="/images/message.svg"
            className={styles.actionAvatar}
            alt="menu"
          />
        </button>
        <button type="button" className={styles.wrapperAction}>
          <img
            src="/images/menu.svg"
            className={styles.actionAvatar}
            alt="menu"
          />
        </button> */}
        {actions.map((action) => {
          return IconButton(action);
        })}
      </div>
    </div>
  );
};

export default PeopleItemContainer;
