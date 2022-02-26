import React from "react";
import "../styles/DangerButton.scss";

const DangerButton = ({ text }) => {
  return <button className="danger-button">{text}</button>;
};

export default DangerButton;
