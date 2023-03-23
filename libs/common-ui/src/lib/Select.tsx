import React, {
	ChangeEvent,
	ChangeEventHandler,
	FormEvent,
	MouseEvent,
} from "react";
import { Colors } from "@nx/style";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Option {
	name: string;
	value: string | number;
	icon?: IconProp;
	color?: string;
}

interface Props {
	slug: string;
	label?: string;
	onChange: (value: string | number) => void;
	disabled?: boolean;
	name?: string;
	value: string | number;
	options: Option[];
}

export const Select: React.FC<Props> = (props) => {
	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		if (props.disabled) return false;
		props.onChange(e.target.value);
		return;
	};

	return (
		<Container>
			<Label slug={props.slug} label={props.label} />
			<SelectElement value={props.value} onChange={onChange}>
				{props.options.map((option) => (
					<Option key={option.value} value={option.value}>
						{option.name}
					</Option>
				))}
			</SelectElement>
		</Container>
	);
};

const Container = styled("div")({});

const SelectElement = styled("select")({
	borderWeight: 1,
	borderStyle: "solid",
	borderColor: Colors.gray7,
	backgroundColor: "transparent",
	borderRadius: "0.5rem",
	padding: "0 1rem",
	color: Colors.white,
	height: "4rem",
	display: "flex",
});

const Option = styled("option")({});
