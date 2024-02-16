import React from "react";
import styles from "./InputField.module.css";
import classNames from "classnames";
const InputField = ({ type, id, name, className, props, onChange }) => {
  return (
    <input
      className={classNames(styles.inputField, className)}
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputField;
