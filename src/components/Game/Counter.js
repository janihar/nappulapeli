import React from "react";
import PropTypes from "prop-types";

import "../../styles/counter.css";

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
