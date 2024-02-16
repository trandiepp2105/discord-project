//Module import
import { React, useState } from "react";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

// Css import
import styles from "./SignUpPage.module.css";

//Components import
import InputField from "../../components/input_field/InputField";
import FormButton from "../../components/form_button/FormButton";
import RequireAsterisk from "../../components/require_asterisk/RequireAsterisk";
import ErrorText from "../../components/error_text/ErrorText";

function getMonthOptions() {
  //  Create an array of month options for the select input field
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options = [];
  const placeholder = (
    <option disabled selected>
      Month
    </option>
  );
  options.push(placeholder);
  for (let i = 0; i < monthNames.length; i++) {
    options.push(
      <option key={i + 1} value={i + 1}>
        {monthNames[i]}
      </option>
    );
  }
  return options;
}

function getDayOptions(maxDays) {
  //   Generate a list of day options based on how many days are in the given month
  const options = [];
  const placeholder = (
    <option disabled selected>
      Day
    </option>
  );
  options.push(placeholder);
  for (let i = 1; i <= maxDays; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
}

function getYearOptions() {
  //  Create an array of month options for the select input field
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 100;
  const years = Array.from({ length: 100 }, (_, i) => i + startYear);
  const options = [];
  const placeholder = (
    <option disabled selected>
      Year
    </option>
  );
  options.push(placeholder);
  for (let i = years.length - 1; i >= 0; i--) {
    options.push(
      <option key={years[i]} value={years[i]}>
        {years[i]}
      </option>
    );
  }
  return options;
}

const SignUpPage = () => {
  const initialFormData = {
    email: "",
    displayName: "",
    userName: "",
    password: "",
    dayOfBirth: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [showErrorText, setShowErrorText] = useState({
    showEmailError: false,
    showDisplayNameError: false,
    showUserNameError: false,
    showPasswordError: false,
    showDateOfBirthError: false,
  });

  return (
    <div className={styles.wrapperSignUpPage}>
      <div className={styles.formContainer}>
        <h3 className={styles.heading}>Create an account</h3>
        {/* Email field */}
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="email">
            EMAIL
            <RequireAsterisk />
          </label>
          <InputField
            type={"text"}
            id="email"
            name={"email"}
            onchange={(event) => {
              setFormData({ ...formData, email: event.target.value });
            }}
          />
          <ErrorText
            text={"Please enter a valid email address."}
            show={showErrorText.showEmailError}
          />
        </div>
        {/* Display name field */}
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="displayName">
            DISPLAY NAME
            <RequireAsterisk />
          </label>
          <InputField
            type="text"
            id="displayName"
            name="displayName"
            onchange={(event) => {
              setFormData({ ...formData, displayName: event.target.value });
            }}
          />
          <ErrorText
            text={"Please enter a displayname."}
            show={showErrorText.showDisplayNameError}
          />
        </div>
        {/* User name field */}
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="userName">
            USER NAME
            <RequireAsterisk />
          </label>
          <InputField
            type="text"
            id="userName"
            name="userName"
            onchange={(event) => {
              setFormData({ ...formData, userName: event.target.value });
            }}
          />
          <ErrorText
            text={"Please enter a username."}
            show={showErrorText.showUserNameError}
          />
        </div>
        {/* Password fields */}
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="password">
            PASSWORD
            <RequireAsterisk />
          </label>
          <InputField
            type="password"
            id="password"
            name="password"
            onchange={(event) => {
              setFormData({ ...formData, password: event.target.value });
            }}
          />
          <ErrorText
            text={"Please enter a valid password."}
            show={showErrorText.showPasswordError}
          />
        </div>
        {/* Date of birth field */}
        <div className={styles.inputBlock}>
          <label className={styles.label} htmlFor="dateOfBirth">
            DATE OF BIRTH
            <RequireAsterisk />
          </label>
          <div className={styles.wrapperSelects}>
            <div
              className={classNames(
                styles.wrapperSelectItem,
                styles.wrapperSelectMonth
              )}
            >
              <select
                className={classNames(styles.selectItem)}
                name="month"
                id="month"
              >
                {getMonthOptions()}
              </select>
              <IoIosArrowDown className={styles.arrowBtn} />
            </div>

            <div
              className={classNames(
                styles.wrapperSelectItem,
                styles.wrapperSelectDay
              )}
            >
              <select
                className={classNames(styles.selectItem)}
                name="day"
                id="day"
              >
                {getDayOptions(31)}
              </select>
              <IoIosArrowDown className={styles.arrowBtn} />
            </div>

            <div
              className={classNames(
                styles.wrapperSelectItem,
                styles.wrapperSelectYear
              )}
            >
              <select
                className={classNames(styles.selectItem)}
                name="year"
                id="year"
              >
                {getYearOptions()}
              </select>
              <IoIosArrowDown className={styles.arrowBtn} />
            </div>
          </div>
          <ErrorText
            text={"Date of birth is required."}
            show={showErrorText.showDateOfBirthError}
          />
        </div>
        {/*  */}
        <div className={styles.wrapperOptionalCheckbox}>
          <div className={styles.customCheckbox}>
            <input
              className={styles.inputCheckbox}
              type="checkbox"
              name="optCheckbox"
              id="optCheckbox"
            />
          </div>
          <label className={styles.optionalText} htmlFor="optCheckbox">
            (Optional) It's okay to send me emails with Discord updates, tips,
            and specials offers. You can opt out any time.
          </label>
        </div>

        {/*  Submit button */}
        <FormButton type={"submit"} text={"Continue"} onClick={onFormSubmit} />
        {/* <button type="submit" className={styles.submitBtn}>
          Continue
        </button> */}
        {/* Term and policy btn */}
        <p className={styles.policyText}>
          By registering, you agree to Discord's{" "}
          <Link to="/" className={classNames(styles.policyLink, "text-link")}>
            Term of Service
          </Link>{" "}
          and{" "}
          <Link to="/" className={classNames(styles.policyLink, "text-link")}>
            Privacy Policy
          </Link>
        </p>

        {/* Navigate to login page. */}
        <div className={styles.navigateBtn}>
          <Link to={"/login"} className="text-link">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
