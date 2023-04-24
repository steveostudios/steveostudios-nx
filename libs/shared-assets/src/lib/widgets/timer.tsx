export enum TimerDirection {
	UP = "up",
	DOWN = "down",
}

export enum TimerPreAction {
	START = "start",
	COUNT = "count",
}

export enum TimerPostAction {
	STOP = "stop",
	REVERSE = "reverse",
	ALERT = "alert",
}

export enum TimerPosition {
	TOPLEFT = "topleft",
	TOPRIGHT = "topright",
	BOTTOMLEFT = "bottomleft",
	BOTTOMRIGHT = "bottomright",
	CENTER = "center",
	FULL = "full",
}

export interface Timer {
	show: boolean;
	time: number;
	elapsed: number;
	isPlaying: boolean;
	plate: boolean;
	position: TimerPosition;
	direction: TimerDirection;
	preAction: TimerPreAction;
	postAction: TimerPostAction;
}

// default
export const defaultTimerSettings: Timer = {
	show: false,
	time: 0,
	isPlaying: false,
	plate: false,
	position: TimerPosition.TOPRIGHT,
	elapsed: 0,
	direction: TimerDirection.DOWN,
	preAction: TimerPreAction.START,
	postAction: TimerPostAction.STOP,
};
