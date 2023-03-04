import styled from "@emotion/styled";
import { onCreateFile } from "@nx/firebase";
import { pickmeDefaultFile } from "@nx/shared-assets";
import { Colors } from "@nx/style";
import { Button, Skin } from "@nx/ui";

interface Props {
  userId: string;
}

const SidebarCreateFile: React.FC<Props> = (props) => {
  const handleCreateFile = () => {
    const name = "File ";
    const file = {...pickmeDefaultFile, userId: props.userId, name};
    onCreateFile(file)
  }

  return (
    <Container>
    <Button slug="createFile" icon="plus" name="Create File" skin={Skin.secondary} flex onClick={handleCreateFile} />
    </Container>
  );
};

export default SidebarCreateFile;

const Container = styled("div")({
  height: "6rem",
  padding: "1rem 2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderTopColor: Colors.gray9,
  borderTopStyle: "solid",
  borderTopWidth: 1,
})
