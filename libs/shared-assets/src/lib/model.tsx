// Types
export enum Builders {
  PICKME = "pickme",
  WHEEL = "wheel",
  BOXES = "boxes",
}
export interface Item {
  id: string;
  name: string;
  visible: boolean;
  weight: number;
  order: number;
}

export interface File {
  userId: string;
  id: string;
  builder: Builders;
  settings: Settings;
  items:{ [id: string]: Item};
  name: string;
}

export interface Settings {
  titleGraphic: boolean;
  sounds: boolean;
  background: number;
  theme: number;
  instructionsContent: string;
  instructions: boolean; 
}

export interface SimpleFile {
  id: string;
  name: string;
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
