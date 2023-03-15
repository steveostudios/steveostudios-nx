import { Builders, File, GameState, Item, NextWinnerType } from "../model";

export * from "./themes"
export * from "./weights"

export interface PickmeFile extends File {
  items:{ [id: string]: PickmeItem};
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

export interface PickmeItem extends Item {
  weight: number;
}

export const pickmeDefaultFile: Omit<PickmeFile, "id"> = {
  builder: Builders.PICKME,
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





