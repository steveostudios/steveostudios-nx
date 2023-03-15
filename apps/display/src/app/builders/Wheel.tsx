import React, { useEffect, useState } from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";
import { GameState, NextWinnerType, WheelFile, WheelItem, WheelPosition, wheelPositions, WheelTheme, wheelThemes } from "@nx/shared-assets";

interface Props {
  file: WheelFile;
}

export const Wheel: React.FC<Props> = (props) => {
const {file} = props;

  const theme: WheelTheme | undefined = wheelThemes.find(item => item.id === file.theme);
  const position: WheelPosition | undefined = wheelPositions.find(item => item.id === file.position);

  return (
    <SVG viewBox="0 0 1920 1080" >
       <svg viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={49.5}
            fill="#000"
            fillOpacity="0.05"
          />
          <circle
            cx="50"
            cy="50"
            r={49}
            fill="#fff"
          />
          <g className={`items`}>  
            {Object.entries(file.items)
              .filter(([id, item]) => item.visible)
              .sort((a: [string, WheelItem], b: [string, WheelItem]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0)
              .map(([id, item]) => <Item {...item} colorHex={theme && theme.colors[ item.color] || "red"} />)}
          </g>
          <path
            d="M100 45 L100 55 96.5 55 91.5 50 96.5 45 Z"
            fill="#000"
            fillOpacity="0.05"
          />
          <path
            d="M99 46 L99 54 97 54 93 50 97 46 Z"
            fill="#fff"
            strokeWidth="1"
            stroke="#eee"
          />
        </svg>
      {file.gameState === GameState.WINNER && <Rect x="0" y="0" width="1920" height="1080" />}
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
  transition: "opacity 0.25s ease-in-out",
})

const Rect = styled("rect")({
  fill: "none",
  strokeWidth: "4rem",
  stroke: "yellow",
  animation: "blink 0.5s",
  animationIterationCount: 3,
  animationTimingFunction: "step-end",
  "@keyframes blink":{ 
    "50%": { 
      opacity: 0
    }
  }
})


interface ItemProps extends WheelItem {
  colorHex: string;
}

const Item: React.FC<ItemProps> = (props) => {
  
  return(
    <g>
        <ItemCircle
          origin="50% 50%"
          cx="50"
          cy="50"
          r="24"
          strokeDasharray={
            props.percent * ((2 * Math.PI * 24) / 100) +
            " " +
            2 * Math.PI * 24
          }
          stroke={`#${props.colorHex}`}
          strokeWidth={48}
          fill="transparent"
          transform={`rotate(${props.startAngle} 50 50)`}
        />
        <rect
          className="bounds"
          x="60"
          y="45"
          width="35"
          height="10"
          stroke="red"
          strokeWidth="0"
          fill="transparent"
          transform={`rotate(${props.textAngle} 50 50)`}
        />
        <ItemText
          className="text"
          x="50"
          dx="45"
          y="50"
          fillOpacity={
            props.size
              ? 1
              : 0
          }
          transform={`rotate(${props.textAngle} 50 50)`}
        >
          {props.name}
        </ItemText>
    </g>
  )
}


const ItemCircle = styled("circle")({
  transition: "stroke-dasharray 0.5s ease-in-out, stroke-width 0.5s ease-in-out, transform 0.5s ease-in-out",
})

const ItemText = styled("text")({
  fill: "#fff",
  alignmentBaseline: "central",
  textAnchor: "end",
  transition: "fill-opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
})
