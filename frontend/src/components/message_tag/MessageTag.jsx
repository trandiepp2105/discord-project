import React from "react";
import styles from "./MessageTag.module.css";
import SimpleAvatar from "../simple_avatar/SimpleAvatar";
import ChatFeaturePopup from "../popups/chat_feature_popup/ChatFeaturePopup";
const MessageTag = ({
  type = "TEXT",
  simpleOption = false,
  textSrc,
  timePosted,
  displayName,
}) => {
  const messageType = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
  };
  function parseDateTime(dateTimeString) {
    const dateObj = new Date(dateTimeString);

    const date = `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
    const time = `${dateObj.getHours()} : ${dateObj.getMinutes()}`;

    return { date, time };
  }

  const time = parseDateTime(timePosted);
  return (
    <>
      {simpleOption === false && <span className={styles.addSpace}></span>}

      <li className={styles.wrapper}>
        <div className={styles.wrapperChatFeaturePopup}>
          <ChatFeaturePopup />
        </div>
        <div className={styles.messageTag}>
          <div className={styles.rightColumn}>
            {simpleOption === false ? (
              <SimpleAvatar />
            ) : (
              <span className={styles.simpleTimePosted}>{time.time}</span>
            )}
          </div>
          <div className={styles.messageContent}>
            {simpleOption === false && (
              <div className={styles.messageHeader}>
                <span className={styles.userName}>{displayName}</span>
                <span className={styles.timePosted}>
                  {`${time.date} ${time.time}`}
                </span>
              </div>
            )}
            <div className={styles.textMessage}>{textSrc}</div>
            {/* <div className={styles.assetMessageContainer}>
            <img src="" alt="" className={styles.assetMessage} />
          </div> */}
          </div>
        </div>
      </li>
    </>
  );
};

export default MessageTag;
