import React from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";
import { pickmeThemes } from ".";

interface Props {
  theme: number;
  value: string;
}

export const PickmeTheme: React.FC<Props> = (props) => {
  const theme = pickmeThemes.find(item => item.id === props.theme)
  return (
    <SVG viewBox="0 0 1920 1080" >
      {theme && <Image
        x="0"
        y="0"
        width="1920"
        height="1080"
        href={theme?.file}
      ></Image>    }
       <Text x="50%" y="50%">
        {props.value}
      </Text></SVG>
  );
};


const SVG = styled("svg")({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 99,
  transition: "opacity 0.25s ease-in-out",
})

const Text = styled("text")({
  fill: Colors.white,
  fontSize: "10rem",
  textAnchor: "middle",
  dominantBaseline: "middle"
})

const Image = styled("image")({});
