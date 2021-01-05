import * as React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { TypeAhead } from "./type-ahead";

describe("06-type-ahead", () => {
  test("renders a search box with a placeholder City or State and ", () => {
    render(<TypeAhead />);

    const searchBox = screen.getByPlaceholderText("City or State");
    expect(searchBox).toBeDefined();
  });
});
