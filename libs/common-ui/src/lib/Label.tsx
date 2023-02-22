import React from "react"
import styled from "@emotion/styled";

interface Props {
  slug: string;
  label?: string;
}

export const Label: React.FC<Props> = (props) => {
  if (!props.label) return null;

  return (
    <Container htmlFor={props.slug}>{props.label}</Container>
  );
};

const Container = styled("label")({

})

