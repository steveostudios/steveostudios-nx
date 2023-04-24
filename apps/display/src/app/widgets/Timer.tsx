import React from "react";
import styled from "@emotion/styled";
import { Timer as ITimer, TimerPosition } from "@nx/shared-assets";
import { Colors } from "@nx/style";

interface Props {
	active: boolean;
	timer: ITimer;
}

export const Timer: React.FC<Props> = (props) => {
	return (
		<SVG
			viewBox="0 0 1920 1080"
			active={props.active}
			position={props.timer.position}
		>
			<Background
				x="0"
				y="0"
				width="1920"
				height="1080"
				showBackground={props.timer.plate}
			/>
			<Text x="50%" y="50%">
				3:28
				{/* {props.timer.time} */}
			</Text>
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
		transform: `scate(0.25) translate(20%, 20%)`,
		transition: "all 0.25s ease-in-out",
	},
	(props: { active: boolean; position: TimerPosition }) => {
		let options = {};
		if (props.active) {
			options = { ...options, opacity: 1 };
		}
		if (props.position === TimerPosition.FULL) {
			options = { ...options, transform: `translate(0, 0) scale(1)` };
		}
		if (props.position === TimerPosition.CENTER) {
			options = {
				...options,
				transform: `translate(0, 0) scale(0.35) `,
			};
		}
		if (props.position === TimerPosition.TOPLEFT) {
			options = {
				...options,
				transform: `translate(-35%, -35%) scale(0.25) `,
			};
		}
		if (props.position === TimerPosition.TOPRIGHT) {
			options = {
				...options,
				transform: `translate(35%, -35%) scale(0.25) `,
			};
		}
		if (props.position === TimerPosition.BOTTOMLEFT) {
			options = {
				...options,
				transform: `translate(-35%, 35%) scale(0.25) `,
			};
		}
		if (props.position === TimerPosition.BOTTOMRIGHT) {
			options = {
				...options,
				transform: `translate(35%, 35%) scale(0.25) `,
			};
		}
		return options;
	}
);

const Background = styled("rect")(
	{
		fill: Colors.black75,
		opacity: 0,
		transition: "opacity 0.25s ease-in-out",
	},
	(props: { showBackground?: boolean }) => {
		let options = {};
		if (props.showBackground) {
			options = { ...options, opacity: 1 };
		}
		return options;
	}
);

const Text = styled("text")({
	fill: Colors.white,
	fontSize: "60rem",
	textAnchor: "middle",
	dominantBaseline: "middle",
});
