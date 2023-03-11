import React, { useEffect, useState } from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";
import { BoxesFile, BoxesItem, boxesSizes, boxesThemes, GameState, NextWinnerType, PickmeFile, pickmeThemes, wheelThemes } from "@nx/shared-assets";

interface Props {
  file: BoxesFile;
}

export const Boxes: React.FC<Props> = (props) => {
const {file} = props;

  const theme = boxesThemes.find(item => item.id === file.theme)
  const layout = boxesSizes[Object.entries(file.items).filter(([id, item]) => item.visible).length]

  return (
    <SVG viewBox="0 0 1920 1080" >
      {Object.entries(file.items).sort((a: [string, BoxesItem], b: [string, BoxesItem]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0).map(([id, item], i) =>
        <g>
          <Rect x={layout[i].x * 1920 } y={layout[i].y * 1080} width={layout[i].w * 1920} height={layout[i].h * 1080} fill={`#${theme?.colors[item.color + 1]}`} />
          <Text x={layout[i].x * 1920 } y={layout[i].y * 1080} width={layout[i].w * 1920} height={layout[i].h * 1080}>{item.name}</Text>
        </g>
      )}
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

const Text = styled("text")({
  fill: Colors.white,
  fontSize: "10rem",
  textAnchor: "middle",
  dominantBaseline: "middle"
})


const Rect = styled("rect")({
})
