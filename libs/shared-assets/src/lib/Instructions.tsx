import React from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";

interface Props {
  active: boolean;
  value: string;
  showBackground?: boolean;
}

export const Instructions: React.FC<Props> = (props) => {
  return (
    <SVG viewBox="0 0 1920 1080" active={props.active}>
      <Background
        x="0"
        y="0"
        width="1920"
        height="1080"
        showBackground={props.showBackground}
      />
      <Text x="50%" y="50%">
        {props.value}
      </Text>
    </SVG>
  );
};


const SVG = styled("svg")({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 99,
  opacity: 0,
  transition: "opacity 0.25s ease-in-out",
}, (props: {active: boolean}) => {
  let options = {};
  if (props.active) {
      options = {...options, opacity: 1}
  }
  return options
})

const Text = styled("text")({
  fill: Colors.white,
  fontSize: "10rem",
  textAnchor: "middle",
  dominantBaseline: "middle"
})

const Background = styled("rect")({
  fill: "transparent"
}, (props: {showBackground?: boolean}) => {
  let options = {};
  if (props.showBackground) {
      options = {...options, fill: Colors.black75}
  }
  return options
})
