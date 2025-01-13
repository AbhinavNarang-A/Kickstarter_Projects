import React from "react";

const RowsPerPageSelect = ({ value, onChange }) => (
  <div className="rows-per-page-container">
    <label htmlFor="rows-per-page">Rows per page:</label>
    <select
      id="rows-per-page"
      value={value}
      onChange={onChange}
      className="rows-per-page-select"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  </div>
);

export default RowsPerPageSelect;
