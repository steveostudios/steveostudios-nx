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
}
