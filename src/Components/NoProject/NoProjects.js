import React from "react";

const NoProjects = ({ onReload }) => (
  <div className="no-data-container">
    <div className="no-data-icon"></div>
    <p>No projects available at the moment.</p>
    <button onClick={onReload} className="reload-button">
      Reload
    </button>
  </div>
);

export default NoProjects;
