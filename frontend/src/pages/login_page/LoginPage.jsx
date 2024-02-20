import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const checkInputFields = (formdata) => {
    if (formdata.emailOrPhone && formdata.password) {
      return true;
    }
    return false;
  };
  const history = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if(checkInputFields(formData)){
      const endpoint = "http://127.0.0.1:8000/login/";
      const data = {
        username: formData.emailOrPhone,
        password: formData.password,
      };
      console.log(data);
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
          }
          return response.json();
        
        })
        .then((data) => {
          console.log(data);
          history("/dashboard");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
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
              onChange={(event) => {
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
              onChange={(event) => {
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
          <FormButton type={"submit"} text={"Log In"} onClick={handleSubmit} />

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
