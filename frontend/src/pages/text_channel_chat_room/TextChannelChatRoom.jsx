import React from "react";
import { Link } from "react-router-dom";
import styles from "./TextChannelChatRoom.module.css";
import DirectChatNavBar from "../../components/direct_chat_nav_bar/DirectChatNavBar";
import ChannelTextArea from "../../components/channel_text_area/ChannelTextArea";
import FeatureCard from "../../components/feature_card/FeatureCard";
import MessageTag from "../../components/message_tag/MessageTag";
const TextChannelChatRoom = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperNavBar}>
        <DirectChatNavBar name={"test-channel"} type="TEXTCHANNEL" />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.messageWrapper}>
          <div className={styles.scroller}>
            <div className={styles.scrollerContent}>
              <ol className={styles.scrollerInner}>
                <div className={styles.generalInfor}>
                  <div className={styles.generalInforInner}>
                    <h2 className={styles.heading}>
                      <p>Chào mừng đến với</p>
                      <p> test server</p>
                    </h2>
                    <div className={styles.description}>
                      Đây là máy chủ mới toanh của bạn. Sau đây là một vài bước
                      để giúp bạn làm quen! Để tìm hiểu thêm, vui lòng tìm đọc{" "}
                      <Link to={""} className={styles.textLink}>
                        Hướng Dẫn Bắt Đầu
                      </Link>
                    </div>
                    <div className={styles.cardWrapper}>
                      <FeatureCard text={"Mời bạn bè của bạn"} />
                    </div>
                    <div className={styles.cardWrapper}>
                      <FeatureCard text={"Mời bạn bè của bạn"} />
                    </div>
                    <div className={styles.cardWrapper}>
                      <FeatureCard text={"Mời bạn bè của bạn"} />
                    </div>
                    <div className={styles.cardWrapper}>
                      <FeatureCard text={"Mời bạn bè của bạn"} />
                    </div>
                  </div>
                </div>
                <MessageTag textSrc={"First  message ever in this channel."} />
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

export default TextChannelChatRoom;
