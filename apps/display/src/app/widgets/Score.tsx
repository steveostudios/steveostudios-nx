import React from "react";
import styled from "@emotion/styled";
import { Score as IScore } from "@nx/shared-assets";
import { Colors } from "@nx/style";

interface Props {
	active: boolean;
	score: IScore;
}

export const Score: React.FC<Props> = (props) => {
	return (
		<SVG viewBox="0 0 1920 1080" active={props.active}>
			{Object.entries(props.score.teams).map(([id, item]) => (
				<g key={id}>
					<Text x="50%" y="50%">
						{item.name}
					</Text>
					<Text x="50%" y="60%">
						{item.points}
					</Text>
				</g>
			))}
			<text></text>
		</SVG>
	);
};

const SVG = styled("svg")(
	{
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 99,
		opacity: 0,
		transition: "opacity 0.25s ease-in-out",
	},
	(props: { active: boolean }) => {
		let options = {};
		if (props.active) {
			options = { ...options, opacity: 1 };
		}
		return options;
	}
);

const Text = styled("text")({
	fill: Colors.white,
	fontSize: "10rem",
	textAnchor: "middle",
	dominantBaseline: "middle",
});
