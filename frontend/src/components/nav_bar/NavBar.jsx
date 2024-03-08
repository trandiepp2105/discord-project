import { React, useState, useEffect, useContext } from "react";
import styles from "./NavBar.module.css";
import classNames from "classnames";
import { DashboardPageContext } from "../../pages/dashboard_page/DashboardPage";
const NavBar = ({ activeItem = "ONLINE" }) => {
  //   const tabBarItem = {
  //     ONLINE: "ONLINE",
  //     ALL: "All",
  //     WAITING: "WAITING",
  //     BLOCKED: "BLOCKED",
  //     ADDFRIEND: "ADDFRIEND",
  //   };
  // const [activeTab, setActiveTab] = useState(tabBarItem.ONLINE);
  const { currentTab, setCurrentTab, tabs } = useContext(DashboardPageContext);

  return (
    <div className={styles.navBar}>
      <div className={styles.children}>
        <div className={styles.iconWrapper}>
          <img
            src="/images/friend.svg"
            alt="mailbox"
            className={styles.toolIcon}
          />
        </div>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Bạn bè</h2>
        </div>
        <span className={styles.divider}></span>
        <div className={styles.tabBar}>
          <div
            className={classNames(
              styles.item,
              currentTab === tabs.FRIENDTABS.ONLINE ? styles.activeItem : null
            )}
            onClick={async () => {
              // window.localStorage.setItem("currentTab", tabBarItem.ONLINE);
              await setCurrentTab(tabs.FRIENDTABS.ONLINE);
              // console.log(activeTab);
            }}
          >
            Trực tuyến
          </div>
          <div
            className={classNames(
              styles.item,
              currentTab === tabs.FRIENDTABS.ALL ? styles.activeItem : null
            )}
            onClick={async () => {
              // window.localStorage.setItem("currentTab", tabBarItem.ALL);

              await setCurrentTab(tabs.FRIENDTABS.ALL);
              // console.log(activeTab);
            }}
          >
            Tất cả
          </div>
          <div
            className={classNames(
              styles.item,
              currentTab === tabs.FRIENDTABS.WAITING ? styles.activeItem : null
            )}
            onClick={async () => {
              // window.localStorage.setItem("currentTab", tabBarItem.WAITING);

              await setCurrentTab(tabs.FRIENDTABS.WAITING);
              // console.log(activeTab);
            }}
          >
            Đang chờ xử lý
          </div>
          <div
            className={classNames(
              styles.item,
              currentTab === tabs.FRIENDTABS.BLOCKED ? styles.activeItem : null
            )}
            onClick={async () => {
              // window.localStorage.setItem("currentTab", tabBarItem.BLOCKED);

              await setCurrentTab(tabs.FRIENDTABS.BLOCKED);
              // console.log(activeTab);
            }}
          >
            Đã Chặn
          </div>
          <button
            className={classNames(
              styles.item,
              currentTab === tabs.FRIENDTABS.ADDFRIEND
                ? styles.activeAddFriendButton
                : styles.addFriendButton
            )}
            onClick={async () => {
              // window.localStorage.setItem("currentTab", tabBarItem.ADDFRIEND);
              await setCurrentTab(tabs.FRIENDTABS.ADDFRIEND);
              // console.log(activeTab);
            }}
          >
            Thêm bạn
          </button>
        </div>
      </div>
      <div className={styles.toolBar}>
        <div className={styles.newDMTool}>
          <div className={styles.iconWrapper}>
            <img
              src="/images/new_dm_chat.svg"
              alt="newDMChat"
              className={styles.toolIcon}
            />
          </div>
          <span className={styles.divider}></span>
        </div>
        <div className={styles.iconWrapper}>
          <img
            src="/images/mail_box.svg"
            alt="mailbox"
            className={styles.toolIcon}
          />
        </div>
        <div className={styles.iconWrapper}>
          <img src="/images/help.svg" alt="help" className={styles.toolIcon} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
