import React from "react";
import "../../styles/counter.css";
import PropTypes from "prop-types";

/**
 * Counter presents player points
 * @param {counter} counter integer
 */
const Counter = ({ counter }) => {
  return <label className="counter">{counter}</label>;
};

Counter.propTypes = {
  counter: PropTypes.number
};

export default Counter;
