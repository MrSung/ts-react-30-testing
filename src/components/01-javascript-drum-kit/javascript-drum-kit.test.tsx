import * as React from "react";
import { render, screen } from "@testing-library/react";
import { JavaScriptDrumKit, keyArray } from "./javascript-drum-kit";

describe("01-javascript-drum-kit", () => {
  test("renders a series of key name elements", () => {
    render(<JavaScriptDrumKit />);
    keyArray.forEach(({ keyAlphabet }) => {
      const text = screen.getByText(keyAlphabet.toUpperCase());
      expect(text).toBeDefined();
    });
  });

  test("renders a series of key sound elements", () => {
    render(<JavaScriptDrumKit />);
    keyArray.forEach(({ keySoundName }) => {
      const text = screen.getByText(new RegExp(keySoundName, "i"));
      expect(text).toBeDefined();
    });
  });
});
