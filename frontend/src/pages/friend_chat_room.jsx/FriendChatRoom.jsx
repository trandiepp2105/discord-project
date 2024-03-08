import React from "react";
import styles from "./FriendChatRoom.module.css";
import NavBar from "../../components/nav_bar/NavBar";
import DirectChatNavBar from "../../components/direct_chat_nav_bar/DirectChatNavBar";
import ChannelTextArea from "../../components/channel_text_area/ChannelTextArea";
import Avatar from "../../components/avatar/Avatar";
import MessageTag from "../../components/message_tag/MessageTag";
import TextPopup from "../../components/popups/text_popup/TextPopup";
import ChatFeaturePopup from "../../components/popups/chat_feature_popup/ChatFeaturePopup";
const FriendChatRoom = ({}) => {
  return (
    <div className={styles.wrapper}>
      <DirectChatNavBar name={"ChamAnh"} type={"FRIENDROOM"} />
      <div className={styles.mainContent}>
        <div className={styles.messageWrapper}>
          <div className={styles.scroller}>
            <div className={styles.scrollerContent}>
              <ol className={styles.scrollerInner}>
                <div className={styles.generalInfor}>
                  <div className={styles.wrapperAvatar}>
                    <img
                      src={"/images/logo.png"}
                      alt="avatar"
                      className={styles.avatarImg}
                    />
                  </div>
                  <h3 className={styles.heading}>hokhanhduy_</h3>
                  <div className={styles.description}>
                    <h3 className={styles.mediumHeading}>hokhanhduy_</h3>
                    <p className={styles.descriptionText}>
                      Đây là phần mở đầu trong lịch sử các tin nhắn trực tiếp
                      của bạn với <strong>hokhanhduy_</strong>.
                    </p>
                    <div className={styles.featureTab}>
                      <button type="button" className={styles.textBtn}>
                        1 máy chủ chung
                      </button>
                      <span className={styles.divider}></span>
                      <button type="button" className={styles.featureBtn}>
                        Xóa bạn
                      </button>
                      <button type="button" className={styles.featureBtn}>
                        Chặn
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.dateDivider}>
                  <span className={styles.dateDividerContent}>
                    18 tháng 2 năm 2024
                  </span>
                </div>
              </ol>
            </div>
          </div>
        </div>
        <form className={styles.sendMessageForm}>
          <ChannelTextArea />
        </form>
      </div>
    </div>
  );
};

export default FriendChatRoom;
