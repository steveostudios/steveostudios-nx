import React, { MouseEvent, useState } from "react";
import { Colors } from "@nx/style";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { List } from "./List";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "./Popover";

export interface RowDropdownOption {
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
	options: RowDropdownOption[];
	title: string;
	description: string;
}

export const RowDropdown: React.FC<Props> = (props) => {
	const [active, setActive] = useState(false);

	const onToggle = () => {
		if (props.disabled) return false;
		setActive(!active);
		return;
	};

	const onChange = (event: MouseEvent, value: string | number) => {
		if (props.disabled) return false;
		props.onChange(value);
		setActive(false);
		return;
	};

	return (
		<Container>
			<Label slug={props.slug} label={props.label} />
			<Popover
				active={active}
				setActive={(value) => setActive(value)}
				target={
					<SelectButton active={active}>
						<Item
							value={props.value}
							options={props.options}
							onClick={onToggle}
							selector
						/>
					</SelectButton>
				}
				popover={
					<SelectElement>
						<Header>
							<h1>{props.title}</h1>
							<p>{props.description}</p>
						</Header>
						<List>
							{props.options.map((option) => (
								<Option key={option.value} value={option.value}>
									<Item
										options={props.options}
										value={option.value}
										onClick={onChange}
										selected={option.value === props.value}
									/>
								</Option>
							))}
						</List>
					</SelectElement>
				}
			/>
		</Container>
	);
};

const Container = styled("div")({});

const SelectElement = styled("div")({
	flexDirection: "column",
	padding: 0,
	color: Colors.white,
	maxHeight: "22rem",
	minWidth: "12rem",
	width: "max-content",
	display: "flex",
});

const Header = styled("div")({
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	alignItems: "start",
	borderBottomWidth: 1,
	borderBottomStyle: "solid",
	borderBottomColor: Colors.gray7,
	textAlign: "start",
	h1: {
		fontSize: "1.5rem",
		padding: 0,
		margin: 0,
		marginBottom: "0.5rem",
	},
	p: {
		fontSize: "1rem",
		padding: 0,
		margin: 0,
	},
});

const SelectButton = styled("div")((props: { active: boolean }) => ({
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray7,
	borderRadius: "0.5rem",

	color: Colors.white,
	maxHeight: "4rem",
	minWidth: "4rem",
	display: "flex",
}));

const Option = styled("li")({});

interface ItemProps {
	value: string | number;
	options: RowDropdownOption[];
	onClick: (event: MouseEvent, value: string | number) => void;
	selector?: boolean;
	selected?: boolean;
}

const Item: React.FC<ItemProps> = (props) => {
	const option = props.options.find((item) => item.value === props.value);
	return (
		<ItemContainer
			onClick={(event) => props.onClick(event, option?.value || 0)}
			selected={props.selected}
		>
			{option?.color && <Swatch color={option?.color || "red"} />}
			{option?.icon && <FontAwesomeIcon icon={option.icon} />}
			{option?.name}
			{props.selector && (
				<FontAwesomeIcon className="arrow" icon="chevron-down" />
			)}
		</ItemContainer>
	);
};

const ItemContainer = styled("div")((props: { selected?: boolean }) => ({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	padding: "0 1rem",
	height: "4rem",
	".arrow": {
		height: "1.25rem",
	},
	backgroundColor: props.selected ? Colors.blue : "transparent",
}));

const Swatch = styled("div")((props: { color: string }) => ({
	display: "flex",
	minWidth: "3rem",
	width: "100%",
	height: "3rem",
	backgroundColor: props.color,
	borderRadius: "0.5rem",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray9,
}));
