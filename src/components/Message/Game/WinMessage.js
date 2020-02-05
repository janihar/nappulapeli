import React from "react";
import PropTypes from "prop-types";

//Player has won, a winning "alert" appears
const WinMessage = ({ winpoints, onClick }) => {
  return (
    <div className="alert alert-success">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClick}
      >
        &times;
      </button>
      <strong>VOITTO!</strong> VOITIT {winpoints} pistettä
    </div>
  );
};

WinMessage.propTypes = {
  winpoints: PropTypes.number,
  onClick: PropTypes.func
};

export default WinMessage;
