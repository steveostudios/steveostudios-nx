import styled from "@emotion/styled";
import { Colors } from "@nx/style";

export interface PositionModalData {
  position: number;
}

export interface PositionModalInitialData {
  currentPosition: number;
  positions: any[];
}

interface Props {
  data: PositionModalData;
  initialData: PositionModalInitialData;
  setData: ({position}: PositionModalData)  => void;
}

const PositionModal: React.FunctionComponent<Props> = (props) => {
  const { currentPosition, positions } = props.initialData;
    
  return (
    <Container>
      <SelectedTheme>
        {props.data.position ? (
          <img
            src={
              positions.find(
                (position) => position.id === props.data.position
              ).thumb
            }
            alt={
              positions.find(
                (position) => position.id === props.data.position
              ).name
            }
          />
        ) : (
          <img
            src={
              positions.find(
                (position) => position.id === currentPosition
              ).thumb
            }
            alt={
              positions.find(
                (position) => position.id === currentPosition
              ).name
            }
          />
        )}
      </SelectedTheme>
      <Thumbs>
        {positions.map((position) => (
          <Thumb
            key={position.id}
            selected={
              props.data.position
                ? position.id === props.data.position
                : position.id === currentPosition
            }
            onClick={() => props.setData({ position: position.id })}
          >
            <img src={position.thumb} alt={position.name} />
          </Thumb>
        ))}
      </Thumbs>
    </Container>
  );
};

export default PositionModal;

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
