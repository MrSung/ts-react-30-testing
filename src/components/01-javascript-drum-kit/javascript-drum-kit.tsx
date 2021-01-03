import * as React from "react";
import "./style.css";

const keyArray = [
  { keyNumber: "65", keyAlphabet: "A", keySoundName: "clap" },
  { keyNumber: "83", keyAlphabet: "S", keySoundName: "hihat" },
  { keyNumber: "68", keyAlphabet: "D", keySoundName: "kick" },
  { keyNumber: "70", keyAlphabet: "F", keySoundName: "openhat" },
  { keyNumber: "71", keyAlphabet: "G", keySoundName: "boom" },
  { keyNumber: "72", keyAlphabet: "H", keySoundName: "ride" },
  { keyNumber: "74", keyAlphabet: "J", keySoundName: "snare" },
  { keyNumber: "75", keyAlphabet: "K", keySoundName: "tom" },
  { keyNumber: "76", keyAlphabet: "L", keySoundName: "tink" },
];

export const JavaScriptDrumKit: React.FC = () => {
  const keysWrapperRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.currentTarget.classList.add("playing");
  };
  const handleKeyDown = (ev: any) => {
    const keyCode = String(ev.keyCode);
    if (!keyArray.map(({ keyNumber }) => keyNumber).includes(keyCode)) {
      return;
    }

    const key = keysWrapperRef.current.querySelector(
      `div[data-key="${keyCode}"]`,
    );
    key.classList.add("playing");
  };
  const handleTransitionEnd = (ev: React.TransitionEvent<HTMLDivElement>) => {
    if (ev.propertyName !== "transform") return;

    ev.currentTarget.classList.remove("playing");
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="keys" ref={keysWrapperRef}>
      {keyArray.map(({ keyNumber, keyAlphabet, keySoundName }) => (
        <div
          data-key={keyNumber}
          className="key"
          key={keyNumber}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onTransitionEnd={handleTransitionEnd}
        >
          <kbd>{keyAlphabet}</kbd>
          <span className="sound">{keySoundName}</span>
        </div>
      ))}
    </div>
  );
};
