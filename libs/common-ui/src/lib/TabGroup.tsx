import React from "react";
import styled from "@emotion/styled";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button, ButtonStyle } from "./Button";
import { Colors } from "@nx/style";

interface Props {
	showLabels?: boolean;
	tabs: TabButton[];
}

export interface TabButton {
	slug: string;
	label: string;
	icon: IconProp;
	disabled?: boolean;
	onClick: () => void;
	selected?: boolean;
}

export const TabGroup: React.FC<Props> = (props) => {
	const selectedStyle = {
		// paddingTop: "1rem",
		borderColor: Colors.blue,
	};
	const deselectedStyle = {
		// paddingTop: "1rem",
		opacity: 0.5,
		borderColor: "transparent",
		// borderBottom: `1rem solid transparent`,
	};

	return (
		<Container>
			{props.tabs &&
				props.tabs.map((tab, index) => (
					<Button
						skin={ButtonStyle.CLEAR}
						key={index}
						slug={tab.slug}
						name={props.showLabels ? tab.label : undefined}
						icon={tab.icon}
						disabled={tab.disabled}
						onClick={tab.onClick}
						style={tab.selected ? selectedStyle : deselectedStyle}
					/>
				))}
		</Container>
	);
};

const Container = styled("div")({
	display: "flex",
	// padding: "1rem",
	paddingTop: 0,
	paddingBottom: 0,
	width: "inherit",
	minHeight: "6rem",
	// alignItems: "flex-end",
	// gap: "1rem",
	borderBottomStyle: "solid",
	borderBottomWidth: 1,
	borderBottomColor: Colors.gray9,
	alignItems: "center",
	justifyContent: "flex-start",
	// gap: "2rem",
	gap: "1rem",
	height: "100%",
	"> * ": {
		height: "inherit",
		boxSizing: "border-box",
		borderBottomStyle: "solid",
		borderBottomWidth: "0.5rem",
		button: {
			padding: "1rem",
			paddingBottom: 0,
			paddingTop: "1rem",
			height: "inherit",
		},
	},
});
