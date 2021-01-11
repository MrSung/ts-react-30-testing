import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "jest-styled-components";
import { HoldShiftCheckboxes } from "./hold-shift-checkboxes";

test("renders a list of certain texts", () => {
  render(<HoldShiftCheckboxes />);

  screen.getByText(/check one item/i);
  screen.getByText(/hold down your shift key/i);
  screen.getByText(/this is an inbox layout/i);
  screen.getByText(/check a lower item/i);
  screen.getByText(/everything in between should also be set to checked/i);
  screen.getByText(/try do it without any libraries/i);
  screen.getByText(/just regular javascript/i);
  screen.getByText(/good luck!/i);
  screen.getByText(/don't forget to tweet your result!/i);
});

test("toggle check mark when the same checkbox is clicked twice", () => {
  render(<HoldShiftCheckboxes />);

  const fourthCheckbox = screen.getByTestId("checkbox-3");

  userEvent.click(fourthCheckbox);
  expect(fourthCheckbox).toHaveProperty("checked", true);

  userEvent.click(fourthCheckbox);
  expect(fourthCheckbox).toHaveProperty("checked", false);
});

test("toggle line-through and highlight when the same checkbox is clicked twice", () => {
  render(<HoldShiftCheckboxes />);

  const fifthCheckbox = screen.getByTestId("checkbox-4");
  const fifthLabel = screen.getByTestId("label-4");

  userEvent.click(fifthCheckbox);
  expect(fifthCheckbox).toHaveProperty("checked", true);

  waitFor(() => {
    expect(fifthLabel).toHaveStyleRule("text-decoration", "line-through");
    expect(fifthLabel).toHaveStyleRule("background-color", "#f9f9f9");
  });

  userEvent.click(fifthCheckbox);
  expect(fifthCheckbox).toHaveProperty("checked", false);

  waitFor(() => {
    expect(fifthLabel).toHaveStyleRule("text-decoration", "");
    expect(fifthLabel).toHaveStyleRule("background-color", "");
  });
});

test("should check boxes in between when clicked with shift button", () => {
  render(<HoldShiftCheckboxes />);

  const fifthCheckbox = screen.getByTestId("checkbox-4");
  const sixthCheckbox = screen.getByTestId("checkbox-5");
  const seventhCheckbox = screen.getByTestId("checkbox-6");
  const fifthLabel = screen.getByTestId("label-4");
  const sixthLabel = screen.getByTestId("label-5");
  const seventhLabel = screen.getByTestId("label-6");

  userEvent.click(fifthCheckbox);
  expect(fifthCheckbox).toHaveProperty("checked", true);

  userEvent.click(seventhCheckbox, { shiftKey: true });
  expect(sixthCheckbox).toHaveProperty("checked", true);
  expect(seventhCheckbox).toHaveProperty("checked", true);

  waitFor(() => {
    expect(fifthLabel).toHaveStyleRule("text-decoration", "line-through");
    expect(fifthLabel).toHaveStyleRule("background-color", "#f9f9f9");
    expect(sixthLabel).toHaveStyleRule("text-decoration", "line-through");
    expect(sixthLabel).toHaveStyleRule("background-color", "#f9f9f9");
    expect(seventhLabel).toHaveStyleRule("text-decoration", "line-through");
    expect(seventhLabel).toHaveStyleRule("background-color", "#f9f9f9");
  });
});
