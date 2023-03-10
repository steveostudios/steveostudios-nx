import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {Colors} from "@nx/style"
import { Background, Instructions, Title, Builders, File, Modes, UserSettings, PickmeTheme, NoFileSelected, GameState, Item, NextWinnerType } from "@nx/shared-assets";
import { onGetFile, onGetUserSettings} from "@nx/firebase";
import { useParams } from "react-router-dom";

export const Player: React.FC = () => {
  const [file, setFile] = useState<File | null>();
  const { userId } = useParams();
  const [userSettings, setUserSettings] = useState<UserSettings>({  
    titleGraphic: false,
    sounds: true,
    instructions: false,
    selectedMode: Modes.EDIT,
    selectedFileId: null
  })
  const [value, setValue] = useState<string>("");
  
  useEffect(() => {
    if (userId) onGetUserSettings(userId, (data) => setUserSettings({...data}))
   }, [userId])

  useEffect(() => {
    if (userSettings.selectedFileId) {
      onGetFile(userSettings.selectedFileId, setFile)
    } else { 
      setFile(null)
    }
  }, [userSettings.selectedFileId])

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
    <Container>
      {file && userSettings?.selectedFileId ? <>
        <Background value={file.background} />
        <PickmeTheme value={value} theme={file.theme} isWinning={file.gameState === GameState.WINNER}/>
        <Instructions active={!!userSettings?.instructions} value={file.instructionsContent} showBackground/>
        <Title active={!!userSettings?.titleGraphic} value={file.name} builder={Builders.PICKME}/>
      </> :
      <NoFileSelected />}
    </Container>
  )
};

const Container = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100vh",
  backgroundColor: Colors.black,
})

