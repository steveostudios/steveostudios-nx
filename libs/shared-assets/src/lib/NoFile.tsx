import React from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";

export const NoFileSelected: React.FC = () => {
  return (
    <SVG viewBox="0 0 1920 1080">
      <Text x="50%" y="50%">
        No File Selected
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
})

const Text = styled("text")({
  fill: Colors.white,
  fontSize: "10rem",
  textAnchor: "middle",
  dominantBaseline: "middle"
})
