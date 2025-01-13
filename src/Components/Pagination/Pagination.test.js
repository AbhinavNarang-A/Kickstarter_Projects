import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render pagination if totalPages is 1 or less", () => {
    render(
      <Pagination
        totalPages={1}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );
    const pagination = screen.queryByRole("navigation", {
      name: /Pagination Navigation/i,
    });
    expect(pagination).not.toBeInTheDocument();
  });

  it("renders the correct number of visible page buttons", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(11);
  });

  it("renders the Previous button when currentPage > 1", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />
    );
    const prevButton = screen.queryByText(/Previous/i);
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeEnabled();
  });

  it("does not render the Previous button on the first page", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );
    const prevButton = screen.queryByText(/Previous/i);
    expect(prevButton).not.toBeInTheDocument();
  });

  it("renders the Next button when currentPage < totalPages", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={9}
        onPageChange={onPageChangeMock}
      />
    );
    const nextButton = screen.queryByText(/Next/i);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeEnabled();
  });

  it("does not render the Next button on the last page", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={10}
        onPageChange={onPageChangeMock}
      />
    );
    const nextButton = screen.queryByText(/Next/i);
    expect(nextButton).not.toBeInTheDocument();
  });

  it("calls onPageChange with the correct page number when a page button is clicked", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
      />
    );
    const pageButton = screen.getByText("5");
    fireEvent.click(pageButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(5);
  });

  it("calls onPageChange with the previous page number when Previous is clicked", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />
    );
    const prevButton = screen.getByText(/Previous/i);
    fireEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange with the next page number when Next is clicked", () => {
    render(
      <Pagination
        totalPages={10}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />
    );
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("limits the number of visible pages to maxVisiblePages", () => {
    render(
      <Pagination
        totalPages={20}
        currentPage={10}
        onPageChange={onPageChangeMock}
      />
    );
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons.length).toBeLessThanOrEqual(12);
  });

  it("adjusts visible pages correctly when near the beginning", () => {
    render(
      <Pagination
        totalPages={20}
        currentPage={2}
        onPageChange={onPageChangeMock}
      />
    );
    const pageButtons = screen.getAllByRole("button");
    const pageNumbers = pageButtons
      .map((button) => button.textContent)
      .filter((text) => /^\d+$/.test(text));
    expect(pageNumbers).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ]);
  });

  it("adjusts visible pages correctly when near the end", () => {
    render(
      <Pagination
        totalPages={20}
        currentPage={19}
        onPageChange={onPageChangeMock}
      />
    );
    const pageButtons = screen.getAllByRole("button");
    const pageNumbers = pageButtons
      .map((button) => button.textContent)
      .filter((text) => /^\d+$/.test(text));
    expect(pageNumbers).toEqual([
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
    ]);
  });
});
