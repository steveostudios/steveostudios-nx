import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { File } from "../../fake-data";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import SidebarPreview from "./SidebarPreview";

interface Props {
  files?: File[];
}

const Sidebar: React.FC<Props> = (props) => {

  return (
    <Container>
      <SidebarHeader />
      <SidebarPreview />
      <SidebarList files={props.files} />
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
