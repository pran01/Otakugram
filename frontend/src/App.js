import React from "react";
import "./styles/App.scss";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Logout from "./screens/Logout";

import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/logout" exact>
        <Logout />
      </Route>
    </Switch>
  );
};
export default App;
