import { React, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./SideBar.module.css";
import { BsFillMicMuteFill } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import ChannelContainer from "../channel_container/ChannelContainer";
import DirectMessageContainer from "../direct_message_container/DirectMessageContainer";
import Avatar from "../avatar/Avatar";
import Panel from "../panel/Panel";
import MiniChannelContainer from "../mini_channel_container.jsx/MiniChannelContainer";
import TextPopup from "../popups/text_popup/TextPopup";
import Cookies from "js-cookie";
import axios from "axios";
const SideBar = ({ serverName, ownChannel = true }) => {
  const [chatRoom, setChatRoom] = useState(null);
  const [listFriends, setListFriends] = useState([]);
  const listChannel = ["Bạn bè", "Nitro", "Cửa hàng"];
  const [currentChannel, setcurrentChannel] = useState(listChannel[0]);
  const [currentListItemIndex, setCurrentListItemIndex] = useState(1);
  const history = useNavigate();
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

    if (
      (listArgUrl.length === 2 &&
        listArgUrl.includes("channel") &&
        listArgUrl.includes("@me")) ||
      (listArgUrl.length === 3 &&
        listArgUrl.includes("channel") &&
        listArgUrl.includes("@me") &&
        !listArgUrl[2])
    ) {
      if (listArgUrl.length === 3 && currentListItemIndex > 3) {
        const newListArgUrl = listArgUrl.slice(0, -1);
        newListArgUrl.push(currentListItemIndex);
        console.log("newListArgUrl: ", newListArgUrl);
        history("/" + newListArgUrl.join("/"));
      } else if (listArgUrl.length === 2 && currentListItemIndex > 3) {
        const newListArgUrl = listArgUrl;
        newListArgUrl.push(currentListItemIndex);
        console.log("newListArgUrl: ", newListArgUrl);
        history("/" + newListArgUrl.join("/"));
      }
    }
  }, [location]);

  const getListFriend = (tab) => {
    const endpoint = "http://127.0.0.1:8000/friendships/all/";
    const accessToken = Cookies.get("access_token");
    axios
      .get(endpoint, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("data: ", response.data);
        setListFriends(response.data);
      })
      .catch((error) => {
        console.error("Send add friend request error: ", error);
      });
  };

  useEffect(() => {
    getListFriend();
  }, []);

  const GetFriendChatRoom = (friend_id) => {
    // get the chat room id from the server and then redirect to that chatroom page
    const endpoint = `http://localhost:8000/friend-chat-room/?friend_id=${friend_id}/`;
    const accessToken = Cookies.get("access_token");
    axios
      .get(endpoint, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setChatRoom(res.data[0]);
        console.log("room: ", res.data[0]);
      })
      .catch((error) => {
        console.log("room err: ", error);
      });
  };

  const handleClick = (friend_id, index) => {
    GetFriendChatRoom(friend_id);
    setCurrentListItemIndex(index + 5);
  };

  useEffect(() => {
    if (chatRoom) {
      history(`/channel/@me/${chatRoom.id}`);
    }
  }, [chatRoom]);
  return (
    <div className={styles.sideBar}>
      {ownChannel === false && (
        <div className={styles.serverSideBarContent}>
          <div className={styles.serverSideBarHeader}>
            <div className={styles.serverName}>{"Server Name"}</div>
            <div className={styles.dropdownMenu}>
              <button className={styles.dropButton}>
                <RiArrowDropDownLine className={styles.dropIcon} />
              </button>
            </div>
          </div>
          <div className={styles.scoller}>
            <ul className={styles.scollerContent}>
              <div className={styles.channelContainer}>
                <MiniChannelContainer type="EVENT" name={"Sự kiện"} />
              </div>
              <span className={styles.divider}></span>
              {/*  Create new text channel manager*/}
              <div className={styles.channelsManagerContainer}>
                <div className={styles.leftColumn}>
                  <div className={styles.wrapperIcon}>
                    <img
                      src="/images/dropdown.svg"
                      alt=""
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.channelType}>KÊNH CHAT</div>
                </div>
                <button className={styles.addButton}>
                  <img
                    src="/images/add_button.svg"
                    alt=""
                    className={styles.addIcon}
                  />
                  <div className={styles.wrapperTextPopup}>
                    <TextPopup text={"Tạo kênh"} rotate={true} />
                  </div>
                </button>
              </div>
              <div className={styles.channelContainer}>
                <MiniChannelContainer
                  type="TEXTCHANNEL"
                  name={"chung"}
                  extraFeatures={true}
                />
              </div>
              <div className={styles.channelContainer}>
                <MiniChannelContainer
                  type="TEXTCHANNEL"
                  name={"new-channel-1"}
                  extraFeatures={true}
                />
              </div>
              <div className={styles.channelContainer}>
                <MiniChannelContainer
                  type="TEXTCHANNEL"
                  name={"new-channel-2"}
                  extraFeatures={true}
                />
              </div>
              {/*  Create new voice channel manager*/}
              <div className={styles.channelsManagerContainer}>
                <div className={styles.leftColumn}>
                  <div className={styles.wrapperIcon}>
                    <img
                      src="/images/dropdown.svg"
                      alt=""
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.channelType}>KÊNH ĐÀM THOẠI</div>
                </div>
                <button className={styles.addButton}>
                  <img
                    src="/images/add_button.svg"
                    alt=""
                    className={styles.addIcon}
                  />
                  <div className={styles.wrapperTextPopup}>
                    <TextPopup text={"Tạo kênh"} rotate={true} />
                  </div>
                </button>
              </div>
              <div className={styles.channelContainer}>
                <MiniChannelContainer
                  type="VOICECHANNEL"
                  name={"chung"}
                  extraFeatures={true}
                />
              </div>
            </ul>
          </div>
        </div>
      )}
      {ownChannel === true && (
        <div className={styles.sideBarContent}>
          <div className={styles.searchBar}>
            <button type="button" className={styles.searchBarComponent}>
              Tìm hoặc bắt đầu cuộc trò chuyện
            </button>
          </div>
          <div className={styles.scoller}>
            <ul className={styles.content}>
              <li className={styles.scollerItem} aria-posinset={1}>
                <ChannelContainer
                  active={currentListItemIndex == 1 ? true : false}
                  src={"/images/friend.svg"}
                  title={"Bạn bè"}
                  onClick={() => {
                    setcurrentChannel(setCurrentListItemIndex(1));
                    history("/channel/@me");
                  }}
                />
              </li>
              <li className={styles.scollerItem} aria-posinset={2}>
                <ChannelContainer
                  active={currentListItemIndex == 2 ? true : false}
                  src={"/images/nitro.svg"}
                  title={"Nitro"}
                  onClick={() => {
                    setcurrentChannel(setCurrentListItemIndex(2));
                  }}
                />
              </li>

              <li className={styles.scollerItem} aria-posinset={3}>
                <ChannelContainer
                  active={currentListItemIndex == 3 ? true : false}
                  src={"/images/store.svg"}
                  title={"Cửa hàng"}
                  onClick={() => {
                    setCurrentListItemIndex(3);
                  }}
                />
              </li>
              <li className={styles.scollerItem} aria-posinset={4}>
                <div className={styles.privateChannelsHeaderContainer}>
                  <h6 className={styles.headingText}>TIN NHẮN TRỰC TIẾP</h6>
                  <FaPlus className={styles.privateChannelsHeaderIcon} />
                </div>
              </li>

              {/* <li className={styles.scollerItem} aria-posinset={5}>
                <DirectMessageContainer
                  userName="ChamAnh"
                  active={currentListItemIndex == 5 ? true : false}
                  onClick={() => {
                    setCurrentListItemIndex(5);
                    history(`/channel/@me/${currentListItemIndex}`);
                  }}
                />
              </li>
              <li className={styles.scollerItem} aria-posinset={6}>
                <DirectMessageContainer
                  userName="Son"
                  active={currentListItemIndex == 6 ? true : false}
                  onClick={() => {
                    setCurrentListItemIndex(6);
                  }}
                />
              </li>
              <li className={styles.scollerItem} aria-posinset={7}>
                <DirectMessageContainer
                  userName="hokhanhduy_"
                  active={currentListItemIndex == 7 ? true : false}
                  onClick={() => {
                    setCurrentListItemIndex(7);
                  }}
                />
              </li> */}
              {listFriends.map((friend, index) => {
                return (
                  <li className={styles.scollerItem} aria-posinset={index + 5}>
                    <DirectMessageContainer
                      userName={friend.username}
                      active={currentListItemIndex == index + 5 ? true : false}
                      onClick={() =>
                        // setCurrentListItemIndex(index + 5);
                        // history(`/channel/@me/${friend.id}`);
                        handleClick(friend.id, index)
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      <Panel />
    </div>
  );
};

export default SideBar;
