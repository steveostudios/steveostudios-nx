import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Toggle } from "@nx/ui";
import { useState } from "react";

const MainHeader = () => {
  const [sound, setSound] = useState(false);
  const [title, setTitle] = useState(false);
  const [instructions, setInstructions] = useState(false);

  return (
    <Container>
      <Modes>
        Edit Play
      </Modes>
      <Toggles>
        <Toggle slug="sound" label="Sound" value={sound} onChange={setSound} column />
        <Toggle slug="title" label="Title Graphic" value={title} onChange={setTitle} column />
        <Toggle slug="instructions" label="Instructions" value={instructions} onChange={setInstructions} column />
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

