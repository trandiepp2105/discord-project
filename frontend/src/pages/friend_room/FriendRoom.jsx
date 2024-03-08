import { React, useEffect, useState, useContext } from "react";
import classNames from "classnames";
import styles from "./FriendRoom.module.css";
import NavBar from "../../components/nav_bar/NavBar";
import { IoSearch } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import PeopleItemContainer from "../../components/people_item_container/PeopleItemContainer";
import { DashboardPageContext } from "../dashboard_page/DashboardPage";
import axios from "axios";
import Cookies from "js-cookie";

const FriendRoom = () => {
  const { currentTab, setCurrentTab, tabs } = useContext(DashboardPageContext);
  const [enableAddFriendStatus, setEnableAddFriendStatus] = useState(false);
  const [addFriendBtnState, setAddFriendBtnState] = useState("enable");
  const [listFriends, setListFriends] = useState([]);
  const [data, setData] = useState({
    username: "",
  });

  const handleAddFriendSubmit = (event) => {
    event.preventDefault();
    const endpoint = "http://127.0.0.1:8000/friendships/";
    const accessToken = Cookies.get("access_token");
    console.log("data:", data);
    // if (!data.username || data.username === "") return;
    axios
      .post(endpoint, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Send add friend request error: ", error);
      });
  };

  const getListFriend = (tab) => {
    var endpoint = "";
    switch (tab) {
      case "ONLINE":
        endpoint = "http://127.0.0.1:8000/friendships/all/";
        break;
      case "ALL":
        endpoint = "http://127.0.0.1:8000/friendships/all/";
        break;
      case "WAITING":
        endpoint = "http://127.0.0.1:8000/friendships/pending/";
        break;
      case "BLOCKED":
        endpoint = "http://127.0.0.1:8000/friendships/blocked/";
        break;
      default:
        endpoint = "http://127.0.0.1:8000/friendships/all/";
    }
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
    getListFriend(currentTab);
    // const endpoint = "http://127.0.0.1:8000/friendships/pending/";
    // const accessToken = Cookies.get("access_token");
    // axios
    //   .get(endpoint, {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error("Send add friend request error: ", error);
    //   });
  }, [currentTab]);

  useEffect(() => {
    console.log("list friends: ", listFriends);
  }, [listFriends]);
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.tabBody}>
        <div className={styles.peopleColumn}>
          {currentTab != tabs.FRIENDTABS.ADDFRIEND ? (
            <div
              className={styles.peopleColumnContent}
              style={{ display: listFriends.length === 0 ? "none" : "block" }}
            >
              <div className={styles.searchBar}>
                <div className={styles.inner}>
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    className={styles.input}
                  />
                  <div className={styles.iconLayout}>
                    <HiMiniXMark className={styles.searchIcon} />
                  </div>
                </div>
              </div>
              <div className={styles.sectionTitle}>
                <h2 className={styles.title}>
                  Tất cả bạn bè - {listFriends.length}
                </h2>
              </div>
              <div className={styles.peopleList}>
                {listFriends.map((friend, index) => {
                  return (
                    <div className={styles.peopleListItem}>
                      <PeopleItemContainer
                        userName={friend.username}
                        status={"Online"}
                      />
                    </div>
                  );
                })}
                {/* <div className={styles.peopleListItem}>
                  <PeopleItemContainer userName={"ChamAnh"} status={"Online"} />
                </div>
                <div className={styles.peopleListItem}>
                  <PeopleItemContainer
                    userName={"hokhanhduy_"}
                    status={"Online"}
                  />
                </div>
                <div className={styles.peopleListItem}>
                  <PeopleItemContainer userName={"Son"} status={"Online"} />
                </div> */}
              </div>
            </div>
          ) : (
            <div className={styles.addFriendColumn}>
              <form
                className={styles.sendRequestForm}
                onSubmit={handleAddFriendSubmit}
              >
                <h2 className={styles.title}>THÊM BẠN</h2>
                <p className={styles.description}>
                  Bạn có thể thêm bạn bè bằng tên người dùng Discord của họ.
                </p>
                <div
                  className={classNames(
                    styles.addFriendInputWrapper,
                    addFriendBtnState === "enabled" && styles.focusInput
                  )}
                >
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      name=""
                      id="add-friend-input"
                      className={styles.addFriendInput}
                      placeholder="Bạn có thể thêm bạn bè bằng tên người dùng Discord của họ."
                      onFocus={async () => {
                        function sleep(ms) {
                          return new Promise((resolve) =>
                            setTimeout(resolve, ms)
                          );
                        }
                        // await sleep(3000);
                        setAddFriendBtnState("enabled");
                      }}
                      onBlur={async () => {
                        function sleep(ms) {
                          return new Promise((resolve) =>
                            setTimeout(resolve, ms)
                          );
                        }
                        await sleep(1000);
                        setAddFriendBtnState("disabled");
                      }}
                      onChange={(event) => {
                        const value = event.target.value;
                        setData({ username: value });
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={addFriendBtnState === "disabled"}
                  >
                    Gửi Yêu Cầu Kết Bạn
                  </button>
                </div>
                {/* <div className={styles.addFriendStatus}>
                  <p
                    className={classNames(
                      styles.successText,
                      styles.statusText
                    )}
                  >
                    Thành công! Yêu cầu kết bạn với hokhanhduy_ đã được gửi.
                  </p>
                </div> */}
              </form>
            </div>
          )}
          {listFriends.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.friendsEmpty}>
                <div className={styles.friendsEmptyImage}>
                  <img
                    src="/images/empty_img.svg"
                    alt=""
                    className={styles.friendsEmptyImg}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.nowPlayingColumn}>
          <div className={styles.container}>
            <h2 className={styles.heading}>Đang hoạt động</h2>
            <div className={styles.emptyCard}>
              <h2 className={styles.emptyHeader}>
                Hiện tại không có cập nhật mới nào cả...
              </h2>
              <p className={styles.emptyText}>
                Nếu bạn bè của bạn có hoạt động mới, ví dụ như chơi game hoặc
                trò chuyện thoại, chúng tôi sẽ hiển thị hoạt động đó ở đây!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRoom;
