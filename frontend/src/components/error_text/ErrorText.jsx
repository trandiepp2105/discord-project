import React from "react";
import classNames from "classnames";
import styles from "./ErrorText.module.css";
const ErrorText = ({ className, text, show = false, props }) => {
  if (show) {
    return (
      <div className={classNames(className, styles.errorText)} {...props}>
        {text}
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorText;
