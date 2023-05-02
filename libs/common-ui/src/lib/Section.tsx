import styled from "@emotion/styled";
import { Colors } from "@nx/style";

export const SectionFullHeight = styled("div")({
	overflow: "hidden",
	flex: 1,
});

export const SectionNoBorder = styled("div")({
	display: "flex",
	gap: "1rem",
	padding: "2rem 2rem 0 2rem",
});

export const Section = styled("div")(
	(props: {
		fullHeight?: boolean;
		border?: boolean;
		padding?: boolean;
		paddingBottom?: boolean;
		column?: boolean;
	}) => ({
		display: "flex",
		gap: "1rem",
		padding: props.padding ? "2rem" : 0,
		paddingBottom: props.paddingBottom ? "2rem" : 0,
		borderBottomColor: Colors.gray9,
		borderBottomWidth: props.border ? 1 : 0,
		borderBottomStyle: "solid",
		boxSizing: "border-box",
		flex: props.fullHeight ? 1 : "none",
		flexDirection: props.column ? "column" : "row",
		alignItems: props.column ? "unset" : "center",
		justifyContent: props.column ? "flex-start" : "space-between",
		overflow: props.fullHeight ? "hidden" : "unset",
		height: props.fullHeight && props.column ? "100%" : "unset",
		"> * ": {
			display: "flex",
			gap: "1rem",
		},
	})
);
