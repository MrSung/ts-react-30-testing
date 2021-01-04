import * as React from "react";
import "./style.css";

export const keyArray = [
  { keyAlphabet: "a", keySoundName: "clap" },
  { keyAlphabet: "s", keySoundName: "hihat" },
  { keyAlphabet: "d", keySoundName: "kick" },
  { keyAlphabet: "f", keySoundName: "openhat" },
  { keyAlphabet: "g", keySoundName: "boom" },
  { keyAlphabet: "h", keySoundName: "ride" },
  { keyAlphabet: "j", keySoundName: "snare" },
  { keyAlphabet: "k", keySoundName: "tom" },
  { keyAlphabet: "l", keySoundName: "tink" },
];

export const JavaScriptDrumKit: React.FC = () => {
  const keysWrapperRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.currentTarget.classList.add("playing");
  };
  const handleKeyDown = (ev: KeyboardEventInit) => {
    const keyName = String(ev.key);

    if (!keyArray.map(({ keyAlphabet }) => keyAlphabet).includes(keyName)) {
      return;
    }

    const key = keysWrapperRef.current.querySelector(
      `div[data-key="${keyName}"]`,
    );
    key.classList.add("playing");
  };
  const handleTransitionEnd = (ev: React.TransitionEvent<HTMLDivElement>) => {
    if (ev.propertyName !== "transform") return;

    ev.currentTarget.classList.remove("playing");
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="keys" ref={keysWrapperRef}>
      {keyArray.map(({ keyAlphabet, keySoundName }) => (
        <div
          data-key={keyAlphabet}
          className="key"
          key={keyAlphabet}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onTransitionEnd={handleTransitionEnd}
        >
          <kbd>{keyAlphabet.toUpperCase()}</kbd>
          <span className="sound">{keySoundName}</span>
        </div>
      ))}
    </div>
  );
};
