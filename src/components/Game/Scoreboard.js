import React from "react";
import PropTypes from "prop-types";

import "../../styles/scoreboard.css";

/**
 * Scoreboard which is shown to user
 * Props needed: A map (key = username, value = userpoints)
 */

const Scoreboard = props => {
  return (
    <table id="scoreboard" className="table striped">
      <thead>
        <tr className="header">
          <th>Käyttäjätunnus</th>
          <th>Pisteet</th>
        </tr>
        {props.players.map(val => (
          <tr key={val[0]}>
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
