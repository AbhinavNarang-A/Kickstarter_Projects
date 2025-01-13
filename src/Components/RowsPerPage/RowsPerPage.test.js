import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RowsPerPageSelect from "./RowsPerPage";

describe("RowsPerPageSelect Component", () => {
  test("renders rows per page label and dropdown", () => {
    const value = 10;
    const onChange = jest.fn();

    render(<RowsPerPageSelect value={value} onChange={onChange} />);

    expect(screen.getByLabelText(/rows per page:/i)).toBeInTheDocument();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(value.toString());

    fireEvent.change(select, { target: { value: "15" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object)); // Ensure it's called with an event
  });
});
