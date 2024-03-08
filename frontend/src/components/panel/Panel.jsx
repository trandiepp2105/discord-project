import React from "react";
import styles from "./Panel.module.css";
import Avatar from "../avatar/Avatar";
import { FaHeadphones } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { BsFillMicMuteFill } from "react-icons/bs";

const Panel = ({ mute = true }) => {
  return (
    <section className={styles.panel}>
      <div className={styles.wrapper}>
        <div className={styles.avatarWrapper}>
          <Avatar />
          <div className={styles.nameTag}>
            <h5 className={styles.userNameContainer}>trandiepp2105ddd</h5>
            <h6 className={styles.userStatusContainer}>Online</h6>
          </div>
        </div>
        <div className={styles.horizontalFunctionPanel}>
          <button className={styles.wrapperFunction}>
            {mute === true ? (
              <BsFillMicMuteFill className={styles.functionIcon} color="red" />
            ) : (
              <img
                src="/images/micro.svg"
                alt=""
                className={styles.functionIcon}
              />
            )}
          </button>
          <button className={styles.wrapperFunction}>
            <FaHeadphones className={styles.functionIcon} />
          </button>
          <button className={styles.wrapperFunction}>
            <RiSettings5Fill className={styles.functionIcon} size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Panel;
