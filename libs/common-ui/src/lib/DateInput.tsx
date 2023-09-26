import React, { FormEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { CommonInputProps } from "./types";

interface Props extends CommonInputProps {
	onChange: (value: string) => void;
	value: string;
	placeholder?: string;
}

export const DateInput: React.FC<Props> = (props) => {
	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (props.disabled) return false;
		props.onChange(e.currentTarget.value);
		return;
	};

	if (!props.visible) return null;

	return (
		<>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<Input
				placeholder={props.placeholder}
				type="date"
				value={props.value}
				onChange={onChange}
				disabled={props.disabled || props.readonly}
				readonly={props.readonly}
			/>
		</>
	);
};

const Input = styled("input")((props: { readonly?: boolean }) => ({
	border: "none",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	backgroundColor: props.readonly ? "transparent" : Colors.trim,
	padding: props.readonly ? 0 : "1rem 2rem",
	textAlign: "end",
}));
