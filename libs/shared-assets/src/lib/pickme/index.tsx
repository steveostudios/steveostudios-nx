import { Option } from "@nx/ui";
import { Builders, File, GameState, Item, NextWinnerType } from "../model";
import thumb001 from "./theme-thumb001.png";
import thumb002 from "./theme-thumb002.png";
import thumb003 from "./theme-thumb003.png";
import thumb004 from "./theme-thumb004.png";
import thumb005 from "./theme-thumb005.png";
import thumb006 from "./theme-thumb006.png";
import thumb007 from "./theme-thumb007.png";
import thumb008 from "./theme-thumb008.png";
import file001 from "./theme-file001.png";
import file002 from "./theme-file002.png";
import file003 from "./theme-file003.png";
import file004 from "./theme-file004.png";
import file005 from "./theme-file005.png";
import file006 from "./theme-file006.png";
import file007 from "./theme-file007.png";
import file008 from "./theme-file008.png";

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

export interface PickmeTheme {
  id: number;
  name: string;
  thumb: string;
  file: string;
}

export const pickmeThemes: PickmeTheme[] = [
  {
    id: 1,
    name: "Marquee",
    thumb: thumb001,
    file: file001,
  },
  {
    id: 2,
    name: "LED",
    thumb: thumb002,
    file: file002,
  },
  {
    id: 3,
    name: "Golden Ticket",
    thumb: thumb003,
    file: file003,
  },
  {
    id: 4,
    name: "Naked Dark",
    thumb: thumb004,
    file: file004,
  },
  {
    id: 5,
    name: "Naked Light",
    thumb: thumb005,
    file: file005,
  },
  {
    id: 6,
    name: "Box Dark",
    thumb: thumb006,
    file: file006,
  },
  {
    id: 7,
    name: "Box Light",
    thumb: thumb007,
    file: file007,
  },
  {
    id: 8,
    name: "Flux Capacitor",
    thumb: thumb008,
    file: file008,
  },
];

export const pickmeWeights: Option[] = [
  { name: "Most likely to win", value: 3 },
  { name: "Likely to win", value: 2 },
  { name: "Least Likely to win", value: 1 },
  { name: "Never win", value: 0 },
];

