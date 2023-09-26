import React, { FormEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { CommonInputProps, Label } from "@nx/ui";

interface Props extends CommonInputProps {
	onChange: (value: boolean) => void;
	disabled?: boolean;
	value: boolean;
}

export const CheckboxInput: React.FC<Props> = (props) => {
	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (props.disabled) return false;
		props.onChange(e.currentTarget.checked);
		return;
	};

	if (!props.visible) return null;

	return (
		<>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<Input
				name={props.slug}
				type="checkbox"
				checked={props.value}
				onChange={onChange}
				disabled={props.disabled}
				readOnly={props.readonly}
			/>
		</>
	);
};

const Input = styled("input")((props: { readonly?: boolean }) => ({
	border: "none",
	width: "3rem",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	backgroundColor: props.readonly ? "transparent" : Colors.trim,
	padding: "0.5rem 1rem",
	textAlign: "start",
}));
