import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JavaScriptDrumKit, keyArray } from "./javascript-drum-kit";

describe("01-javascript-drum-kit", () => {
  test("renders a series of key name elements", () => {
    render(<JavaScriptDrumKit />);

    keyArray.forEach(({ keyAlphabet }) => {
      const text = screen.queryByText(keyAlphabet.toUpperCase());
      expect(text).toBeDefined();
    });
  });

  test("renders a series of key sound elements", () => {
    render(<JavaScriptDrumKit />);

    keyArray.forEach(({ keySoundName }) => {
      const text = screen.queryByText(new RegExp(keySoundName, "i"));
      expect(text).toBeDefined();
    });
  });

  test("adds yellow border when a is clicked", () => {
    render(<JavaScriptDrumKit />);

    userEvent.click(screen.queryByText(keyArray[0].keyAlphabet.toUpperCase()));

    const keyNameA = screen.queryByTestId("keyName-a");
    expect(keyNameA).toHaveProperty("className", "key playing");
  });
});
