import React from "react";

//Player has zero points, losing "alert" appears
const LossMessage = () => {
  return (
    <div className="alert alert-danger">
      <strong>HÄVISIT</strong> Haluatko pelata uudelleen?
    </div>
  );
};

export default LossMessage;
