import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {Colors} from "@nx/style"
import { Background, Instructions, Title, Builders, File, Modes, UserSettings } from "@nx/shared-assets";
import { onGetFile, onGetUser, onGetUserSettings} from "@nx/firebase";
import { useParams } from "react-router-dom";

export const Player: React.FC = () => {
  const [file, setFile] = useState<File | null>();
  const [fileId, setFileId] = useState<string | null>()
  const { userId } = useParams();
  const [userSettings, setUserSettings] = useState<UserSettings | null>({  
    titleGraphic: false,
    sounds: true,
    instructions: false,
    selectedMode: Modes.EDIT,
    selectedFileId: null
  })

  useEffect(() => {
    if (userSettings?.selectedFileId)
    onGetFile(userSettings?.selectedFileId, setFile)
  }, [userSettings?.selectedFileId])

  useEffect(() => {
    if (userId) onGetUserSettings(userId, (data) => setUserSettings({...data}))
   }, [userId])

  return (
    <Container>
      {file && <>
        <Background value={file.settings?.background} />
        <div>Game content</div>
        <Instructions active={!!userSettings?.instructions} value={file.settings?.instructionsContent} showBackground/>
        <Title active={!!userSettings?.titleGraphic} value={file.name} builder={Builders.PICKME}/>
      </>}
    </Container>
  )
};

const Container = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100vh",
  backgroundColor: Colors.black,
})