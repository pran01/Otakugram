import React from "react";
import { Link, Redirect } from "react-router-dom";

const Logout = () => {
  fetch("/api/logout-user");
  return <Redirect to="/login" />;
};

export default Logout;
