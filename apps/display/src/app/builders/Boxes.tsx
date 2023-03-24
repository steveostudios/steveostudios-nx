import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import {
	BoxesFile,
	BoxesItem,
	boxesLayouts,
	BoxesLayoutSingle,
	boxesThemes,
	GameState,
	NextWinnerType,
	PickmeFile,
	pickmeThemes,
	wheelThemes,
} from "@nx/shared-assets";

interface Props {
	file: BoxesFile;
}

export const Boxes: React.FC<Props> = (props) => {
	const { file } = props;
	const [layout, setLayout] = useState<BoxesLayoutSingle[] | []>([]);

	const theme = boxesThemes.find((item) => item.id === file.theme);

	useEffect(() => {
		setLayout(
			boxesLayouts[
				Object.entries(file.items).filter(([id, item]) => item.visible).length
			]
		);
		console.log();
	}, [file.items]);

	useEffect(() => {
		console.log(layout);
	}, [layout]);

	return (
		<SVG viewBox="0 0 1920 1080">
			{file.items &&
				layout.length &&
				Object.entries(file.items)
					.filter(([id, item]) => item.visible)
					.sort((a: [string, BoxesItem], b: [string, BoxesItem]) =>
						a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0
					)
					.map(([id, item], i) => (
						<Box
							key={id}
							x={layout[i]?.x * 1920 || 0}
							y={layout[i]?.y * 1080 || 0}
							width={layout[i]?.w * 1920 || 0}
							height={layout[i]?.h * 1080 || 0}
						>
							<Rect
								fill={`#${theme?.colors[item.color]}`}
								strokeWidth="-4"
								stroke={"transparent"}
								x={0}
								y={0}
								width={"100%"}
								height={"100%"}
							/>
							<Text x="50%" y="50%" width="100%">
								{item.name}
							</Text>
						</Box>
					))}
			{file.gameState === GameState.WINNER && (
				<Rect x="0" y="0" width="1920" height="1080" />
			)}
		</SVG>
	);
};

const SVG = styled("svg")({
	position: "absolute",
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	zIndex: 99,
	transition: "opacity 0.25s ease-in-out",
});

const Text = styled("text")({
	fill: Colors.white,
	fontSize: "10rem",
	textAnchor: "middle",
	dominantBaseline: "middle",
});

const Rect = styled("rect")({
	margin: "1rem",
	width: "calc(100% - 20px)",
	height: "calc(100% - 20px)",
	transform: `translate(calc(0 * (100% - 20px) + 10px), calc(0 * (100% - 20px) + 10px))`,
	transition: "all 0.25s ease-in-out",
});

const Box = styled("svg")({
	position: "absolute",
	display: "flex",
	transition: "all 0.25s ease-in-out",
	opacity: 0.5,
});
