import { React, useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./DashboardPage.module.css";
import ServerBar from "../../components/server_bar/ServerBar";
import SideBar from "../../components/side_bar/SideBar";

import FriendRoom from "../friend_room/FriendRoom";
import FriendChatRoom from "../friend_chat_room.jsx/FriendChatRoom";
import TextChannelChatRoom from "../text_channel_chat_room/TextChannelChatRoom";
export const DashboardPageContext = createContext();

const DashboardPage = () => {
  const tabs = {
    FRIENDTABS: {
      ONLINE: "ONLINE",
      ALL: "ALL",
      WAITING: "WAITING",
      BLOCKED: "BLOCKED",
      ADDFRIEND: "ADDFRIEND",
    },
  };

  const [currentTab, setCurrentTab] = useState(tabs.FRIENDTABS.ONLINE);

  const [listArgUrl, setListArgUrl] = useState([]);
  const location = useLocation();
  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    sleep(1000);
    const listArgUrl = location.pathname
      .split("/")
      .splice(1, location.pathname.length);
    setListArgUrl(listArgUrl);
    console.log(
      "location",
      location.pathname.split("/").splice(1, location.pathname.length)
    );
  }, [location]);

  const MainPlace = (listArgUrl) => {
    if (
      (listArgUrl.length === 2 &&
        listArgUrl.includes("channel") &&
        listArgUrl.includes("@me")) ||
      (listArgUrl.length === 3 &&
        listArgUrl.includes("channel") &&
        listArgUrl.includes("@me") &&
        !listArgUrl[2])
    ) {
      return <FriendRoom />;
    } else if (
      listArgUrl.length === 3 &&
      listArgUrl.includes("channel") &&
      listArgUrl.includes("@me")
    ) {
      return <FriendChatRoom />;
    } else if (
      listArgUrl.length === 3 &&
      listArgUrl.includes("channel") &&
      listArgUrl[1] != "@me"
    ) {
      return <TextChannelChatRoom />;
    } else {
      return null; // return -1 if the list doesn't match either condition
    }
  };
  return (
    <DashboardPageContext.Provider value={{ currentTab, setCurrentTab, tabs }}>
      <div className={styles.wapperPage}>
        <ServerBar />
        <div className={styles.base}>
          {listArgUrl[0] === "channel" && listArgUrl[1] === "@me" ? (
            <SideBar />
          ) : (
            <SideBar ownChannel={false} />
          )}

          <div className={styles.mainPlace}> {MainPlace(listArgUrl)}</div>
        </div>
      </div>
    </DashboardPageContext.Provider>
  );
};
export default DashboardPage;
