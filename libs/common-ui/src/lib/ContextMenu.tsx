import React from "react";
import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ContextMenuItemProps {
	icon: IconProp;
	label: string;
	onClick: () => void;
}

export interface ContextMenuProps {
	close?: () => void;
	items: ContextMenuItemProps[];
}

export const ContextMenu: React.FC<ContextMenuProps> = (props) => {
	return (
		<UL>
			{props.items.map((item, i) => (
				<li key={i} onClick={item.onClick}>
					<FontAwesomeIcon icon={item.icon} />
					{item.label}
				</li>
			))}
		</UL>
	);
};

const UL = styled("ul")({
	backgroundColor: Colors.gray9,
	margin: 0,
	padding: 0,
	flex: 1,
	li: {
		display: "flex",
		alignItems: "center",
		padding: "1rem 1rem",
		backgroundColor: Colors.gray9,
		minHeight: "2rem",
		margin: 0,
		fontSize: "1.5rem",
		cursor: "default",
		svg: {
			marginRight: "1rem",
			fontSize: "1.25rem",
		},
	},
	"li:nth-of-type(even)": {
		backgroundColor: Colors.gray8,
	},
	"li.selected": {
		backgroundColor: Colors.blue,
	},
});
