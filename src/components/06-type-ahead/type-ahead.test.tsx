import * as React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { TypeAhead } from "./type-ahead";

describe("06-type-ahead", () => {
  test("renders a search box with a placeholder City or State and ", () => {
    render(<TypeAhead />);

    const searchBox = screen.getByPlaceholderText(/city or state/i);
    expect(searchBox).toBeDefined();
  });

  test("renders initial text list", () => {
    render(<TypeAhead />);

    const initialListText1 = screen.getByText(/filter for a city/i);
    expect(initialListText1).toBeDefined();

    const initialListText2 = screen.getByText(/or a state/i);
    expect(initialListText2).toBeDefined();
  });
});
