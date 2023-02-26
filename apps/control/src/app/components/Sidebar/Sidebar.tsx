import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import SidebarPreview from "./SidebarPreview";

interface Props {
  userId: string;
  selectedFileId: string | null;
  setSelectedFileId: (value: string) => void; 
}

const Sidebar: React.FC<Props> = (props) => {
  return (
    <Container>
      <SidebarHeader />
      <SidebarPreview userId={props.userId} />
      <SidebarList userId={props.userId} selectedFileId={props.selectedFileId} setSelectedFileId={props.setSelectedFileId} />
    </Container>
  );
};

export default Sidebar;

const Container = styled("aside")({
  width: "100%",
  borderColor: "transparent",
  borderRightColor: Colors.gray9,
  borderWidth: "1px",
  borderStyle: "solid",
})
