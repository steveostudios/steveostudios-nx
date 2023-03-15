import React, { useEffect, useState } from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";
import { BoxesFile, BoxesItem, boxesLayouts, boxesThemes, GameState, NextWinnerType, PickmeFile, pickmeThemes, wheelThemes } from "@nx/shared-assets";

interface Props {
  file: BoxesFile;
}

export const Boxes: React.FC<Props> = (props) => {
const {file} = props;
  const [value, setValue] = useState<BoxesItem | null>();


  const theme = boxesThemes.find(item => item.id === file.theme)
  const layout = boxesLayouts[Object.entries(file.items).filter(([id, item]) => item.visible).length]

  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (file) {
      
      if (file?.gameState === GameState.ADDMORE) setValue(null)
      if (file?.gameState === GameState.READY) setValue(null)
      if (file?.gameState === GameState.SPINNING) {

        timer = setInterval(() => {
          setCounter(prevCount => prevCount + 1);
          setValue(Object.entries(file.items)[counter % Object.entries(file.items).length][1])
        }, 200);
      }
      if (file?.gameState === GameState.WINNER) {
        setCounter(0)
        clearInterval(timer)
        if (file.nextWinnerType === NextWinnerType.PRESELECTED) {
          setValue(file.items[file.nextPreselectedId || ''])
        } else {
          setValue(file.items[file.nextRandomId ||''])
        }
      }
      return () => clearInterval(timer);
    }
  }, [file?.gameState, counter])

  return (
    <SVG viewBox="0 0 1920 1080" >
      {Object.entries(file.items).filter(([id, item]) => item.visible).sort((a: [string, BoxesItem], b: [string, BoxesItem]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0).map(([id, item], i) =>
        <svg x={layout[i].x * 1920 } y={layout[i].y * 1080} width={layout[i].w * 1920} height={layout[i].h * 1080} >
          <Rect fill={`#${theme?.colors[item.color - 1]}`} strokeWidth="-4" stroke={value?.id === id ? "yellow": "transparent"}/>
          <Text x="50%" y="50%" width="100%">{item.name}</Text>
        </svg>
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
  width: "calc(100% - 20px)",
  height: "calc(100% - 20px)"
})
