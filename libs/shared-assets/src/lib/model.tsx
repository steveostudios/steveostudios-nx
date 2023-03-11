import { BoxesFile, BoxesTheme } from "./boxes";
import { PickmeFile, PickmeTheme } from "./pickme";
import { WheelFile, WheelTheme } from "./wheel";

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
  WINNER = "winner"
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

export interface SimpleFile {
  id: string;
  name: string;
  builder: Builders;
}

export enum Modes {
  EDIT = "edit",
  PLAY = "play"
}

export interface UserSettings {
  titleGraphic: boolean;
  sounds: boolean;
  instructions: boolean;
  selectedMode: Modes;
  selectedFileId: string | null;
}
