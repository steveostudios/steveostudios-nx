import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { Colors } from "@nx/style";

interface Props {
	children: ReactNode;
	hideBorder?: boolean;
}

export const List: React.FC<Props> = (props) => {
	return (
		<Container hideBorder={props.hideBorder}>
			<UL>{props.children}</UL>
		</Container>
	);
};

const Container = styled("div")((props: { hideBorder?: boolean }) => ({
	backgroundColor: Colors.gray10,
	flex: 1,
	height: "100%",
	boxSizing: "border-box",
	borderWidth: "1px",
	borderStyle: "solid",
	borderColor: props.hideBorder ? "transparent" : Colors.gray9,
	overflowY: "scroll",
}));

const UL = styled("ul")({
	listStyle: "none",
	width: "100%",
	margin: 0,
	padding: 0,
	flexDirection: "column",
	flex: 1,
	li: {
		backgroundColor: Colors.gray10,
		minHeight: "3rem",
		margin: 0,
		gap: "1rem",
	},
	"li:nth-of-type(odd)": {
		backgroundColor: Colors.gray9,
	},
	"li.selected": {
		backgroundColor: Colors.blue,
	},
});
