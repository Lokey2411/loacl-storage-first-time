import React from "react";
import Button from "@atlaskit/button";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left !important;
  &,
  &:hover {
    ${(p) =>
      p.isCompleted &&
      css`
        text-decoration: line-through;
      `}
  }
  &:hover {
    .check-icon {
      display: flex;
    }
  }
  .check-icon {
    display: none;
    padding: 1px;
    &:hover {
      background: #e2e2e2;
      border-radius: 3px;
    }
  }
`;

export default function Todo({ todo, onCheckButtonClick }) {
  return (
    <ButtonStyled
      isCompleted={todo.isCompleted}
      iconAfter={
        !todo.isCompleted && (
          <span
            className="check-icon"
            onClick={() => onCheckButtonClick(todo.id)}
          >
            <CheckIcon primaryColor="#4fff4f" />
          </span>
        )
      }
      shouldFitContainer
    >
      {todo.name}
    </ButtonStyled>
  );
}
