import React from "react";
import { useState } from "react";
import useInput from "../inputMaterial/useInput";
import axios from "axios";

const RegistrationPanel = ({}) => {
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput("");

  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName,
  } = useInput("");

  const { value: login, bind: bindLogin, reset: resetLogin } = useInput("");

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
  const {
    value: repeatEmail,
    bind: bindRepeatEmail,
    reset: resetRepeatEmail,
  } = useInput("");

  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");
  const {
    value: repeatPassword,
    bind: bindRepeatPassword,
    reset: resetRepeatPassword,
  } = useInput("");

  const { areTermsChecked, setAreTermsChecked } = useState(true);
  const handleOnChange = () => {
    setAreTermsChecked(!areTermsChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      resetPassword();
      resetRepeatPassword();
      document
        .querySelector(".registration__failure--wrong-password")
        .classList.remove(".hidden");
      setTimeout(() => {
        document
          .querySelector(".registration__failure--wrong-password")
          .classList.add(".hidden");
      }, 5000);
    } else if (email !== repeatEmail) {
      document
        .querySelector(".registration__failure--wrong-email")
        .classList.remove(".hidden");
      setTimeout(() => {
        document
          .querySelector(".registration__failure--wrong-email")
          .classList.add(".hidden");
      }, 5000);
    } else {
      axios.post(`http://localhost:8080/user-accounts`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        login: login,
        password: password,
      });
    }
  };

  const onBlurRepeat = (e, type) => {
    const message = document.createElement("p");
    message.classList.add(`${type}__error`);
    message.innerHTML = `${
      type.slice(0, 1).toUpperCase() + type.slice(1)
    }s are not the same!`;
    let value = "";
    let repeatValue = "";
    switch (type) {
      case "password":
        value = password;
        repeatValue = repeatPassword;
        break;
      case "email":
        value = email;
        repeatValue = repeatEmail;
        break;
    }
    if (
      value !== repeatValue &&
      document.querySelector(`.${type}__error`) === null
    ) {
      e.target.after(message);
      return;
    }
    if (
      value === repeatValue &&
      document.querySelector(`.${type}__error`) !== null
    ) {
      document.querySelector(`.${type}__error`).remove();
    }
  };

  return (
    <>
      <form
        className="registration__registration-panel"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input type="text" placeholder="First name" {...bindFirstName} />
        <input type="text" placeholder="Last name" {...bindLastName} />
        <input type="text" placeholder="Login" {...bindLogin} />
        <input type="text" placeholder="Email address" {...bindEmail} />
        <input
          type="text"
          placeholder="Repeat email address"
          onBlur={(e) => {
            onBlurRepeat(e, "email");
          }}
          {...bindRepeatEmail}
        />
        <input type="password" placeholder="Password" {...bindPassword} />
        <input
          type="password"
          placeholder="Repeat password"
          onBlur={(e) => {
            onBlurRepeat(e, "password");
          }}
          {...bindRepeatPassword}
        />

        <input
          type="checkbox"
          id="terms"
          checked={areTermsChecked}
          onChange={() => handleOnChange}
        />
        <label htmlFor="terms">I agree to Terms and Privacy Policy</label>
        <input type="submit" />
      </form>
      <p className="registration__failure--wrong-password hidden">
        Passwords doesn't match.
      </p>
      <p className="registration__failure--wrong-email hidden">
        Email doesn't match.
      </p>
    </>
  );
};

export default RegistrationPanel;
