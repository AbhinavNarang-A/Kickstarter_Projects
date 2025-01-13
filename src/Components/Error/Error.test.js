import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Error from "./Error";

describe("Error Component", () => {
  test("renders error message and retry button", () => {
    const errorMessage = "Failed to load data.";
    const onRetry = jest.fn();

    render(<Error message={errorMessage} onRetry={onRetry} />);

    expect(
      screen.getByText(`Error fetching data: ${errorMessage}`)
    ).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /retry/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
