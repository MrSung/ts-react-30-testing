import * as React from "react";
import styled from "styled-components";
import "./style.css";

let i = 0;
const checkboxTextMap: Map<number, string> = new Map([
  [i, "This is an inbox layout"],
  [i++, "Check one item"],
  [i++, "Hold down your Shift key"],
  [i++, "This is an inbox layout"],
  [i++, "Check a lower item"],
  [i++, "Everything in between should also be set to checked"],
  [i++, "Try do it without any libraries"],
  [i++, "Just regular JavaScript"],
  [i++, "Good Luck!"],
  [i++, "Don't forget to tweet your result!"],
]);

export const HoldShiftCheckboxes: React.FC = () => {
  const inboxRef = React.useRef<HTMLInputElement>(null);
  const [lastCheckedId, setLastCheckedId] = React.useState<number | null>(null);

  const handleClick = (
    ev: React.MouseEvent<HTMLInputElement>,
    currentId: number,
  ) => {
    ev.stopPropagation();
    let inBetween = false;
    const $currentCheckbox = inboxRef.current.querySelector<HTMLInputElement>(
      `#checkbox-${currentId}`,
    );
    if (ev.shiftKey && $currentCheckbox.checked) {
      [...checkboxTextMap].forEach(([id]) => {
        if (Number(id) === currentId || Number(id) === lastCheckedId) {
          inBetween = !inBetween;
        }
        if (inBetween) {
          inboxRef.current.querySelector<HTMLInputElement>(
            `#checkbox-${id}`,
          ).checked = true;
        }
      });
    }
    setLastCheckedId(currentId);
  };

  return (
    <Inbox ref={inboxRef}>
      {[...checkboxTextMap].map(([id, text]) => (
        <CheckboxWrap key={id}>
          <CheckboxInput
            type="checkbox"
            name={`checkbox-${id}`}
            id={`checkbox-${id}`}
            data-testid={`checkbox-${id}`}
            onClick={(ev) => handleClick(ev, id)}
          />
          <CheckboxLabelText data-testid={`label-${id}`}>
            {text}
          </CheckboxLabelText>
        </CheckboxWrap>
      ))}
    </Inbox>
  );
};

const Inbox = styled.div`
  max-width: 400px;
  margin: 50px auto;
  background: white;
  border-radius: 5px;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
`;

const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f1f1f1;
  }
`;

const CheckboxInput = styled.input`
  width: 44px;
  height: 44px;
  margin: 20px;
`;

const CheckboxLabelText = styled.p`
  margin: 0;
  padding: 20px;
  transition: background-color 0.2s;
  flex: 1;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
  border-left: 1px solid #d1e2ff;

  &::selection {
    display: none;
  }

  ${CheckboxInput}:checked + & {
    background-color: #f9f9f9;
    text-decoration: line-through;
  }
`;
