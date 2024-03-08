import React from "react";
import styles from "./MessageTag.module.css";
import SimpleAvatar from "../simple_avatar/SimpleAvatar";
import ChatFeaturePopup from "../popups/chat_feature_popup/ChatFeaturePopup";
const MessageTag = ({
  type = "TEXT",
  simpleOption = false,
  textSrc,
  timePosted,
}) => {
  const messageType = {
    TEXT: "TEXT",
    IMAGE: "IMAGE",
  };

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
              <span className={styles.simpleTimePosted}>24 : 20</span>
            )}
          </div>
          <div className={styles.messageContent}>
            {simpleOption === false && (
              <div className={styles.messageHeader}>
                <span className={styles.userName}>hokhanhduy_</span>
                <span className={styles.timePosted}> 18/02/2024 16:15</span>
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
