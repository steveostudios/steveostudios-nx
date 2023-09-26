import React, { FormEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { CommonInputProps } from "./types";

interface Props extends CommonInputProps {
	onChange: (value: string) => void;
	onEnter?: () => void;
	value: string;
	type?: "text" | "phone" | "password" | "email";
	placeholder?: string;
}

export const TextInput: React.FC<Props> = (props) => {
	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (props.disabled) return false;
		props.onChange(e.currentTarget.value);
		return;
	};

	const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && props.onEnter) props.onEnter();
	};

	if (!props.visible) return null;

	return (
		<>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<Input
				name={props.slug}
				placeholder={props.placeholder}
				type={props.type ? props.type : "text"}
				value={props.value}
				onChange={onChange}
				disabled={props.disabled || props.readonly}
				readonly={props.readonly}
				onKeyPress={onKeyPress}
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
	fontFamily: "monospace",
	textAlign: "start",
}));
