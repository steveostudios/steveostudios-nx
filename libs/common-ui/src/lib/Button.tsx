import React, {MouseEvent} from "react"
import {Colors} from "@nx/style";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  slug: string;
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  name?: string;
  skin?: Skin;
  icon?: IconProp;
}

export const Button: React.FC<Props> = (props) => {
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (props.disabled) return false;
    props.onClick();
    return;
  };

  return (
    <Container>
      {props.label ? <label htmlFor={props.slug}>{props.label}</label> : null}
      <ButtonElement onClick={onClick} skin={props.skin} disabled={props.disabled}>
        {props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
        {props.name ? <span>{props.name}</span> : null}
      </ButtonElement>
    </Container>
  );
};

const Container = styled("div")({

})

export enum Skin {
  clear = "CLEAR",
  border = "BORDER",
  primary= "PRIMARY",
  secondary = "SECONDARY"
}

const backgroundColor = {
  CLEAR: "transparent",
  BORDER: "transparent",
  PRIMARY: Colors.red,
  SECONDARY: Colors.blue,
};

const borderColor = {
  CLEAR: "transparent",
  BORDER: Colors.gray8,
  PRIMARY: Colors.red,
  SECONDARY: Colors.blue,
};

const ButtonElement = styled("button")({
  height: "4rem",
  minWidth: "4rem",
  color: Colors.white,
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: "0.5rem",
  gap: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.gray9,
  borderColor: Colors.gray8,
  opacity: 0.9,
  "&:hover": {
    opacity: 1
  },
},
(props: { skin?: Skin, disabled?: boolean }) => {
  if (props.skin) {
    return {
      backgroundColor: backgroundColor[props.skin] || Colors.gray9,
      borderColor: borderColor[props.skin] || Colors.gray8
    }
  }
  if (props.disabled) {
    return {
      opacity: 0.3,
      "&:hover": {
        opacity: 0.3
      }
    }
  }

  return {};
})
