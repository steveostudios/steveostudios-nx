import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import {Colors} from "@nx/style";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ContextMenuItemProps {
  icon: IconProp;
  label: string;
  onClick: () => void;
}

export interface ContextMenuProps {
  x: number;
  y: number;
  close?: () => void;
  items: ContextMenuItemProps[];
}

export const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const onClose = () => {
    if (props.close) props.close();
  };

  return (
    <Wrapper onClick={onClose}>
      <Container x={props.x} y={props.y} >
        <UL>{props.items.map((item, i) => <li key={i} onClick={item.onClick}><FontAwesomeIcon icon={item.icon} />{item.label}</li>)}</UL>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  height: "100%",
  left: 0,
  width: "100%",
  zIndex: 100,
  backgroundColor: "rgba(0,0,0,0.15)",
});

const Container = styled("div")({
  position: "absolute",
  minWidth: "14rem",
  minHeight: "3rem",
  borderRadius: "0.5rem",
  backgroundColor: Colors.gray9,
  boxShadow: "0 0 1rem rgba(0,0,0, 0.5)",
  flex: 1,
  overflow: "hidden"
}, (props: {x: number, y: number}) => {
  return {
    left: props.x + 4 + "px",
    top: props.y - 12 + "px",
  };
})

const UL = styled("ul")({
  listStyle: "none",
  width: "100%",
  margin: 0,
  padding: 0,
  flexDirection: "column",
  flex: 1,
  boxSizing: "border-box",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: Colors.gray9,
  li: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: Colors.gray9,
    minHeight: "2rem",
    margin: 0,
    fontSize: "1.5rem",
    cursor: "default",
    svg: {
      marginRight: "1rem",
      fontSize: "1.25rem"
    }
  },
  "li:nth-of-type(even)": {
    backgroundColor: Colors.gray8,
  },
  "li.selected": {
    backgroundColor: Colors.blue
  } 
}, (props: {hideBorder?: boolean}) => {
  if (props.hideBorder) {
    return {
      border: "none",
    }
  }
  return {};
})
