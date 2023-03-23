import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { Colors, Shadows } from "@nx/style";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { List } from "./List";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
	const ref = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		function handleClickOutside(event: Event): void {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setActive(false);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

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
			<SelectButton active={active}>
				<Item
					value={props.value}
					options={props.options}
					onClick={onToggle}
					selector
				/>
			</SelectButton>
			<SelectElement active={active} ref={ref}>
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
		</Container>
	);
};

const Container = styled("div")({
	position: "relative",
});

const SelectElement = styled("div")((props: { active: boolean }) => ({
	position: "absolute",
	right: `calc(100% + 0.5rem)`,
	top: "-1rem",
	flexDirection: "column",
	boxShadow: Shadows.standard,
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray7,
	backgroundColor: Colors.gray9,
	borderRadius: "0.5rem",
	padding: 0,
	color: Colors.white,
	maxHeight: "22rem",
	minWidth: "12rem",
	width: "max-content",
	display: "flex",
	zIndex: props.active ? 1 : -1,
	opacity: props.active ? 1 : 0,
	":after": {
		content: '""',
		display: "block",
		position: "absolute",
		top: "2rem",
		left: "100%",
		width: 0,
		height: 0,
		borderStyle: "solid",
		borderWidth: "1rem 0 1rem 1rem",
		borderColor: `transparent transparent transparent ${Colors.gray7}`,
		filter: `drop-shadow(1px 0 0 ${Colors.gray7}) drop-shadow(0 .5px 0 ${Colors.gray7})`,
	},
}));

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
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray9,
}));
