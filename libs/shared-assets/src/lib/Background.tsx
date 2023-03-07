import React from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";
import { backgrounds } from "./backgrounds" 

interface Props {
  value: number
}

export const Background: React.FC<Props> = (props) => {
  const background = backgrounds.find(item => item.id === props.value)
  return (
    <SVG viewBox="0 0 1920 1080" >
      <Image
        x="0"
        y="0"
        width="1920"
        height="1080"
        href={background?.thumb}
      ></Image> 
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
const Image = styled("image")({});