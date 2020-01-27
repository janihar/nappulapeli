import React from "react";
import LoginSection from "../../components/Login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/styles.css";
import "../../styles/styles.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Koodarijahti_tunnus.svg";

const LoginPage = () => {
  return (
    <div className="body">
      <img src={logo} alt="Coding Duck" />
      <LoginSection />
    </div>
  );
};

export default LoginPage;
