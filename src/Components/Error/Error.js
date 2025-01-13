import React from "react";

const Error = ({ message, onRetry }) => (
  <div className="error-container">
    <div className="error-icon"></div>
    <p>Error fetching data: {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default Error;
