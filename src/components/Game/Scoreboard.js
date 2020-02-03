import React from "react";

const Scoreboard = props => {
  console.log(props);
  return (
    <table>
        <tr>
            <th>Nimi</th>
            <th>Pisteet</th>
        </tr>
      <tr>
        {props.players.forEach(function(value, key) {
          return value.map(val => {return <td>dbabab</td>});
        })}
      </tr>
    </table>
  );
};

export default Scoreboard;
