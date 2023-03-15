import { Builders, File, GameState, Item, NextWinnerType } from "../model";

export * from "./themes"
export * from "./weights"
export * from "./layouts"

export interface BoxesFile extends File {
  items:{ [id: string]: BoxesItem};
  preselectedIds: string[];
  nextRandomId: string | null;
  nextPreselectedId: string | null;
  nextWinnerType: NextWinnerType;
  showPicker: boolean;
  hideLastItem: boolean;
  theme: number;
  spinCycle: string[];
  gameState: GameState
}

export interface BoxesItem extends Item {
  weight: number;
  color: number;
  emoji: string;
}

export const boxesDefaultFile: Omit<BoxesFile, "id"> = {
  builder: Builders.BOXES,
  name: "",
  preselectedIds: [],
  nextPreselectedId: null,
  nextRandomId: null,
  nextWinnerType: NextWinnerType.RANDOM,
  showPicker: true,
  hideLastItem: true,
  instructionsContent: "",
  theme: 2,
  background: 3,
  items: {},
  spinCycle: [],
  gameState: GameState.ADDMORE
}
