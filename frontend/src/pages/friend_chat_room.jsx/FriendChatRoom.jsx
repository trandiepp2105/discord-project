import { React, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./FriendChatRoom.module.css";
import NavBar from "../../components/nav_bar/NavBar";
import DirectChatNavBar from "../../components/direct_chat_nav_bar/DirectChatNavBar";
import ChannelTextArea from "../../components/channel_text_area/ChannelTextArea";
import Avatar from "../../components/avatar/Avatar";
import MessageTag from "../../components/message_tag/MessageTag";
import TextPopup from "../../components/popups/text_popup/TextPopup";
import ChatFeaturePopup from "../../components/popups/chat_feature_popup/ChatFeaturePopup";
import axios from "axios";
import Cookies from "js-cookie";
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import LoadingMessageRoom from "../../components/loading_message_room/LoadingMessageRoom";
const FriendChatRoom = ({}) => {
  const [messages, setMessages] = useState([]); // messages in the chat room
  const [roomProfile, setRoomProfile] = useState(null);
  const [currentMessageUserID, setCurrentMessageUserID] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [client, setClient] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef();
  let currentUserID = null;

  const setupWebSocket = () => {
    // Chỉ tạo kết nối WebSocket nếu chưa có
    if (!client) {
      const newClient = new W3CWebSocket(
        `ws://127.0.0.1:8000/ws/friend_chat/${room_id}/`
      );
      newClient.onmessage = handleWebSocketMessage;
      setClient(newClient);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thực hiện các hành động cần thiết khi submit form
    console.log("Form submitted with value:", inputValue);
    scrollToBottom();
    const endpoint = `http://127.0.0.1:8000/messages/?room_id=${room_id}/`;
    const accessToken = Cookies.get("access_token");
    const data = {
      message: inputValue,
      type: "room",
    };
    console.log("data: ", data);
    setInputValue("");
    axios
      .post(endpoint, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("message res: ", res);
        console.log("message data: ", res.data.data);
        client.send(
          JSON.stringify({
            message: res.data.data,
          })
        );
      })
      .catch((error) => {
        console.log("error message: ", error);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  };
  let { room_id } = useParams();

  const FetchMessage = (roomId) => {
    const endpoint = `http://127.0.0.1:8000/messages/?room_id=${roomId}`;
    const accessToken = Cookies.get("access_token");
    axios
      .get(endpoint, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res: ", res);
        console.log("messages: ", res.data.results);
        console.log("next page: ", res.data.next);
        setNextPage(res.data.next);
        setIsLoading(false);
        setMessages(res.data.results.reverse());
        setCurrentMessageUserID(res.data.results[0].author);
      })
      .catch((error) => {
        console.log("fetch message error: ", error);
      });
  };

  const DeleteMessage = (messageId) => {
    const endpoint = `http://127.0.0.1:8000/messages/${messageId}`;
    const accessToken = Cookies.get("access_token");
    axios.delete(endpoint, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  const [friendProfile, setFriendProfile] = useState({});
  const FriendProfile = (userId) => {
    const endpoint = `http://localhost:8000/users/${userId}/`;
    axios
      .get(endpoint)
      .then((res) => {
        setFriendProfile(res.data);
        // console.log("user profile: ", res.data);
      })
      .catch((error) => {
        console.log("profile err: ", error);
      });
  };

  const getUserProfile = (userId) => {
    const endpoint = `http://localhost:8000/users/${userId}/`;
    axios
      .get(endpoint)
      .then((res) => {
        // return res.data;
        console.log("user profile: ", res.data);
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.log("profile err: ", error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    FetchMessage(room_id);
    setupWebSocket();
  }, [room_id]);

  useEffect(() => {
    scrollToBottom();
    if (messageContainerRef.current) {
      messageContainerRef.current.addEventListener("scroll", handleScroll);
    }

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      if (messageContainerRef.current) {
        messageContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    const data = JSON.parse(message.data);
    console.log("Received message:", data.message);
    setMessages((prevMessages) => [...prevMessages, data.message]);
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    console.log("run");
    if (messageContainerRef.current.scrollTop === 0 && nextPage) {
      console.log("end");
      setIsLoading(true); // Thiết lập isLoading thành true khi gửi yêu cầu để tải thêm tin nhắn
      axios
        .get(nextPage, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((res) => {
          setMessages((prevMessages) => [
            ...res.data.results.reverse(),
            ...prevMessages,
          ]);
          console.log("new message: ", res.data.results.reverse());
          setNextPage(res.data.next);
          console.log("next: ", res.data.next);
          setIsLoading(false); // Thiết lập isLoading thành false khi nhận được phản hồi từ server
        })
        .catch((error) => {
          console.log("fetch additional messages error: ", error);
          setIsLoading(false); // Thiết lập isLoading thành false nếu có lỗi khi tải tin nhắn
        });
    }
  };
  useEffect(() => {
    console.log("current messages: ", messages);
  }, [messages]);
  return (
    <div className={styles.wrapper}>
      <DirectChatNavBar name={friendProfile.username} type={"FRIENDROOM"} />
      <div className={styles.mainContent}>
        <div className={styles.messageWrapper}>
          <div
            className={styles.scroller}
            id="messageContainer"
            ref={messageContainerRef}
          >
            <div className={styles.scrollerContent}>
              <ol className={styles.scrollerInner}>
                {isLoading && <LoadingMessageRoom />}
                {!nextPage && (
                  <div className={styles.generalInfor}>
                    <div className={styles.wrapperAvatar}>
                      <img
                        src={"/images/logo.png"}
                        alt="avatar"
                        className={styles.avatarImg}
                      />
                    </div>
                    <h3 className={styles.heading}>{friendProfile.username}</h3>
                    <div className={styles.description}>
                      <h3 className={styles.mediumHeading}>
                        {friendProfile.username}
                      </h3>
                      <p className={styles.descriptionText}>
                        Đây là phần mở đầu trong lịch sử các tin nhắn trực tiếp
                        của bạn với <strong>{friendProfile.username}</strong>.
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
                )}
                <div className={styles.dateDivider}>
                  <span className={styles.dateDividerContent}>
                    18 tháng 2 năm 2024
                  </span>
                </div>
                {messages.map((message, index) => {
                  const simpleOption = currentUserID === message.author.id;
                  currentUserID = message.author.id;
                  return (
                    <MessageTag
                      key={index}
                      textSrc={message.message}
                      simpleOption={simpleOption}
                      timePosted={message.created_at}
                      displayName={message.author.display_name}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
        <form className={styles.sendMessageForm} onSubmit={handleSubmit}>
          <ChannelTextArea
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            inputValue={inputValue}
          />
        </form>
      </div>
    </div>
  );
};

export default FriendChatRoom;
