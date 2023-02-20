import styled from "@emotion/styled";
import {Button, TextInput} from "@nx/ui"
import { Skin } from "@nx/ui";
import { useState } from "react";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import { fakeData } from "../fake-data";

const Edit = () => {
  const [input, setInput] = useState("")
  const onClick = () => {
    console.log("Poop");
  }
  return (
    <Container>
      <Sidebar files={fakeData.files} />
      <Main>
        <TextInput value={input} onChange={setInput} slug="test" />
        <Button onClick={onClick} slug="edit" skin={Skin.primary} name="click me" />
        <Button onClick={onClick} slug="edit" skin={Skin.secondary} name="click me" />
        <Button onClick={onClick} slug="edit" name="disabled" disabled />
      </Main>
    </Container>
  );
};

export default Edit;

const Container = styled("div")({
  display: "flex",
  height: "100vh"
})

