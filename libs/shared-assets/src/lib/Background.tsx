import React from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";

interface Props {
  value: number
}

export const Background: React.FC<Props> = (props) => {
    console.log(props.value)
  return (
    <SVG viewBox="0 0 1920 1080" >

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
  opacity: 1,
  fill: Colors.blue
})
