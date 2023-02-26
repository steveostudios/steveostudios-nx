import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { List } from "@nx/ui";
import { onGetFiles } from "../../integrations/firebase";
import { Colors } from "@nx/style";

interface SimpleFile {
  id: string;
  name: string;
}

interface Props {
  userId: string;
  selectedFileId: string | null;
  setSelectedFileId: (value: string) => void; 
}

const SidebarList: React.FC<Props> = (props) => {
  const [files, setFiles] = useState<SimpleFile[] | undefined>()

  useEffect(() => {
    onGetFiles(props.userId, setFiles)
  }, [])

  const onSelectFile = (id: string) => {
    props.setSelectedFileId(id)
  }
  
  return (
    <div>
      <List>
        {files && files?.map(file => <Item key={file.id} className={file.id === props.selectedFileId ? "selected" : ""} onClick={() => onSelectFile(file.id)}>{file.name}</Item>)}
      </List>
    </div>
  );
};

export default SidebarList;

const Item = styled("li")({
  height: "4rem",
  padding: "0 1rem",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
})