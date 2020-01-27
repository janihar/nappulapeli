import React, { useState } from "react";
import "../../styles/login-form-clean.css";
import "../../styles/styles.css";
import "../../styles/styles.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/vincit_logo_red.jpg";
import { Link } from "react-router-dom";

const onSubmit = event => {
  console.log(event);
  event.preventDefault();
};

const LoginForm = () => {
  const [userName, setUsername] = useState("");
  return (
    <div className="login-clean">
      <form onSubmit={onSubmit}>
        <img src={logo} alt="Amazing Vincit Logo" />
        <div className="illustration"></div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Käyttäjätunnus"
            onChange={() => e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <Link
            to={{
              pathname: "/game",
              state: {
                name: userName
              }
            }}
          >
            <button className="btn btn-primary btn-block" type="submit">
              Pelaa
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
