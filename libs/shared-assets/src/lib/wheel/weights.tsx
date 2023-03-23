import { Option } from "@nx/ui";

export const wheelWeights: Option[] = [
	{ name: "Most likely to win", value: 3, icon: ["fas", "circle"] },
	{ name: "Likely to win", value: 2, icon: ["fas", "dot-circle"] },
	{ name: "Least Likely to win", value: 1, icon: ["fal", "circle"] },
	{ name: "Never win", value: 0, icon: ["fas", "ban"] },
];
