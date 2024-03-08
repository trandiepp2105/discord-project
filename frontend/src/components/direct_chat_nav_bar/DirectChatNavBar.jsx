import React from "react";
import classNames from "classnames";
import styles from "./DirectChatNavBar.module.css";
import navBarStyles from "../nav_bar/NavBar.module.css";
import Avatar from "../avatar/Avatar";
import { CiSearch } from "react-icons/ci";
import TextPopup from "../popups/text_popup/TextPopup";
const DirectChatNavBar = ({ name, type = "TEXTCHANNEL" }) => {
  const types = {
    TEXTCHANNEL: "TEXTCHANNEL",
    VOICECHANNEL: "VOICECHANNEL",
    FRIENDROOM: "FRIENDROOM",
  };

  const ListFeatureIcon = (type) => {
    if (type == types.FRIENDROOM) {
      return ["call", "video_call", "pushpin", "add_friend", "user_profile"];
    } else if (type === types.TEXTCHANNEL) {
      return ["topic", "notification", "pushpin", "members"];
    }
  };

  const TextPopupName = (iconSrc) => {
    if (iconSrc === "call") {
      return "Bắt Đầu Cuộc Gọi Thoại";
    } else if (iconSrc === "video_call") {
      return "Bắt Đầu Cuộc Gọi Video";
    } else if (iconSrc === "pushpin") {
      return "Tin Nhắn Đã Được Ghim";
    } else if (iconSrc === "add_friend") {
      return "Thêm Bạn Bè Vào DM";
    } else if (iconSrc === "user_profile") {
      return "Hiện Hồ Sơ Người Dùng";
    } else if (iconSrc === "notification") {
      return "Cài Đặt Thông Báo";
    } else if (iconSrc === "members") {
      return "Hiện Danh Sách Thành Viên";
    } else if (iconSrc === "topic") {
      return "Chủ Đề";
    }
  };
  return (
    <div className={classNames(navBarStyles.navBar, styles.wrapper)}>
      <div className={styles.userInfor}>
        <div className={styles.wrapperAvatar}>
          {type == types.FRIENDROOM && <Avatar size={24} />}
          {type == types.TEXTCHANNEL && (
            <img
              src="/images/hashtag.svg"
              alt=""
              className={styles.textChannelAvatar}
            />
          )}
        </div>
        <h3 className={styles.displayName}>
          {name}
          {type === types.FRIENDROOM && (
            <div className={styles.wrapperDisplayNamePopup}>
              <TextPopup text={"chamanh_0506"} />
            </div>
          )}
        </h3>
      </div>

      <div className={styles.toolBar}>
        {ListFeatureIcon((type = type)).map((icon, index) => {
          return (
            <div className={styles.wrapperIcon}>
              <img src={`/images/${icon}.svg`} alt="" className={styles.icon} />
              <div className={styles.wrapperTextPopup}>
                {/* <TextPopup text={"Bắt Đầu Cuộc Gọi Thoại"} /> */}
                <TextPopup text={TextPopupName(icon)} />
              </div>
            </div>
          );
        })}
        {/* mini search bar */}
        <div className={styles.searchBar}>
          <div className={styles.inner}>
            <div className={styles.inputEditer}>Tìm kiếm</div>
            <div className={styles.wrapperSearchIcon}>
              <CiSearch className={styles.searchIcon} />
            </div>
          </div>
        </div>
        <div className={styles.wrapperIcon}>
          <img src="/images/mail_box.svg" alt="" className={styles.icon} />
          <div className={styles.wrapperTextPopup}>
            <TextPopup text={"Hộp Thư Đến"} />
          </div>
        </div>
        <div className={styles.wrapperIcon}>
          <img src="/images/help.svg" alt="" className={styles.icon} />
          <div className={styles.wrapperHelpPopup}>
            <TextPopup text={"Trợ Giúp"} position={-15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectChatNavBar;
