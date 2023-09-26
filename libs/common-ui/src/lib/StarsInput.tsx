import React from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { CommonInputProps } from "./types";

interface Props extends CommonInputProps {
	onChange: (value: number) => void;
	value: number;
}

export const StarsInput: React.FC<Props> = (props) => {
	const onChange = (value: number) => {
		if (props.disabled || props.readonly) return false;
		props.onChange(value);
		return;
	};

	if (!props.visible) return null;

	return (
		<>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<StarButtonWrapper>
				<StarButton active={props.value >= 1} onClick={() => onChange(1)}>
					★
				</StarButton>
				<StarButton active={props.value >= 2} onClick={() => onChange(2)}>
					★
				</StarButton>
				<StarButton active={props.value >= 3} onClick={() => onChange(3)}>
					★
				</StarButton>
				<StarButton active={props.value >= 4} onClick={() => onChange(4)}>
					★
				</StarButton>
				<StarButton active={props.value >= 5} onClick={() => onChange(5)}>
					★
				</StarButton>
			</StarButtonWrapper>
		</>
	);
};

const StarButtonWrapper = styled("div")({
	display: "flex",
	flexDirection: "row",
});

const StarButton = styled("button")((props: { active: boolean }) => ({
	color: props.active ? Colors.orange : Colors.white,
	fontSize: "2rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "4.5rem",
	width: "4rem",
	backgroundColor: Colors.trim,
	border: "none",
	"&:first-of-type": {
		borderRadius: "0.5rem 0 0 0.5rem",
	},

	"&:last-of-type": {
		borderRadius: "0 0.5rem 0.5rem 0",
	},
}));
