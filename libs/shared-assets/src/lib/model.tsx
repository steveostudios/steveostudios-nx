import { BoxesFile, BoxesItem, BoxesTheme } from "./boxes";
import { PickmeFile, PickmeItem, PickmeTheme } from "./pickme";
import {
	defaultLogoSettings,
	defaultScoreSettings,
	defaultTimerSettings,
	Logo,
	Score,
	Timer,
	Widgets,
} from "./widgets";
import { WheelFile, WheelItem, WheelTheme } from "./wheel";

// Types
export enum Builders {
	PICKME = "pickme",
	WHEEL = "wheel",
	BOXES = "boxes",
}

export enum NextWinnerType {
	RANDOM = "random",
	PRESELECTED = "preselected",
}

export enum GameState {
	ADDMORE = "addmore",
	READY = "ready",
	SPINNING = "spinning",
	WINNER = "winner",
}
export interface Item {
	id: string;
	name: string;
	visible: boolean;
	order: number;
}

export interface File {
	id: string;
	builder: Builders;
	name: string;
	background: number;
	instructionsContent: string;
}

export type AnyFile = PickmeFile | WheelFile | BoxesFile;

export type AnyTheme = PickmeTheme | WheelTheme | BoxesTheme;

export type AnyItems = PickmeItem | WheelItem | BoxesItem;

export interface SimpleFile {
	id: string;
	name: string;
	builder: Builders;
}

export enum Modes {
	EDIT = "edit",
	PLAY = "play",
}

export interface UserSettings {
	titleGraphic: boolean;
	sounds: boolean;
	instructions: boolean;
	selectedMode: Modes;
	selectedFileId: string | null;
	selectedWidget: Widgets;
	score: Score;
	timer: Timer;
	logo: Logo;
}

export const defaultUserSettings: UserSettings = {
	titleGraphic: false,
	sounds: true,
	instructions: false,
	selectedMode: Modes.EDIT,
	selectedFileId: null,
	selectedWidget: Widgets.LOGO,
	score: defaultScoreSettings,
	timer: defaultTimerSettings,
	logo: defaultLogoSettings,
};

console.log(defaultUserSettings);
