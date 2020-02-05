import React from "react";
import LoginPage from "../src/pages/Login/LoginPage";
import GamePage from "../src/pages/Game/GamePage";
import { HashRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <HashRouter basename="/nappulapeli">
        <Switch>
          <Route exact path={"/"} render={props => <LoginPage {...props} />} />
          <Route
            exact
            path={"/game"}
            render={props => <GamePage {...props} />}
          />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
