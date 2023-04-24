export interface Score {
	show: boolean;
	pointAmount: number;
	teams: { [id: string]: Team };
}

export interface Team {
	id: string;
	name: string;
	points: number;
	visible: boolean;
	order: number;
	color: string;
}

// default
export const defaultScoreSettings: Score = {
	pointAmount: 1,
	show: false,
	teams: {},
};

export const defaultScoreTeam: Omit<Team, "id"> = {
	name: "",
	points: 0,
	visible: true,
	order: 0,
	color: "ff0000",
};
