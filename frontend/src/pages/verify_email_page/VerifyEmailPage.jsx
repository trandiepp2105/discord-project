import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./VerifyEmailPage.module.css";
import FormButton from "../../components/form_button/FormButton";

const VerifyEmailPage = () => {
  const history = useNavigate();
  const { uid, token } = useParams();
  const sendToken = () => {
    const url = window.location.href;
    const endpoint = `http://127.0.0.1:8000/verify/${url.split("/")[4]}/${
      url.split("/")[5]
    }/`;
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    fetch(endpoint, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(async (data) => {
        console.log(data);
        window.localStorage.setItem("verified", "true");
        await sleep(3000);
        window.localStorage.removeItem("verified");
        history("/login");
      });
  };
  React.useEffect(() => {
    sendToken();
  }, []);
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
