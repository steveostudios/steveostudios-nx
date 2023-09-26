import React, { FormEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { CommonInputProps } from "./types";

interface Props extends CommonInputProps {
	onChange: (value: string) => void;
	disabled?: boolean;
	value?: string;
	options: { id: string; name: string }[];
}

export const SelectInput: React.FC<Props> = (props) => {
	const onChange = (e: FormEvent<HTMLSelectElement>) => {
		if (props.disabled) return false;
		props.onChange(e.currentTarget.value);
		return;
	};

	if (!props.visible) return null;

	return (
		<>
			{props.showLabel && <Label slug={props.slug} label={props.label} />}
			<Input
				name={props.slug}
				value={props.value}
				onChange={onChange}
				disabled={props.disabled}
			>
				{props.options.map((option, i) => (
					<option key={i} value={option.id}>
						{option.name}
					</option>
				))}
			</Input>
		</>
	);
};

const Input = styled("select")((props: { readonly?: boolean }) => ({
	border: "none",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	backgroundColor: props.readonly ? "transparent" : Colors.trim,
	padding: "1rem 2rem",
	textAlign: "start",
}));
