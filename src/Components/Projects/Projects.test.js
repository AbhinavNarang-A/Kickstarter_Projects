import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Projects from "./Projects";
import useFetch from "../../Hooks/usefetch";

jest.mock("../../Hooks/usefetch");

describe("Projects Component", () => {
  const mockData = [
    { "s.no": 1, "percentage.funded": 75, "amt.pledged": 10000 },
    { "s.no": 2, "percentage.funded": 50, "amt.pledged": 5000 },
    { "s.no": 3, "percentage.funded": 120, "amt.pledged": 15000 },
    { "s.no": 4, "percentage.funded": 90, "amt.pledged": 9000 },
    { "s.no": 5, "percentage.funded": 200, "amt.pledged": 20000 },
    { "s.no": 6, "percentage.funded": 30, "amt.pledged": 3000 },
  ];

  it("renders loading spinner while fetching data", () => {
    useFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(<Projects />);

    expect(screen.getByText(/Loading projects.../i)).toBeInTheDocument();
  });

  it("displays error message when fetch fails", () => {
    useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: "Network error",
    });

    render(<Projects />);

    expect(screen.getByText(/Error fetching data:/i)).toBeInTheDocument();
    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
  });

  it("displays no data message when no projects are available", () => {
    useFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(<Projects />);

    expect(
      screen.getByText(/No projects available at the moment./i)
    ).toBeInTheDocument();
  });

  it("renders projects table and pagination correctly", () => {
    useFetch.mockReturnValue({ data: mockData, loading: false, error: null });

    render(<Projects />);

    expect(screen.getByText("75")).toBeInTheDocument();
    expect(screen.getByText("10000")).toBeInTheDocument();

    expect(screen.getByLabelText(/Rows per page:/i)).toBeInTheDocument();
  });

  it("updates rows per page when changed", () => {
    useFetch.mockReturnValue({ data: mockData, loading: false, error: null });

    render(<Projects />);

    const rowsPerPageSelect = screen.getByLabelText(/Rows per page:/i);
    fireEvent.change(rowsPerPageSelect, { target: { value: "10" } });

    expect(rowsPerPageSelect.value).toBe("10");
  });

  it("navigates to the next page", () => {
    useFetch.mockReturnValue({ data: mockData, loading: false, error: null });

    render(<Projects />);

    const nextPageButton = screen.getByText(/Next/i);
    fireEvent.click(nextPageButton);

    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("sorts the table correctly when a column header is clicked", () => {
    useFetch.mockReturnValue({ data: mockData, loading: false, error: null });

    render(<Projects />);

    const fundedHeader = screen.getByText(/Percentage Funded/i);
    fireEvent.click(fundedHeader);

    expect(screen.getAllByRole("row")[1].textContent).toContain("30");

    fireEvent.click(fundedHeader);
    expect(screen.getAllByRole("row")[1].textContent).toContain("200");
  });
});
