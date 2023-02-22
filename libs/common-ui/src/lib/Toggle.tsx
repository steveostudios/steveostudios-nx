import React , {ChangeEvent} from "react"
import {Colors} from "@nx/style";
import styled from "@emotion/styled";
import {Label} from "./Label"

interface Props {
  slug: string;
  label?: string;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  column?: boolean;
  value: boolean;
}

export const Toggle: React.FC<Props> = (props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return false;
    props.onChange(e.target.checked);
    return;
  };

  return (
    <Container column={props.column}>
      <Label slug={props.slug} label={props.label}/>
      <Switch>
        <Input
          name={props.slug}
          type="checkbox"
          onChange={onChange}
          checked={props.value}
        />
        <Slider className="slider" />
      </Switch>
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  position: "relative",
  flexDirection: "row",
},(props: {column?: boolean}) => {
  if (props.column) {
    return {
      flexDirection: "column"
    }
  }
  return {}
})

const Switch = styled("label")({
  position: "relative",
  display: "inline-block",
  width: "10rem",
  height: "3rem",
});

const Input = styled("input")({
  opacity: 0,
  width: 0,
  height: 0,
  ":focus + .slider": {
    boxShadow: "0 0 1px #2196f3",
  },
  ":checked + .slider": {
    backgroundColor: Colors.green,
    ":before": {
      transform: "translateX(5rem)",
    }
  }
})

const Slider = styled("span")({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: Colors.gray8,
  transition: "0.4s",
  borderRadius: "2rem",
  ":before": {
    position: "absolute",
    content: "''",
    height: "2.5rem",
    width: "4.5rem",
    left: "2px",
    bottom: "2px",
    backgroundColor: Colors.gray9,
    transition: "0.4s",
    borderRadius: "2rem",
  }
})
