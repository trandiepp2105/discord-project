import React from "react";
import styles from "./MiniChannelContainer.module.css";
import TextPopup from "../popups/text_popup/TextPopup";
const MiniChannelContainer = ({
  name,
  extraFeatures = false,
  type = "TEXTCHANNEL",
}) => {
  const types = {
    TEXTCHANNEL: "TEXTCHANNEL",
    EVENT: "EVENT",
    VOICECHANNEL: "VOICECHANNEL",
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.wrapperIcon}>
            {type === types.EVENT && (
              <img src="/images/event.svg" alt="" className={styles.icon} />
            )}
            {type === types.TEXTCHANNEL && (
              <img src="/images/hashtag.svg" alt="" className={styles.icon} />
            )}
            {type === types.VOICECHANNEL && (
              <img
                src="/images/loudspeaker.svg"
                alt=""
                className={styles.icon}
              />
            )}
          </div>
          <div className={styles.name}>{name}</div>
        </div>
        {extraFeatures && (
          <div className={styles.featColumn}>
            {/* Open chat of voice channel */}
            {type === types.VOICECHANNEL && (
              <div className={styles.wrapperFeatIcon}>
                <img
                  src="/images/bubble_chat.svg"
                  alt=""
                  className={styles.featIcon}
                />
                <div className={styles.wrapperTextPopup}>
                  <TextPopup text={"Mở trò chuyện"} rotate={true} />
                </div>
              </div>
            )}
            <div className={styles.wrapperFeatIcon}>
              <img
                src="/images/add_friend.svg"
                alt=""
                className={styles.featIcon}
              />
              <div className={styles.wrapperTextPopup}>
                <TextPopup text={"Tạo lời mời"} rotate={true} />
              </div>
            </div>
            <div className={styles.wrapperFeatIcon}>
              <img
                src="/images/setting.svg"
                alt=""
                className={styles.featIcon}
              />
              <div className={styles.wrapperTextPopup}>
                <TextPopup text={"Chỉnh sửa kênh"} rotate={true} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniChannelContainer;
