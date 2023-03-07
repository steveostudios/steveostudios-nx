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
export interface Item {
  id: string;
  name: string;
  visible: boolean;
  weight: number;
  order: number;
}

export interface File {
  id: string;
  builder: Builders;
  items:{ [id: string]: Item};
  name: string;
  preselectedIds: string[];
  nextRandomId: string | null;
  nextPreselectedId: string | null;
  nextWinnerType: NextWinnerType;
  showPicker: boolean;
  hideLastItem: boolean;
  background: number;
  theme: number;
  instructionsContent: string;
}

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
