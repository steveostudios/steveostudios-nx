import React, { useEffect, useState } from "react";
import styled from "@emotion/styled"
import {Colors} from "@nx/style";
import { GameState, NextWinnerType, PickmeFile, pickmeThemes } from "@nx/shared-assets";

interface Props {
  file: PickmeFile;
}

export const Pickme: React.FC<Props> = (props) => {
const {file} = props;
const [value, setValue] = useState<string>("");

  const theme = pickmeThemes.find(item => item.id === file.theme)
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (file) {
      
      if (file?.gameState === GameState.ADDMORE) setValue("Add More")
      if (file?.gameState === GameState.READY) setValue("Get Ready")
      if (file?.gameState === GameState.SPINNING) {

        timer = setInterval(() => {
          setCounter(prevCount => prevCount + 1);
          setValue(Object.entries(file.items)[counter % Object.entries(file.items).length][1].name)
        }, 100);
      }
      if (file?.gameState === GameState.WINNER) {
        setCounter(0)
        clearInterval(timer)
        if (file.nextWinnerType === NextWinnerType.PRESELECTED) {
          setValue(file.items[file.nextPreselectedId || ''].name)
        } else {
          setValue(file.items[file.nextRandomId ||''].name)
        }
      }
      return () => clearInterval(timer);
    }
  }, [file?.gameState, counter])

  return (
    <SVG viewBox="0 0 1920 1080" >
      {theme && <Image x="0" y="0" width="1920" height="1080" href={theme?.file} />}
      <Text x="50%" y="50%">{value}</Text>
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

const Image = styled("image")({});

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
