import styled from "@emotion/styled";
import { Colors } from "./Colors";

export const Page = styled("div")({
	backgroundColor: Colors.white,
	color: Colors.black,
	minHeight: "100vh",
});

export const Container = styled("div")({
	margin: "0 auto",
	maxWidth: "160rem",
});

export const Section = styled("div")({
	gap: "2rem",
	display: "flex",
	flexDirection: "column",
	transition: "all 0.125s ease-in-out",
	width: "100%",
	paddingBottom: "3rem",
});

export const H2 = styled("h2")({
	display: "flex",
	userSelect: "none",
	gap: "1rem",
	minHeight: "3.5rem",
});

export const Table = styled("div")({
	display: "flex",
	flexDirection: "column",
	width: "100%",
});

export const Row = styled("div")({
	display: "flex",
	borderBottom: "1px solid var(--trim)",
	flexWrap: "wrap",
	flexDirection: "row",
	gap: "1rem",
	alignItems: "center",
	padding: "1rem 0",
});

export const RowBreak = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	"&:first-of-type": {
		flex: 1,
	},
});
