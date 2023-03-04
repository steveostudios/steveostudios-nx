import React, { ChangeEvent, ChangeEventHandler, FormEvent, TextareaHTMLAttributes, useState} from "react"
import {Colors} from "@nx/style";
import styled from "@emotion/styled";
import { Label } from "./Label";

interface Props {
  slug: string;
  label?: string;
  inline?: boolean
  onChange: (value: string) => void;
  disabled?: boolean;
  value: string;
  placeholder?: string;
}

export const TextArea: React.FC<Props> = (props) => {
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.disabled) return false;
    props.onChange(e.currentTarget.value);
    return;
  }

  return (
    <Container inline={props.inline} label={props.label}>
      <Label slug={props.slug} label={props.label}/>
      <TextAreaElement
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
        rows={4}
        disabled={props.disabled}
      />
    </Container>
  );
};

const Container = styled("div")({
  flex: 1,
  "& > *": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}, (props: {inline?: boolean, label?: string}) => {
  if (!props.inline && !!props.label) {
    return {
      height: "initial",
      gap: "1rem",
      label: {
        height: "4rem",
      }
    }
  }
  return {}
})

const TextAreaElement = styled("textarea")({
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.gray7,
    borderRadius: "0.5rem",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    color: Colors.white,
    padding: "1rem",
    fontSize: "1.75rem",
    width: "100%",
    resize: "none"
  });