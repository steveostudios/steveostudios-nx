import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { List } from "@nx/ui";
import { onGetFiles } from "@nx/firebase";
import { SimpleFile } from "@nx/shared-assets";
import SidebarListFile from "./SidebarListFile";

interface Props {
  userId: string;
  selectedFileId: string | null;
  setSelectedFileId: (value: string) => void; 
}

const SidebarList: React.FC<Props> = (props) => {
  const [files, setFiles] = useState<SimpleFile[] | undefined>()

  useEffect(() => {
    onGetFiles(props.userId, (data) => {
      setFiles(data)
    })
  }, [])

  const onSelectFile = (id: string) => {
    props.setSelectedFileId(id)
  }

  return (
    <Container>
      <List hideBorder >
        {files && files?.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0).map(file => (
          <SidebarListFile key={file.id} userId={props.userId} selected={file.id === props.selectedFileId} setSelectedFileId={onSelectFile} file={file} />
          ))}
      </List>
    </Container>
  );
};

export default SidebarList;

const Container = styled("div")({
  display: "flex",
  flex: 1,
})


