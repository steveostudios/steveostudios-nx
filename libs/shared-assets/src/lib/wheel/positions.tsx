import position001 from "./assets/position01.png";
import position002 from "./assets/position02.png";
import position003 from "./assets/position03.png";
import position004 from "./assets/position04.png";
import position005 from "./assets/position05.png";

export interface WheelPosition {
	id: number;
	name: string;
	thumb: string;
	css: {
		top: number;
		left: number;
		scale: number;
		rotation: number;
	};
}

export const wheelPositions: WheelPosition[] = [
	{
		id: 1,
		name: "Left",
		thumb: position001,
		css: { top: 0, left: -60, scale: 1.2, rotation: 0 },
	},
	{
		id: 2,
		name: "Left-Big",
		thumb: position002,
		css: { top: 0, left: -65, scale: 2, rotation: 0 },
	},
	{
		id: 3,
		name: "Left-Left",
		thumb: position003,
		css: { top: 0, left: -100, scale: 2, rotation: 0 },
	},
	{
		id: 4,
		name: "Bottom",
		thumb: position004,
		css: { top: 40, left: 0, scale: 1.5, rotation: -90 },
	},
	{
		id: 5,
		name: "Center",
		thumb: position005,
		css: { top: 0, left: 0, scale: 0.85, rotation: 0 },
	},
];
