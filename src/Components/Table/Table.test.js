import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";

describe("Table Component", () => {
  const mockProjects = [
    { "s.no": 1, "percentage.funded": "75%", "amt.pledged": "$10,000" },
    { "s.no": 2, "percentage.funded": "50%", "amt.pledged": "$5,000" },
    { "s.no": 3, "percentage.funded": "120%", "amt.pledged": "$15,000" },
  ];

  const mockOnSort = jest.fn();
  const mockSortConfig = { key: "s.no", direction: "asc" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table with the correct headers", () => {
    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={mockSortConfig}
      />
    );
    expect(screen.getByText("S.No")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });

  it("renders the correct number of rows", () => {
    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={mockSortConfig}
      />
    );
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockProjects.length + 1); // +1 for header row
  });

  it("renders project data correctly", () => {
    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={mockSortConfig}
      />
    );
    mockProjects.forEach((project) => {
      expect(screen.getByText(project["s.no"])).toBeInTheDocument();
      expect(
        screen.getByText(project["percentage.funded"])
      ).toBeInTheDocument();
      expect(screen.getByText(project["amt.pledged"])).toBeInTheDocument();
    });
  });

  it("displays the correct sort arrow based on the sortConfig", () => {
    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={{ key: "s.no", direction: "asc" }}
      />
    );
    expect(screen.getByText("⬆")).toBeInTheDocument(); // Ascending sort arrow for "s.no"

    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={{ key: "percentage.funded", direction: "desc" }}
      />
    );
    expect(screen.getByText("⬇")).toBeInTheDocument(); // Descending sort arrow for "percentage.funded"
  });

  it("calls onSort with the correct column key when a header is clicked", () => {
    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={mockSortConfig}
      />
    );

    const percentageFundedHeader = screen.getByText("Percentage Funded");
    fireEvent.click(percentageFundedHeader);
    expect(mockOnSort).toHaveBeenCalledWith("percentage.funded");

    const amountPledgedHeader = screen.getByText("Amount Pledged");
    fireEvent.click(amountPledgedHeader);
    expect(mockOnSort).toHaveBeenCalledWith("amt.pledged");
  });

  it("renders the table with accessibility features", () => {
    render(
      <Table
        projects={mockProjects}
        onSort={mockOnSort}
        sortConfig={mockSortConfig}
      />
    );
    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("aria-describedby", "table-caption");
    expect(
      screen.getByText("List of Kickstarter Projects")
    ).toBeInTheDocument();
  });
});
