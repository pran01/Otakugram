import React from "react";
import "../styles/Signup.scss";

import lucyKey from "../assets/images/lucy-key.png";
import googleLogo from "../assets/images/Google-logo.png";
import { useState } from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

import SignupModal from "../components/SignupModal";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [usernameAvailability, setUsernameAvailability] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(true);
  const [signupMessage, setSignupMessage] = useState({
    message: "",
    type: "",
  });
  const [modalShow, setModalShow] = useState(false);

  const checkUsernameAvailability = (username) => {
    fetch(`/api/check-username/${username}`)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) setUsernameAvailability("available");
        else setUsernameAvailability("taken");
        return response.text();
      })
      .then((data) => {
        console.log(data);
      });
    setUsername(username);
  };

  const checkUsername = (username) => {
    if (username.length > 0) {
      checkUsernameAvailability(username);
    } else {
      setUsername("");
      setUsernameAvailability("");
    }
  };

  const signUp = () => {
    if (passwordMatched && repassword.length > 0) {
      setSignupMessage({
        ...signupMessage,
        message: "Signing up...",
        type: "waiting",
      });
      let signupMessageTemp = { message: "Signing up...", type: "waiting" };
      setModalShow(true);
      const dataToSend = {
        name: name,
        username: username,
        email: email,
        password: password,
      };
      fetch("/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
        credentials: "include",
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 201) {
            setTimeout(() => {
              setSignupMessage({ ...signupMessageTemp, type: "success" });
              signupMessageTemp = { ...signupMessageTemp, type: "success" };
            }, 3000); //calls this method after 3 sec, so that for 3secs it shows loading stage.
          } else if (response.status === 400) {
            setTimeout(() => {
              setSignupMessage({ ...signupMessageTemp, type: "error" });
              signupMessageTemp = { ...signupMessageTemp, type: "error" };
            }, 3000); //calls this method after 3 sec, so that for 3secs it shows loading stage.
          }
          return response.text();
        })
        .then((data) => {
          setTimeout(() => {
            setSignupMessage({ ...signupMessageTemp, message: data });
            signupMessageTemp = { ...signupMessageTemp, message: data };
          }, 3000);
        });
    } else {
      setModalShow(true);
      setSignupMessage({
        ...signupMessage,
        message: "Recheck if both passwords match",
        type: "error",
      });
    }
  };

  const matchPassword = (value) => {
    setRepassword(value);
    if (value.length > 0) {
      if (value === password) setPasswordMatched(true);
      else setPasswordMatched(false);
    } else if (value.length === 0) setPasswordMatched(true);
  };

  return (
    <div className="signup-container">
      {/* Background blurred image */}
      <div className="login-bg"></div>

      {/*Signup Modal*/}

      <SignupModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        signupMessage={signupMessage}
      />

      {/* Signup Form */}

      <div className="signup-form-container">
        <p className="title">OTAKUGRAM</p>
        <form action="" className="signup-form">
          <div className="form-group">
            <div className="name-group">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="username-group">
              <input
                type="text"
                placeholder="Username"
                className={usernameAvailability}
                value={username}
                onChange={(e) => checkUsername(e.target.value)}
              />
              <p
                className={
                  usernameAvailability === "taken" ? "error show" : "error"
                }>
                <FaExclamationCircle className="icon" />
                Username Taken
              </p>
              <p
                className={
                  usernameAvailability === "available"
                    ? "success show"
                    : "success"
                }>
                <FaCheckCircle className="icon" />
                Username Available
              </p>
            </div>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="password-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className={passwordMatched ? "matched" : "unmatched"}
              value={repassword}
              onChange={(e) => matchPassword(e.target.value)}
            />
            <p className={passwordMatched ? "error" : "error show"}>
              <FaExclamationCircle className="icon" />
              Passwords do not match
            </p>
          </div>
          <button type="button" onClick={signUp}>
            <img
              src={lucyKey}
              alt="Lucy-Key"
              className={modalShow ? "hide" : ""}
            />{" "}
            Sign Up{" "}
          </button>
        </form>
        <p>
          Existing User? <Link to="/login">SIGN IN</Link>
        </p>
        <div className="option">
          <hr />
          <span> OR </span>
          <hr />
        </div>
        <button className="google-auth">
          <img src={googleLogo} alt="Google-Logo" />
          Sign up with google
        </button>
      </div>
    </div>
  );
};

export default Signup;
