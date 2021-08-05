import "../styles/SignupModal.scss";

import successGif from "../assets/images/anime_success.gif";
import waitingGif from "../assets/images/sharingan_loading.gif";
import errorGif from "../assets/images/anime_error.gif";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignupModal = ({ modalShow, setModalShow, signupMessage }) => {
  return (
    <div
      className={
        modalShow ? "signup-modal-container show" : "signup-modal-container"
      }>
      <div className="signup-modal-bg"></div>
      <div className="signup-modal">
        <button className="modal-close-btn" onClick={() => setModalShow(false)}>
          X
        </button>
        <div className="img-wrapper">
          {signupMessage["type"] === "success" ? (
            <img src={successGif} alt="waiting" />
          ) : signupMessage["type"] === "waiting" ? (
            <img src={waitingGif} alt="waiting" />
          ) : (
            <img src={errorGif} alt="waiting" />
          )}
        </div>

        <p>{signupMessage["message"]}</p>
        {signupMessage["type"] === "success" && (
          <Link className="goto-login-btn" type="button" to="/login">
            Proceed to Login <FaArrowAltCircleRight className="icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
