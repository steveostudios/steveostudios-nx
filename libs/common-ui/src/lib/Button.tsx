import React, { MouseEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
  slug: string;
  color?: ButtonColor;
  onClick: (event: MouseEvent) => void;
  href?: string;
  disabled?: boolean;
  stopPropagation?: boolean;
  name?: string;
  icon?: IconProp;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const onClick = (event: MouseEvent) => {
    if (props.stopPropagation) {
      event.stopPropagation();
    }
    event.preventDefault();
    if (props.disabled) return false;
    props.onClick(event);
    return;
  };

  return (
    <ButtonElement
      color={props.color}
      onClick={onClick}
      disabled={props.disabled}
    >
      {props.icon && <FontAwesomeIcon icon={props.icon} />}
      {props.name && <span>{props.name}</span>}
    </ButtonElement>
  );
};

export enum ButtonColor {
  ORANGE = "orange",
  DANGER = "danger",
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
}

const ButtonElement = styled("button")(
  (props: { color?: ButtonColor; disabled?: boolean }) => ({
    height: "4rem",
    padding: "0 1rem",
    minWidth: "4rem",
    borderRadius: "0.5rem",
    gap: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: props.color ? Colors[props.color] : "transparent",
    border: props.color ? "none" : `1px solid ${Colors.trim}`,
    color: props.color ? Colors.white : Colors.darkGrey,
    opacity: props.disabled ? 0.3 : 0.9,
    "&:hover": {
      opacity: props.disabled ? 0.3 : 1,
    },
  })
);
