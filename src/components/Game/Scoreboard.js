import React from "react";
import PropTypes from "prop-types";
import "../../styles/scoreboard.css";

/**
 * Scoreboard which is shown to user
 * Props needed: A map (key = username, value = userpoints)
 */

const Scoreboard = props => {
  return (
    <table id="scoreboard" class="table striped">
      <thead>
        <tr class="header">
          <th>Team</th>
          <th>Score</th>
        </tr>
        {props.players.map(val => (
          <tr>
            <td>{val[0]}</td>
            <td>{val[1]}</td>
          </tr>
        ))}
      </thead>
      <tbody></tbody>
    </table>
  );
};

Scoreboard.prototype = {
  props: PropTypes.object
};

export default Scoreboard;
