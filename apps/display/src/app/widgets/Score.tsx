import React from "react";
import styled from "@emotion/styled";
import { Score as IScore, Team } from "@nx/shared-assets";
import { Colors } from "@nx/style";

interface Props {
	active: boolean;
	score: IScore;
}

export const Score: React.FC<Props> = (props) => {
	const count = Object.entries(props.score.teams).filter(
		([id, item]) => item.visible
	).length;
	return (
		<SVG viewBox="0 0 1920 1080" active={props.active}>
			{Object.entries(props.score.teams)
				.filter(([id, item]) => item.visible)
				.sort((a: [string, Team], b: [string, Team]) =>
					a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0
				)
				.map(([id, item], i) => {
					const h = 200;
					const x = (1920 / count) * i;
					const w = 1920 / count;
					const y = 1080 - 200;
					const xMid = (1920 / count) * i + w / 2;
					const yMid = y + h / 2;
					return (
						<g key={id}>
							<Rect x={x} y={y} height={h} width={w} fill={item.color} />
							<Name x={xMid} y={yMid - 10}>
								{item.name}
							</Name>
							<Points x={xMid} y={yMid + 10}>
								{item.points}
							</Points>
						</g>
					);
				})}
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
		transition: "all 0.25s ease-in-out",
	},
	(props: { active: boolean }) => {
		let options = {};
		if (props.active) {
			options = { ...options, opacity: 1 };
		}
		return options;
	}
);

const Rect = styled("rect")({
	transition: "all 0.25s ease-in-out",
});

const Name = styled("text")({
	fill: Colors.white,
	fontSize: "10rem",
	textAnchor: "middle",
	dominantBaseline: "auto",
});
const Points = styled("text")({
	fill: Colors.white,
	fontSize: "10rem",
	textAnchor: "middle",
	dominantBaseline: "hanging",
});
