import React, { CSSProperties, MouseEvent } from "react";
import { Colors } from "@nx/style";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Label } from "./Label";

interface Props {
	slug: string;
	size?: ButtonSize;
	label?: string;
	onClick: (event: MouseEvent) => void;
	disabled?: boolean;
	name?: string;
	skin?: ButtonStyle;
	icon?: IconProp;
	flex?: boolean;
	stopPropagation?: boolean;
	style?: CSSProperties;
}

export const Button: React.FC<Props> = (props) => {
	const onClick = (event: MouseEvent) => {
		if (props.stopPropagation) {
			event.stopPropagation();
		}
		event.preventDefault();
		if (props.disabled) return false;
		props.onClick(event);
		return;
	};

	return (
		<Container flex={props.flex} style={props.style}>
			<Label slug={props.slug} label={props.label} />
			<ButtonElement
				onClick={onClick}
				size={props.size}
				skin={props.skin}
				disabled={props.disabled}
				flex={props.flex}
			>
				{props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
				{props.name ? <span>{props.name}</span> : null}
			</ButtonElement>
		</Container>
	);
};

const Container = styled("div")({}, (props: { flex?: boolean }) => {
	let options = {};
	if (props.flex) {
		options = { ...options, width: "100%" };
	}

	return options;
});

export enum ButtonSize {
	SMALL = "small",
	DEFAULT = "default",
	LARGE = "large",
}

export enum ButtonStyle {
	CLEAR = "clear",
	BORDER = "border",
	PRIMARY = "primary",
	SECONDARY = "secondary",
	GRAY = "gray",
}

const backgroundColor = {
	clear: "transparent",
	border: "transparent",
	primary: Colors.red,
	secondary: Colors.blue,
	gray: Colors.gray7,
};

const borderColor = {
	clear: "transparent",
	border: Colors.gray8,
	primary: Colors.red,
	secondary: Colors.blue,
	gray: "transparent",
};

const buttonTextColor = {
	clear: Colors.white,
	border: Colors.white,
	primary: Colors.white,
	secondary: Colors.white,
	gray: Colors.gray8,
};

const ButtonElement = styled("button")(
	{
		height: "4rem",
		minWidth: "4rem",
		color: Colors.white,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: "0.5rem",
		gap: "1rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.gray9,
		borderColor: Colors.gray8,
		opacity: 0.9,
		"&:hover": {
			opacity: 1,
		},
	},
	(props: {
		skin?: ButtonStyle;
		disabled?: boolean;
		flex?: boolean;
		size?: ButtonSize;
	}) => {
		let options = {};
		if (props.size === ButtonSize.SMALL) {
			options = {
				...options,
				fontSize: 8,
				height: "2rem",
				width: "2rem",
				minWidth: "2rem",
			};
		}

		if (props.size === ButtonSize.LARGE) {
			options = {
				...options,
				fontSize: 18,
				height: "8rem",
				minWidth: "8rem",
				padding: "4rem",
			};
		}

		if (props.skin) {
			options = {
				...options,
				backgroundColor: backgroundColor[props.skin] || Colors.gray9,
				borderColor: borderColor[props.skin] || Colors.gray8,
			};
		}
		if (props.disabled) {
			options = {
				...options,
				opacity: 0.3,
				"&:hover": {
					opacity: 0.3,
				},
			};
		}
		if (props.flex) {
			options = { ...options, width: "100%" };
		}

		return options;
	}
);
