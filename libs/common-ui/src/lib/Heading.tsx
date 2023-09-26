import styled from "@emotion/styled";
import { Button, ButtonProps } from "./Button";
import { H2 } from "./Layout";
import React from "react";

interface HeadingProps {
	title: string;
	options?: HeadingOptionProps[];
}

interface HeadingOptionProps extends ButtonProps {}

export const Heading: React.FC<HeadingProps> = (props) => {
	return (
		<HeadingStyled>
			<H2>{props.title}</H2>
			<HeadingOptions>
				{props.options?.map((option) => (
					<Button key={option.slug} {...option} />
				))}
			</HeadingOptions>
		</HeadingStyled>
	);
};

const HeadingStyled = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	minHeight: "4rem",
	gap: "1rem",
});

const HeadingOptions = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	justifyContent: "flex-end",
});
