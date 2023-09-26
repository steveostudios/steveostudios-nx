import React, { ChangeEvent } from "react";
import { Colors } from "./Colors";
import styled from "@emotion/styled";
import { Button, ButtonColor } from "./Button";

interface Props {
	slug: string;
	onChange: (value: File | null) => void;
	disabled?: boolean;
	value: File | null;
}

export const FileInput: React.FC<Props> = (props) => {
	const ref = React.useRef<HTMLInputElement>(null);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (props.disabled) return;
		if (!e.currentTarget.files || !e.currentTarget.files.length) return;
		props.onChange(e.currentTarget.files[0]);
		return;
	};

	return (
		<Container>
			<Input
				type="file"
				onChange={onChange}
				disabled={props.disabled}
				ref={ref}
			/>
			<Button
				slug="clear"
				disabled={!props.value}
				onClick={(e) => {
					if (ref.current) ref.current.value = "";
					props.onChange(null);
				}}
				color={ButtonColor.ORANGE}
				name="Clear"
			/>
		</Container>
	);
};

const Container = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
});
const Input = styled("input")({
	border: "none",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	backgroundColor: Colors.trim,
	padding: "1rem 2rem",
	textAlign: "end",
	"&::file-selector-button": {
		display: "none",
	},
});
