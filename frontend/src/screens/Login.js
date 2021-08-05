import "../styles/Login.scss";

import lucyKey from "../assets/images/lucy-key.png";
import googleLogo from "../assets/images/Google-logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-bg"></div>
      <div className="login-form-container">
        <p className="title">OTAKUGRAM</p>
        <form action="" className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">
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
