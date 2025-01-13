import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NoProjects from "./NoProjects";

describe("NoProjects Component", () => {
  test("renders no projects message and reload button", () => {
    const onReload = jest.fn();

    render(<NoProjects onReload={onReload} />);

    expect(
      screen.getByText("No projects available at the moment.")
    ).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /reload/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onReload).toHaveBeenCalledTimes(1);
  });
});
