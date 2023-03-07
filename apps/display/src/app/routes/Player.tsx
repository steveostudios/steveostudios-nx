import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {Colors} from "@nx/style"
import { Background, Instructions, Title, Builders, File, Modes, UserSettings, PickmeTheme, NoFileSelected } from "@nx/shared-assets";
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


  return (
    <Container>
      {file && userSettings?.selectedFileId ? <>
        <Background value={file.background} />
        <PickmeTheme value="test" theme={file.theme} />
        <div>Game content</div>
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

