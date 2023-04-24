import React, { FormEvent } from "react";
import { Colors } from "@nx/style";
import styled from "@emotion/styled";
import { Label } from "./Label";

interface Props {
	slug: string;
	label?: string;
	inline?: boolean;
	onChange: (value: number) => void;
	disabled?: boolean;
	value: string | number;
	locked?: boolean;
	placeholder?: string;
	min?: number;
	max?: number;
	width?: string;
}

export const NumberInput: React.FC<Props> = (props) => {
	const onChange = (e: FormEvent<HTMLInputElement>) => {
		if (props.disabled) return false;
		props.onChange(parseInt(e.currentTarget.value));
		return;
	};

	return (
		<Container inline={props.inline} label={props.label}>
			<Label slug={props.slug} label={props.label} />
			<Input
				placeholder={props.placeholder}
				type="number"
				value={props.value}
				onChange={onChange}
				disabled={props.disabled}
				min={props.min}
				max={props.max}
				width={props.width}
			/>
		</Container>
	);
};

const Container = styled("div")(
	{
		display: "flex",
		flex: 1,
		height: "4rem",
		"& > *": {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		},
	},
	(props: { inline?: boolean; label?: string }) => {
		if (!props.inline && !!props.label) {
			return {
				height: "initial",
				gap: "1rem",
				label: {
					height: "4rem",
				},
			};
		}
		return {};
	}
);

const Input = styled("input")({
	height: "4rem",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray7,
	borderRadius: "0.5rem",
	boxSizing: "border-box",
	backgroundColor: "transparent",
	color: Colors.white,
	padding: "1rem",
	fontSize: "1.75rem",
	width: "100%",
});
