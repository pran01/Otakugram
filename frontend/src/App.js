import "./styles/App.scss";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

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
    </Switch>
  );
};
export default App;
