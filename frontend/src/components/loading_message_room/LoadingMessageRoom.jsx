import React from "react";
import styles from "./LoadingMessageRoom.module.css";
import classNames from "classnames";

const Blob = ({ size }) => {
  return <div className={styles.blob} style={{ width: size }}></div>;
};

const LoadingMessageRoom = () => {
  const firstLineBlob = [
    "70px",
    "35px",
    "63px",
    "72px",
    "70px",
    "55px",
    "43px",
    "53px",
  ];

  const secondLineBlob = ["67px", "49px", "68px", "69px"];
  const thirdLineBlob = [
    "48px",
    "41px",
    "54px",
    "79px",
    "62px",
    "40px",
    "72px",
  ];

  const firstLineBlobOfFullLoading = [
    "50px",
    "36px",
    "54px",
    "42px",
    "44px",
    "36px",
    "65px",
  ];
  return (
    <div className={styles.wrapper}>
      {[...Array(5)].map((index) => {
        return (
          <>
            <div
              className={classNames(
                styles.simpleLoading,
                styles.simpleLoadingType1
              )}
            >
              {/* <Blob size={"100px"} /> */}
              {firstLineBlob.map((size, index) => {
                return <Blob size={size} />;
              })}
            </div>
            <div
              className={classNames(
                styles.simpleLoading,
                styles.simpleLoadingType1
              )}
            >
              {/* <Blob size={"100px"} /> */}
              {secondLineBlob.map((size, index) => {
                return <Blob size={size} />;
              })}
            </div>
            <div
              className={classNames(
                styles.simpleLoading,
                styles.simpleLoadingType1
              )}
            >
              {/* <Blob size={"100px"} /> */}
              {thirdLineBlob.map((size, index) => {
                return <Blob size={size} />;
              })}
            </div>
          </>
        );
      })}
      {[...Array(4)].map((index) => {
        return (
          <div className={styles.fullLoading}>
            <div className={styles.leftSideWrapper}>
              <div className={styles.leftSide}></div>
            </div>
            <div className={styles.rightSideWrapper}>
              <div className={styles.firstLine}>
                <Blob size={"113px"} />
              </div>
              <div className={styles.secondLine}>
                {firstLineBlobOfFullLoading.map((size, index) => {
                  return <Blob key={index} size={size} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.imageBlob}></div>
      <div
        className={classNames(styles.simpleLoading, styles.simpleLoadingType1)}
      >
        {/* <Blob size={"100px"} /> */}
        {firstLineBlob.map((size, index) => {
          return <Blob key={index} size={size} />;
        })}
      </div>
      <div
        className={classNames(styles.simpleLoading, styles.simpleLoadingType1)}
      >
        {/* <Blob size={"100px"} /> */}
        {secondLineBlob.map((size, index) => {
          return <Blob key={index} size={size} />;
        })}
      </div>
      <div
        className={classNames(styles.simpleLoading, styles.simpleLoadingType1)}
      >
        {/* <Blob size={"100px"} /> */}
        {thirdLineBlob.map((size, index) => {
          return <Blob key={index} size={size} />;
        })}
      </div>
    </div>
  );
};

export default LoadingMessageRoom;
