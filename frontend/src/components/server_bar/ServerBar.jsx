import { React, useState } from "react";
import styles from "./ServerBar.module.css";
import classNames from "classnames";
import { GoPlus } from "react-icons/go";
import { FaCompass } from "react-icons/fa6";
import { LiaDownloadSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
const ServerBar = () => {
  const history = useNavigate();
  const activeMark = <div className={styles.activeMark}></div>;
  const testListServer = ["DM", "Test Server", "Chat Bot", "New Channel"];
  const [currentServer, setCurrentServer] = useState("DM");

  function getInitials(str) {
    // Split the string into words based on whitespace
    const words = str.split(/\s+/);

    // Initialize an empty string for the initials
    let initials = "";

    // Iterate over each word
    for (const word of words) {
      // Get the first character of the word, converting it to uppercase
      const initial = word.charAt(0);

      // Add the initial to the initials string
      initials += initial;
    }

    // Return the initials string
    return initials;
  }

  const handleOwnServerBtn = (event) => {
    event.preventDefault();
    history("/channel/@me");
    setCurrentServer("DM");
  };

  const handleServerBtn = (event, serverName) => {
    event.preventDefault();
    history("/channel/server_id/channel_id");
    setCurrentServer(serverName);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperListItem}>
        {currentServer === "DM" ? activeMark : null}
        <div
          className={classNames(
            styles.mainItem,
            styles.listItem,
            currentServer === "DM" ? styles.activeListItem : null
          )}
          // onClick={() => setCurrentServer("DM")}
          onClick={handleOwnServerBtn}
        >
          <img src="/images/logo.png" alt="" className={styles.itemImg} />
        </div>
      </div>
      <div className={styles.separator}> </div>
      <div className={styles.wrapperListItem}>
        {currentServer === testListServer[1] ? activeMark : null}
        <div
          className={classNames(
            styles.mainItem,
            styles.listItem,
            currentServer === testListServer[1] ? styles.activeListItem : null
          )}
          // onClick={() => setCurrentServer(testListServer[1])}
          onClick={(event) => handleServerBtn(event, testListServer[1])}
        >
          {getInitials(testListServer[1])}
        </div>
      </div>
      <div className={styles.wrapperListItem}>
        {currentServer === testListServer[2] ? activeMark : null}
        <div
          className={classNames(
            styles.mainItem,
            styles.listItem,
            currentServer === testListServer[2] ? styles.activeListItem : null
          )}
          // onClick={() => setCurrentServer(testListServer[2])}

          onClick={(event) => handleServerBtn(event, testListServer[2])}
        >
          {getInitials(testListServer[2])}
        </div>
      </div>

      <div className={styles.wrapperListItem}>
        <div
          className={classNames(
            styles.mainItem,
            styles.listItem,
            styles.specialListItem
            // currentServer === "DM" ? styles.activeListItem : null
          )}
        >
          <GoPlus className={styles.cusIcon} />
        </div>
      </div>

      <div className={styles.wrapperListItem}>
        <div
          className={classNames(
            styles.mainItem,
            styles.listItem,
            styles.specialListItem
            // currentServer === "DM" ? styles.activeListItem : null
          )}
        >
          <FaCompass
            className={classNames(styles.cusIcon, styles.compassIcon)}
          />
        </div>
      </div>
      <div className={styles.separator}> </div>

      <div className={styles.wrapperListItem}>
        <div
          className={classNames(
            styles.mainItem,
            styles.listItem,
            styles.specialListItem
            // currentServer === "DM" ? styles.activeListItem : null
          )}
        >
          <LiaDownloadSolid className={styles.cusIcon} />
        </div>
      </div>
    </div>
  );
};

export default ServerBar;
