import React from "react";

function Table({ projects, onSort, sortConfig }) {
  const getSortArrow = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <span className="sort-arrow up">⬆</span>
      ) : (
        <span className="sort-arrow down">⬇</span>
      );
    }
    return null;
  };

  return (
    <div
      className="table-container"
      role="region"
      aria-labelledby="table-caption"
    >
      <table className="table" aria-describedby="table-caption">
        <caption id="table-caption" className="table-caption">
          List of Kickstarter Projects
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              onClick={() => onSort("s.no")}
              style={{ cursor: "pointer" }}
            >
              S.No {getSortArrow("s.no")}
            </th>
            <th
              scope="col"
              onClick={() => onSort("percentage.funded")}
              style={{ cursor: "pointer" }}
            >
              Percentage Funded {getSortArrow("percentage.funded")}
            </th>
            <th
              scope="col"
              onClick={() => onSort("amt.pledged")}
              style={{ cursor: "pointer" }}
            >
              Amount Pledged {getSortArrow("amt.pledged")}
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project["s.no"]}</td>
              <td>{project["percentage.funded"]}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
