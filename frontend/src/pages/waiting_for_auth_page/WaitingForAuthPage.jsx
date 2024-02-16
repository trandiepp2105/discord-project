import React from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import FormButton from "../../components/form_button/FormButton";
import styles from "./WaitingForAuthPage.module.css";

const WatingForAuthPage = () => {
  const history = useNavigate();
  const handleSubmit = () => {
    history("/login");
  };
  return (
    <div className={styles.wrapperVerifyEmailPage}>
      <div className={styles.mainContent}>
        <div className={styles.emailImage}>
          <img
            src="images/email_auth.png"
            alt="email-img"
            className={styles.emailImg}
          />
        </div>

        <h3 className={styles.title}>Check your email, please!</h3>
        <p className={styles.description}>
          Hey, user_name; to continue using our platform you need to confirm
          your e-mail. We've already sent out the verification link. Please
          check it and confirm it's really you.
        </p>
        <div className={styles.wrapperMainBtn}>
          <FormButton
            type="button"
            text={"Sure!"}
            className={styles.mainBtn}
            onClick={() => {
              history("/login");
            }}
          />
        </div>

        <div className={styles.resendLink}>
          Didn't get e-email?
          <span className={classNames("text-link", styles.cusTextLink)}>
            Send it again
          </span>
        </div>
      </div>
    </div>
  );
};

export default WatingForAuthPage;
