import styled from "@emotion/styled";
import { onUpdateFile } from "@nx/firebase";
import { Background, Builders, Instructions, backgrounds, pickmeThemes, Title } from "@nx/shared-assets";
import { Colors } from "@nx/style";
import { Label } from "@nx/ui";
import { useModals } from "../../providers/ModalProvider";
import BackgroundModal from "../modals/BackgroundModal";
import InstructionsModal from "../modals/InstructionsModal";
import ThemeModal from "../modals/ThemeModal";

interface Props {
  selectedFileId: string;
  name: string;
  builder: Builders;
  theme: number;
  background: number;
  instructionsContent: string;
}

const DisplayOptions: React.FC<Props> = (props) => {
  const themeImage = pickmeThemes.find(item => item.id === props.theme);

  const { push } = useModals();



  const onInstructions = () => {
    push({
      component: InstructionsModal,
      initialData: {
        value: props.instructionsContent,
      },
      title: "Instructions",
      onConfirm: onInstructionsConfirm,
      onCancel: () => {return}
    });
  };

  const onInstructionsConfirm = (data: any) => {
    onUpdateFile(props.selectedFileId, {'instructionsContent': data.value})
  };

  const onBackground = () => {
    push({
      component: BackgroundModal,
      initialData: {
        currentBackground: props.background,
        backgrounds,
      },
      title: "Pick a Background",
      onLiveUpdate: onBackgroundLiveUpdate,
    });
  };

  const onBackgroundLiveUpdate = (data: any) => {
    if (!data.background) return;
    onUpdateFile(props.selectedFileId, {'background': data.background})
  };

  const onTheme = () => {
    push({
      component: ThemeModal,
      initialData: {
        currentTheme: props.theme,
        themes: pickmeThemes,
      },
      title: "Pick a Theme",
      onLiveUpdate: onThemeLiveUpdate,
    });
  };

  const onThemeLiveUpdate = (data: any) => {
    if (!data.theme) return;
      onUpdateFile(props.selectedFileId, {'theme': data.theme})      
  };

  return (
    <Container>
      <Option>
        <Label slug="titleGraphic" label="Title Graphic" />
        <ImageContainer>
          <Title active builder={props.builder} value={props.name}/>
        </ImageContainer>
      </Option>
      <Option>
        <Label slug="background" label="Background" />
        <ImageContainer onClick={onBackground}>
          <Background value={props.background} />
        </ImageContainer>
      </Option>
      <Option>
        <Label slug="instructions" label="Instructions" />
        <ImageContainer onClick={onInstructions}>
          <Instructions value={props.instructionsContent} active showBackground />
        </ImageContainer>
      </Option>
      <Option>
        <Label slug="theme" label="Theme" />
        <ImageContainer onClick={onTheme}>
          <img src={themeImage?.thumb} alt="theme" />
          </ImageContainer>
      </Option>
    </Container>
  );
};

export default DisplayOptions;

const Container = styled("div")({
  display: "flex",
  gap: "1rem"
})

const Option = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  img: {
    borderRadius: "0.5rem",
    overflow: "hidden",
    width: "12rem",
    height: "6.75rem",
    backgroundColor: Colors.gray9
  }
})

const ImageContainer = styled("div")({
  borderRadius: "0.5rem",
  overflow: "hidden",
  width: "12rem",
  height: "6.75rem",
  backgroundColor: Colors.gray9,
  svg: {
    position: "relative"
  }
})
