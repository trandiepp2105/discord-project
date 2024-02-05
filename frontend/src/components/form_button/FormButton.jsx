import React from "react";
import styles from "./FormButton.module.css";
import classNames from "classnames";
const FormButton = ({ className, type, text, props }) => {
  return (
    <button
      type={type}
      className={classNames(styles.formButton, className)}
      {...props}
    >
      {text}
    </button>
  );
};

export default FormButton;
