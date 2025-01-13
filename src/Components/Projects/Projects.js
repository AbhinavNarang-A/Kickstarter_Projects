import React, { useState } from "react";
import useFetch from "../../Hooks/usefetch";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import NoProjects from "../NoProject/NoProjects";
import RowsPerPageSelect from "../RowsPerPage/RowsPerPage";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

function Projects() {
  const { data, loading, error } = useFetch(API_URL);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: "s.no",
    direction: "asc",
  });

  const projects = Array.isArray(data) ? data : [];
  const totalRecords = projects.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRecordsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "s.no") {
      aValue = projects.indexOf(a) + 1;
      bValue = projects.indexOf(b) + 1;
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const currentRecords = sortedProjects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={() => window.location.reload()} />;
  }

  if (projects.length === 0) {
    return <NoProjects onReload={() => window.location.reload()} />;
  }

  return (
    <div>
      <Table
        projects={currentRecords}
        startIndex={(currentPage - 1) * recordsPerPage}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      <div className="rows-per-page-layout">
        <RowsPerPageSelect
          value={recordsPerPage}
          onChange={handleRowsPerPageChange}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Projects;
