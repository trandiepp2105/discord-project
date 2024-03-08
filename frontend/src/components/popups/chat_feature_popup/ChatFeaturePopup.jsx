import React from "react";
import styles from "./ChatFeaturePopup.module.css";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FiCornerUpLeft } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import TextPopup from "../text_popup/TextPopup";
const ChatFeaturePopup = ({ handleEmoji, handleReply, handleMenu }) => {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.wrapperIcon}
        onClick={handleEmoji}
      >
        <BsEmojiSmileFill className={styles.icon} />
        <div className={styles.wrapperTextPopup}>
          <TextPopup text={"Thêm Biểu Cảm"} rotate={true} />
        </div>
      </button>
      <button
        type="button"
        className={styles.wrapperIcon}
        onClick={handleReply}
      >
        <FiCornerUpLeft className={styles.icon} />
        <div className={styles.wrapperTextPopup}>
          <TextPopup text={"Trả lời"} rotate={true} />
        </div>
      </button>
      <button type="button" className={styles.wrapperIcon} onClick={handleMenu}>
        <BsThreeDots className={styles.icon} />
        <div className={styles.wrapperLastTextPopup}>
          <TextPopup text={"Những mục khác"} rotate={true} position={-20} />
        </div>
      </button>
    </div>
  );
};

export default ChatFeaturePopup;
