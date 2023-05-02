import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { Label } from "./Label";

interface Props {
	children: ReactNode;
	slug: string;
	label?: string;
	flex?: boolean;
}

export const ButtonGroup: React.FC<Props> = (props) => {
	return (
		<Container>
			<Label slug={props.slug} label={props.label} />
			<Group flex={props.flex || false}>{props.children}</Group>
		</Container>
	);
};

const Container = styled("div")({
	display: "flex",
	flex: 1,
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
});

const Group = styled("div")((props: { flex: boolean }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	flex: props.flex ? 1 : "none",
	"> div": {
		flex: props.flex ? 1 : "unset",
	},
	"> div button": {
		width: props.flex ? "100%" : "unset",
		borderRadius: 0,
	},
	"> div:first-of-type button": {
		borderRadius: "0.5rem 0 0 0.5rem",
	},
	"> div:last-of-type button": {
		borderRadius: "0 0.5rem 0.5rem 0",
	},
}));
