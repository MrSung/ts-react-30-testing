import * as React from "react";
import { hot } from "react-hot-loader";

// import { JavaScriptDrumKit } from "./01-javascript-drum-kit/javascript-drum-kit";
import { TypeAhead } from "./06-type-ahead/type-ahead";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        {/* Add component here */}
        <TypeAhead />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
