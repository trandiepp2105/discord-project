import { React, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./LoginPage.module.css";
import InputField from "../../components/input_field/InputField";
import FormButton from "../../components/form_button/FormButton";
const LoginPage = () => {
  const initialFormData = {
    emailOrPhone: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  return (
    <div className={styles.wrapperSignUpPage}>
      <div className={styles.formContainer}>
        <div className={styles.mainLoginContainer}>
          <h3 className={styles.heading}>Welcome back!</h3>
          <span className={styles.welcomeText}>
            We're so excited to see you again!
          </span>
          {/* Field for enter email or phone number. */}
          <div className={styles.inputBlock}>
            <label className={styles.label} htmlFor="email">
              EMAIL OR PHONE NUMBER
            </label>
            <InputField
              type={"text"}
              id="email"
              name={"email"}
              onchange={(event) => {
                setFormData({ ...formData, emailOrPhone: event.target.value });
              }}
            />
          </div>
          {/* Field for enter password */}
          <div className={classNames(styles.inputBlock, styles.inputPwdBlock)}>
            <label className={styles.label} htmlFor="password">
              PASSWORD
            </label>
            <InputField
              type={"password"}
              id="password"
              name={"password"}
              onchange={(event) => {
                setFormData({ ...formData, password: event.target.value });
              }}
            />
          </div>

          {/* Navigate to fogot password page. */}
          <Link
            to="/"
            className={classNames(styles.forgotPwdLink, "text-link")}
          >
            Forgor your password?
          </Link>

          {/* Submit button */}
          <FormButton type={"submit"} text={"Log In"} />

          {/* Navigate to sign up page. */}
          <span className={classNames(styles.registerLink)}>
            Need an account?{" "}
            <Link to={"/signup"} className="text-link">
              Register
            </Link>
          </span>
        </div>
        <div className={styles.verticalSeparator}></div>
        <div className={styles.qrLogin}>
          <img src="images/qr.svg" alt="" className={styles.qrImg} />
          <h2 className={styles.qrTitle}>Login with QR code </h2>
          <p className={styles.qrText}>
            Scan this with the <b>Discord mobile app</b> to log in instantly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
