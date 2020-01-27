import React, { useState } from "react";
import "../../styles/counter.css";
import logo from "../../assets/vincit_logo_red.jpg";
import { Link } from "react-router-dom";

const Counter = ({counter}) => {

  return (
    <label class="counter">
      {counter}
    </label>
  );
};

export default Counter;
