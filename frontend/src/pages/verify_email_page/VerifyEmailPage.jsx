import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./VerifyEmailPage.module.css";
import FormButton from "../../components/form_button/FormButton";
const VerifyEmailPage = () => {
  const history = useNavigate();
  const { uid, token } = useParams();

  const handleSubmit = () => {
    history("/login");
  };
  return (
    <div className={styles.wrapperVerifyEmailPage}>
      <div className={styles.mainContent}>
        <div className={styles.emailImage}>
          <img
            src="/images/email_auth.png"
            alt="email"
            className={styles.emailImg}
          />
        </div>

        <h2 className={styles.title}>Your email has been verified!</h2>
        <FormButton
          type="button"
          text={"Continue to Login"}
          className={styles.loginBtn}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
