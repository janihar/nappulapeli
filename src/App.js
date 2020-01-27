import React from "react";
import LoginPage from "../src/pages/Login/LoginPage";
import GamePage from "../src/pages/Game/GamePage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props => <LoginPage {...props} />} />
          <Route
            exact
            path={"/game"}
            render={props => <GamePage {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
