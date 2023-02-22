import React, { FormEvent, useState} from "react"
import {Colors} from "@nx/style";
import { Button, Skin } from "./Button";
import styled from "@emotion/styled";
import { Label } from "./Label";

interface Props {
  slug: string;
  label?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  value: string;
  type?: "text" | "phone" | "password" | "email";
}

export const TextInput: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  
  const toggleEdit = () => {
    setEdit(!edit);
    setValue(props.value);
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onConfirmChange = () => {
    if (props.disabled) return false;
    props.onChange(value);
    toggleEdit();
    return;
  };

  return (
    <Container>
      <Label slug={props.slug} label={props.label}/>
      {edit ? (
        <div>
            <input
              type={props.type ? props.type : "text"}
              value={value}
              onChange={onChange}
            />
          <Controls>
            <Button
              onClick={onConfirmChange}
              icon="check-circle"
              skin={Skin.clear}
              slug="confirm"
            />
            <Button onClick={toggleEdit} icon="times" skin={Skin.clear} slug="cancel" />
          </Controls>
        </div>
      ) : (
        <div>
          <StaticText>{props.value}</StaticText>
          <Controls>
            <Button onClick={toggleEdit} icon="pencil" skin={Skin.clear} slug="edit" />
          </Controls>
        </div>
      )}
    </Container>
  );
};

const Container = styled("div")({
  flex: 1,
  height: "4rem",
  "& > *": {
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.gray7,
    borderRadius: "0.5rem",
    boxSizing: "border-box"
  },
  input: {
    backgroundColor: "transparent",
    color: Colors.white,
    padding: "1rem",
    fontSize: "1.75rem",
    width: "100%",
    border: "none"
  }
})

const Controls = styled("div")({
  display: "flex",
  alignItems: "center"
})

const StaticText = styled("span")({
  margin: "1rem"
})
