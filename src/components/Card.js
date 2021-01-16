import React, { Component } from "react";

const Card = (props) => {
  return (
    <div className="card">
      Description: {props.description}
      <br />
      Amount: {props.amount}
      <br />
      Date: {props.date}
      <br />
    </div>
  );
};

export default Card;
