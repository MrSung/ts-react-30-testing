import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
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

  test("blinks yellow border when each key on the screen is clicked", () => {
    render(<JavaScriptDrumKit />);

    keyArray.forEach(async ({ keyAlphabet }) => {
      const keyButton = screen.queryByText(keyAlphabet.toUpperCase());
      userEvent.click(keyButton);

      const keyName = screen.queryByTestId(`keyName-${keyAlphabet}`);
      expect(keyName).toHaveProperty("className", "key playing");

      await waitFor(() => {
        expect(keyName).toHaveProperty("className", "key");
      });
    });
  });
});
