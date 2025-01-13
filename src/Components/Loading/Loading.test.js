import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  test("renders loading message and spinner", () => {
    render(<Loading />);
    expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  });
});
