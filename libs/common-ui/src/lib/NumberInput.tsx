import React, { FormEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { CommonInputProps } from "./types";

interface Props extends CommonInputProps {
	onChange: (value: number) => void;
	value: number;
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
}

export const NumberInput: React.FC<Props> = (props) => {
	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (props.disabled) return false;
		props.onChange(parseFloat(e.currentTarget.value));
		return;
	};

	if (!props.visible) return null;

	return (
		<>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<Input
				name={props.slug}
				placeholder={props.placeholder}
				type="number"
				value={props.value}
				onChange={onChange}
				min={props.min}
				max={props.max}
				step={props.step}
				disabled={props.disabled || props.readonly}
				readonly={props.readonly}
			/>
		</>
	);
};

const Input = styled("input")((props: { readonly?: boolean }) => ({
	border: "none",
	width: "12rem",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	backgroundColor: props.readonly ? "transparent" : Colors.trim,
	padding: props.readonly ? 0 : "1rem 1rem 1rem 2rem",
	fontSize: "2rem",
	textAlign: "start",
}));
