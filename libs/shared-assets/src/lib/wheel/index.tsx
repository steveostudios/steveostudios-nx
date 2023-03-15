import { Builders, File, GameState, NextWinnerType, Item } from "../model";

export * from "./sizes"
export * from "./weights"
export * from "./themes"
export * from "./positions"

export interface WheelFile extends File {
  items:{ [id: string]: WheelItem};
  preselectedIds: string[];
  nextRandomId: string | null;
  nextPreselectedId: string | null;
  nextWinnerType: NextWinnerType;
  showPicker: boolean;
  hideLastItem: boolean;
  theme: number;
  position: number;
  spinCycle: string[];
  gameState: GameState
}

export interface WheelItem extends Item {
  weight: number;
  color: number;
  size: number;
  textAngle: number;
  startAngle: number;
  percent: number
}

export const wheelDefaultFile: Omit<WheelFile, "id"> = {
  builder: Builders.WHEEL,
  name: ",",
  preselectedIds: [],
  nextPreselectedId: null,
  nextRandomId: null,
  nextWinnerType: NextWinnerType.RANDOM,
  showPicker: true,
  hideLastItem: true,
  instructionsContent: ",",
  theme: 2,
  position: 1,
  background: 3,
  items: {},
  spinCycle: [],
  gameState: GameState.ADDMORE
}

