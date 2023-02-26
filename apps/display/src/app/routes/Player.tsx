import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {Colors} from "@nx/style"
import { Background, Instructions, Title, Builders } from "@nx/shared-assets";
import { onGetFile, File, onGetUser} from "../integrations/firebase";
import { useParams } from "react-router-dom";

export const Player: React.FC = () => {
  const [file, setFile] = useState<File | null>();
  const [fileId, setFileId] = useState<string | null>()
  const { userId } = useParams();

  useEffect(() => {
    if (fileId)
    onGetFile(fileId, setFile)
  }, [fileId])

  useEffect(() => {
   if (userId) onGetUser(userId, setFileId)
  }, [userId])

  return (
    <Container>
      {file && <>
        <Background value={file.settings?.background} />
        <div>Game content</div>
        <Instructions active={file.settings?.instructions} value={file.settings?.instructionsContent} showBackground/>
        <Title active={file.settings?.titleGraphic} value={file.name} builder={Builders.pickme}/>
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