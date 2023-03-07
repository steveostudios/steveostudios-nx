import styled from "@emotion/styled";
import { Colors } from "@nx/style";

export interface ThemeModalData {
  theme: number;
}

interface Background {
  id: number;
  name: string;
  thumb: string;
  file: string;
}

export interface ThemeModalInitialData {
  currentTheme: number;
  themes: any[];
}

interface Props {
  data: ThemeModalData;
  initialData: ThemeModalInitialData;
  setData: ({theme}: ThemeModalData)  => void;
}

const ThemeModal: React.FunctionComponent<Props> = (props) => {
  const { currentTheme, themes } = props.initialData;
    
  return (
    <Container>
      <SelectedTheme>
        {props.data.theme ? (
          <img
            src={
              themes.find(
                (theme) => theme.id === props.data.theme
              ).thumb
            }
            alt={
              themes.find(
                (theme) => theme.id === props.data.theme
              ).name
            }
          />
        ) : (
          <img
            src={
              themes.find(
                (theme) => theme.id === currentTheme
              ).thumb
            }
            alt={
              themes.find(
                (theme) => theme.id === currentTheme
              ).name
            }
          />
        )}
      </SelectedTheme>
      <Thumbs>
        {themes.map((theme) => (
          <Thumb
            key={theme.id}
            selected={
              props.data.theme
                ? theme.id === props.data.theme
                : theme.id === currentTheme
            }
            onClick={() => props.setData({ theme: theme.id })}
          >
            <img src={theme.thumb} alt={theme.name} />
          </Thumb>
        ))}
      </Thumbs>
    </Container>
  );
};

export default ThemeModal;

const Container = styled("div")({

});

const SelectedTheme = styled("div")({
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
