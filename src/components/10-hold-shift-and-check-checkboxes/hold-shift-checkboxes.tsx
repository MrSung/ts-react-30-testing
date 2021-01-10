import * as React from "react";
import styled from "styled-components";
import "./style.css";

let i = 0;
const checkboxTextMap: Map<number, string> = new Map([
  [i++, "This is an inbox layout"],
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
  return (
    <Inbox>
      {[...checkboxTextMap].map(([id, text]) => (
        <Item key={id}>
          <CheckboxInput
            type="checkbox"
            name={`checkbox-${id}`}
            id={`checkbox-${id}`}
          />
          <CheckboxLabel htmlFor={`checkbox-${id}`}>{text}</CheckboxLabel>
        </Item>
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

const Item = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f1f1f1;
  }
`;

const CheckboxInput = styled.input`
  margin: 20px;
`;

const CheckboxLabel = styled.label`
  margin: 0;
  padding: 20px;
  transition: background 0.2s;
  flex: 1;
  font-family: "helvetica neue";
  font-size: 20px;
  font-weight: 200;
  border-left: 1px solid #d1e2ff;

  &::selection {
    display: none;
  }

  /* background: #f9f9f9;
  text-decoration: line-through; */
`;
