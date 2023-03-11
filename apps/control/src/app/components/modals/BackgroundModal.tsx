import styled from "@emotion/styled";
import { Colors } from "@nx/style";

export interface BackgroundModalData {
  background: number;
}

interface Background {
  id: number;
  name: string;
  thumb: string;
  file: string;
}

export interface BackgroundModalInitialData {
  currentBackground: number;
  backgrounds: any[];
}

interface Props {
  data: BackgroundModalData;
  initialData: BackgroundModalInitialData;
  setData: ({background}: BackgroundModalData)  => void;
}

const BackgroundModal: React.FunctionComponent<Props> = (props) => {
  const { currentBackground, backgrounds } = props.initialData;
  
  console.log(props)
  
  return (
    <Container>
      <SelectedBackground>
        {props.data.background ? (
          <img
            src={
              backgrounds.find(
                (background) => background.id === props.data.background
              ).thumb
            }
            alt={
              backgrounds.find(
                (background) => background.id === props.data.background
              ).name
            }
          />
        ) : (
          <img
            src={
              backgrounds.find(
                (background) => background.id === currentBackground
              ).thumb
            }
            alt={
              backgrounds.find(
                (background) => background.id === currentBackground
              ).name
            }
          />
        )}
      </SelectedBackground>
      <Thumbs>
        {backgrounds.map((background) => (
          <Thumb
            key={background.id}
            selected={
              props.data.background
                ? background.id === props.data.background
                : background.id === currentBackground
            }
            onClick={() => props.setData({ background: background.id })}
          >
            <img src={background.thumb} alt={background.name} />
          </Thumb>
        ))}
      </Thumbs>
    </Container>
  );
};

export default BackgroundModal;

const Container = styled("div")({

});

const SelectedBackground = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.5rem",
  overflow: "hidden",
  backgroundColor: Colors.gray8,
  width: "56rem",
  height: "31.5rem",
  margin: "0 auto 1rem auto",
  img: {
    width: "100%",
  }
})

const Thumbs = styled("div")({
  display: "flex",
  gap: "1rem",
  width: "77rem",
  flexWrap: "wrap",
  height: "18rem",
  overflowY: "scroll",
})

const Thumb = styled("div")({
  display: "flex",
  borderRadius: "0.5rem",
  overflow: "hidden",
  backgroundColor: Colors.gray8,
  width: "12rem",
  height: "6.75rem",
  boxSizing: "border-box",
  borderStyle: "solid",
  borderWidth: 2,
  img: {
    width: "100%",
  }
}, (props: {selected: boolean}) => {
  if (!props.selected) {
    return {
      borderColor: props.selected ? Colors.blue : "transparent" 
    }
  }
  
  return {}
})
