import React, { useState } from "react";
import "../../styles/login-form-clean.css";
import "../../styles/styles.css";
import "../../styles/styles.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/vincit_logo_red.jpg";
import { Link, Redirect } from "react-router-dom";

const LoginForm = props => {
  const [userName, setUsername] = useState("");
  const [reDirect, setReDirect] = useState(false); //For router, redirecting to game page
  const [userExists, setExists] = useState(false);

  const doesExists = async name => {
    const fetchUser = await fetch(
      "http://testvinc.herokuapp.com/doesExists?userName=" + name
    );
    let responseStatus = await fetchUser.status;

    if (responseStatus === 200) {
      setReDirect(true);
    } else {
      setExists(true);
    }
  };

  //Handling request, when user press submit button
  const onSubmit = event => {
    event.preventDefault();
    doesExists(userName);
  };

  //Handling textinput when passing text
  const handleChange = e => {
    setUsername(e.target.value);
  };
  //Redirection
  if (reDirect === true) {
    localStorage.setItem("USERNAME", userName);
    localStorage.setItem("COUNTER", 20);

    return (
      <Redirect
        to={{
          pathname: "/game",
          state: { name: userName }
        }}
      ></Redirect>
    );
  }

  return (
    <div className="login-clean">
      <form onSubmit={onSubmit}>
        <img src={logo} alt="Amazing Vincit Logo" />
        {userExists && (
          <div class="alert alert-danger">
            <strong>TUNNUS ON OLEMASSA</strong> Valitse uusi käyttäjätunnus
          </div>
        )}
        <div className="illustration"></div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Käyttäjätunnus"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" type="submit">
            Pelaa
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;