import React from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { CommonInputProps } from "./types";

interface Props extends CommonInputProps {
	value: number;
}

export const ProgressInput: React.FC<Props> = (props) => {
	if (!props.visible) return null;

	return (
		<Wrapper>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<Input value={props.value} max="100" />
			<Text>
				{props.value === 0
					? "𝚡"
					: props.value === 100
					? "✔"
					: `${Math.floor(props.value)}%`}
			</Text>
		</Wrapper>
	);
};

const Wrapper = styled("div")({
	display: "flex",
	position: "relative",
	height: "4.5rem",
	width: "8rem",
	overflow: "hidden",
	borderRadius: "0.5rem",
});

const Input = styled("progress")({
	position: "absolute",
	border: "none",
	height: "100%",
	width: "100%",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	fontFamily: "monospace",
	textAlign: "start",
	appearance: "none",
	"[value]": {
		webkitAppearance: "none",
		backgroundColor: Colors.orange,
		borderRadius: "0.5rem",
		appearance: "none",
	},

	"::-webkit-progress-bar": {
		backgroundColor: Colors.trim,
		borderRadius: "0.5rem",
	},

	"::-webkit-progress-value": {
		borderRadius: "0.5rem",
		backgroundColor: Colors.orange,
	},
});

const Text = styled("div")({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	width: "100%",
	color: Colors.white,
	textTransform: "uppercase",
});
