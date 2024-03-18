import { React, useEffect, useState, useRef } from "react";
import styles from "./ChannelTextArea.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";

function AutoResizeTextarea({ handleInputChange, handleKeyDown, inputValue }) {
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    const resizeTextarea = () => {
      textarea.style.height = "auto";
      const newHeight = `${textarea.scrollHeight}px`;

      if (parseInt(newHeight) > 150) {
        textarea.style.height = `150px`;
        textarea.style.overflow = "auto";
      } else {
        textarea.style.height = newHeight;
        textarea.style.overflow = "hidden";
      }
    };

    const handleInput = () => {
      resizeTextarea();
      setRows(textarea.rows);
    };

    textarea.addEventListener("input", handleInput);
    return () => {
      textarea.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <textarea
      placeholder="Type a message..."
      className={styles.textArea}
      ref={textareaRef}
      rows={rows}
      style={{ resize: "none", overflow: "hidden" }}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      value={inputValue}
    />
  );
}

const ChannelTextArea = ({ handleInputChange, handleKeyDown, inputValue }) => {
  return (
    <div className={styles.channelTextArea}>
      <div className={styles.scrollableContainer}>
        <div className={styles.inner}>
          <button type="button" className={styles.attachButton}>
            <AiFillPlusCircle className={styles.attachIcon} />
          </button>
          <AutoResizeTextarea
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            inputValue={inputValue}
          />
          <div className={styles.buttons}>
            <button className={styles.wrapperButton}>
              <img src="/images/gif.svg" alt="" className={styles.iconButton} />
            </button>
            <button className={styles.wrapperButton}>
              <img
                src="/images/sticker.svg"
                alt=""
                className={styles.iconButton}
              />
            </button>
            <button className={styles.wrapperButton}>
              <MdEmojiEmotions className={styles.iconButton} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelTextArea;
