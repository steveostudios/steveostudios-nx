import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Toggle } from "@nx/ui";
import { onUpdateFileSettings } from "../../integrations/firebase";

interface Props {
  selectedFileId: string | null;
  titleGraphic: boolean;
  sounds: boolean;
  instructions: boolean;
}

const MainHeader: React.FC<Props> = (props) => {

  const onUpdateSetting = (setting: string, value: boolean) => {
    console.log(setting, value)
     if (props.selectedFileId) onUpdateFileSettings(props.selectedFileId, {[`settings.${setting}`]: value})
  }

  return (
    <Container>
      <Modes>
        Edit Play
      </Modes>
      <Toggles>
        <Toggle slug="sound" label="Sound" value={props.sounds} onChange={(value) => onUpdateSetting("sounds", value)} column />
        <Toggle slug="title" label="Title Graphic" value={props.titleGraphic} onChange={(value) => onUpdateSetting("titleGraphic", value)} column />
        <Toggle slug="instructions" label="Instructions" value={props.instructions} onChange={(value) => onUpdateSetting("instructions", value)} column />
      </Toggles>
    </Container>
  );
};

export default MainHeader;

const Container = styled("div")({
  height: "8rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
  borderBottomColor: Colors.gray9,
  display: "flex",
  alignItems: "center",
  padding: "0 2rem",
  justifyContent: "space-between"
})

const Modes = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start"
})

const Toggles = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "flex-start",
  label: {
    fontSize: "10px",
    textTransform: "uppercase"
  }
})

