import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import {
	BoxesFile,
	BoxesItem,
	boxesLayouts,
	BoxesLayoutSingle,
	boxesThemes,
} from "@nx/shared-assets";

interface Props {
	file: BoxesFile;
}

interface Layout {
	x: number;
	y: number;
	w: number;
	h: number;
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
	}, [file.items]);

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
						<Item
							name={item.name}
							x={layout[i]?.x * 1920 || 0}
							key={id}
							y={layout[i]?.y * 1080 || 0}
							width={layout[i]?.w * 1920 || 0}
							color={`#${theme?.colors[item.color]}`}
							height={layout[i]?.h * 1080 || 0}
							layout={layout[i] || { x: 0, y: 0, w: 0, h: 0 }}
						/>
					))}
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

interface ItemProps {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	name: string;
	layout: Layout;
}

const Item: React.FC<ItemProps> = (props) => {
	const [fontSize, setFontSize] = useState(80);
	const box = useRef<SVGTextElement>(null);
	const textboxRef = useRef<SVGForeignObjectElement>(null);
	const textRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const textBox = textboxRef.current?.getClientRects()[0];
		const text = textRef.current?.getClientRects()[0];

		if (
			textBox &&
			text &&
			(textBox.width < text.width || textBox?.height < text?.height)
		) {
			console.log(props.name);
			setFontSize(40);
		}
	}, [box, props.name, props.width, fontSize]);

	return (
		<Box>
			<Rect fill={props.color} layout={props.layout} />
			<TextFO
				ref={textboxRef}
				x="10"
				y="10"
				layout={props.layout}
				style={{ fontSize: fontSize }}
			>
				<span ref={textRef}>{props.name}</span>
			</TextFO>
		</Box>
	);
};

const Box = styled("svg")((props: {}) => ({
	transition: "all 0.25s ease-in-out",
	opacity: 0.5,
}));

const Rect = styled("rect")((props: { layout: Layout }) => ({
	x: props.layout.x * 1920,
	y: props.layout.y * 1080,
	margin: "1rem",
	width: props.layout.w * 1920 - 20 + "px",
	height: props.layout.h * 1080 - 20 + "px",
	transform: `translate(calc(0 * (100% - 20px) + 10px), calc(0 * ( 100% - 20px) + 10px))`,
	transition: "all 0.25s ease-in-out",
}));

const TextFO = styled("foreignObject")((props: { layout: Layout }) => ({
	fill: Colors.white,
	textAnchor: "middle",
	dominantBaseline: "middle",
	x: props.layout.x * 1920 + 40,
	y: props.layout.y * 1080 + props.layout.h * (1080 / 2) + 20,
	margin: "1rem",
	width: props.layout.w * 1920 - 80 + "px",
	height: props.layout.h * (1080 / 2) - 80 + "px",
	transition: "all 0.25s ease-in-out",
	overflow: "visible",
}));
