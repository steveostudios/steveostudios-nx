import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Label } from "@nx/ui";

const DisplayOptions = () => {

  return (
    <Container>
      <Option>
        <Label slug="titleGraphic" label="Title Graphic" />
        <img src="" alt="titleGraphic" />
      </Option>
      <Option>
        <Label slug="background" label="Background" />
        <img src="" alt="background" />
      </Option>
      <Option>
        <Label slug="instructions" label="Instructions" />
        <img src="" alt="instructions" />
      </Option>
      <Option>
        <Label slug="theme" label="Theme" />
        <img src="" alt="theme" />
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
    height: "7.75rem",
    backgroundColor: Colors.gray9
  }
})

