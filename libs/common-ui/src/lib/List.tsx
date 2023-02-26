import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import {Colors} from "@nx/style";

interface Props {
  children: ReactNode;
  hideBorder?: boolean;
}

export const List: React.FC<Props> = (props) => {
  return (
    <Container >
      <UL hideBorder={props.hideBorder}>{props.children}</UL>
    </Container>
  );
};

const Container = styled("div")({
  backgroundColor: Colors.gray10,
  flex: 1,
  height: "100%"
})

const UL = styled("ul")({
  listStyle: "none",
  width: "100%",
  margin: 0,
  padding: 0,
  flexDirection: "column",
  flex: 1,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: Colors.gray9,
  li: {
    backgroundColor: Colors.gray9,
    minHeight: "3rem",
    margin: 0,
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
      borderColor: "transparent",
    }
  }
  return {};
})
