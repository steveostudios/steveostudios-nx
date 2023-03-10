import styled from "@emotion/styled";
import { onGetFile, onGetUserSettings, onSetFile } from "@nx/firebase"
import { File, Modes, UserSettings } from "@nx/shared-assets";
import { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import PickmeEdit from "../components/builders/pickme/Edit";
import PickmePlay from "../components/builders/pickme/Play";
import { Colors } from "@nx/style";
import { useFirebaseAuth } from "../context/AuthContext";

const Manage = () => {
  const [file, setFile] = useState<File | null>() // MtEyqt2j6NLs5nO8vIOA
  // const userId = "iBfXqM9uuEWBMv8bEARIaQgwJFI3";
  const {user} = useFirebaseAuth()
  const [userSettings, setUserSettings] = useState<UserSettings>({  
    titleGraphic: false,
    sounds: true,
    instructions: false,
    selectedMode: Modes.EDIT,
    selectedFileId: null
  })

  useEffect(() => {
    if (user && user.uid) onGetUserSettings(user.uid, (data) => setUserSettings({...data}))
   }, [user])


  useEffect(() => {
    if (userSettings.selectedFileId) {
      onGetFile(userSettings.selectedFileId, setFile)
    } else {
      setFile(null)
    }
  }, [userSettings.selectedFileId])

  const onSelectFile = (fileId:string) => {
    if (user && user.uid)
    onSetFile(user.uid, fileId);
  }

  if (!user?.uid) return <div>no user</div>
  return (
      <Container>
      <Sidebar userId={user.uid} selectedFileId={userSettings?.selectedFileId} setSelectedFileId={onSelectFile} />
      {file && userSettings.selectedFileId ?
        <Main userId={user.uid} selectedFileId={userSettings?.selectedFileId} titleGraphic={userSettings?.titleGraphic} sounds={userSettings?.sounds} instructions={userSettings?.instructions}>
          {userSettings.selectedFileId && userSettings?.selectedMode === Modes.EDIT && 
            <PickmeEdit file={file} />
          }
          {userSettings.selectedFileId && userSettings?.selectedMode === Modes.PLAY && 
            <PickmePlay file={file} />
          }
        </Main>
      :
      <NoFileSelected>Select or create a file from the left.</NoFileSelected>}
    </Container>
  );
};

export default Manage;

const Container = styled("div")({
  display: "grid",
  gridTemplateColumns: "32rem auto",
  height: "100vh",
  overflow: "hidden"
});

const NoFileSelected = styled("div")({
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  color: Colors.gray4
})
