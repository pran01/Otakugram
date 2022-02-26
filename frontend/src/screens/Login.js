import React, { useState } from "react";
import "../styles/Login.scss";

import lucyKey from "../assets/images/lucy-key.png";
import googleLogo from "../assets/images/Google-logo.png";
import { Link } from "react-router-dom";
import SignupModal from "../components/SignupModal";

const Login = () => {
  const [signinMessage, setSigninMessage] = useState({
    message: "",
    type: "",
  });

  const [modalShow, setModalShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    setSigninMessage({
      ...signinMessage,
      message: "signing in...",
      type: "waiting",
    });
    setModalShow(true);
    const dataToSend = {
      username: username,
      password: password,
    };
    let signinMessageTemp = { message: "signing in...", type: "waiting" };
    fetch("/api/login-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setSigninMessage({ ...signinMessageTemp, type: "success" });
            signinMessageTemp = { ...signinMessageTemp, type: "success" };
          }, 3000); //calls this method after 3 sec, so that for 3secs it shows loading stage.
        } else if (response.status === 400) {
          setTimeout(() => {
            setSigninMessage({ ...signinMessageTemp, type: "error" });
            signinMessageTemp = { ...signinMessageTemp, type: "error" };
          }, 3000); //calls this method after 3 sec, so that for 3secs it shows loading stage.
        }
        return response.text();
      })
      .then((data) => {
        setTimeout(() => {
          setSigninMessage({ ...signinMessageTemp, message: data });
          signinMessageTemp = { ...signinMessageTemp, message: data };
        }, 3000);
      });
  };

  return (
    <div className="login-container">
      <div className="login-bg"></div>
      {/* loginModal */}

      <SignupModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        signupMessage={signinMessage}
      />

      <div className="login-form-container">
        <p className="title">OTAKUGRAM</p>
        <form action="" className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={login}>
            {" "}
            <img src={lucyKey} alt="Lucy-Key" /> Sign In{" "}
          </button>
        </form>
        <p>
          New User? <Link to="/signup">SIGN UP</Link>
        </p>
        <div className="option">
          <hr />
          <span> OR </span>
          <hr />
        </div>
        <button className="google-auth">
          <img src={googleLogo} alt="Google-Logo" />
          Sign in with google
        </button>
      </div>
    </div>
  );
};
export default Login;
