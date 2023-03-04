import { Option } from "@nx/ui";
import { Builders, File } from "../model";
import thumb001 from "./theme-thumb001.png";
import thumb002 from "./theme-thumb002.png";
import thumb003 from "./theme-thumb003.png";
import thumb004 from "./theme-thumb004.png";
import thumb005 from "./theme-thumb005.png";
import thumb006 from "./theme-thumb006.png";
import thumb007 from "./theme-thumb007.png";
import thumb008 from "./theme-thumb008.png";

export const pickmeDefaultFile: Omit<File, "id"> = {
  builder: Builders.PICKME,
  name: "",
  userId: "",
  settings: {
    titleGraphic: false,
    instructions: false,
    sounds: true,
    instructionsContent: "",
    theme: 2,
    background: 3
  },
  items: {}
}

interface Themes {
  id: number;
  name: string;
  thumb: string;
  file: string;
}

export const pickmeThemes: Themes[] = [
  {
    id: 1,
    name: "Marquee",
    thumb: thumb001,
    file: "theme-file001.png",
  },
  {
    id: 2,
    name: "LED",
    thumb: thumb002,
    file: "theme-file002.png",
  },
  {
    id: 3,
    name: "Golden Ticket",
    thumb: thumb003,
    file: "theme-file003.png",
  },
  {
    id: 4,
    name: "Naked Dark",
    thumb: thumb004,
    file: "theme-file004.png",
  },
  {
    id: 5,
    name: "Naked Light",
    thumb: thumb005,
    file: "theme-file005.png",
  },
  {
    id: 6,
    name: "Box Dark",
    thumb: thumb006,
    file: "theme-file006.png",
  },
  {
    id: 7,
    name: "Box Light",
    thumb: thumb007,
    file: "theme-file007.png",
  },
  {
    id: 8,
    name: "Flux Capacitor",
    thumb: thumb008,
    file: "theme-file008.png",
  },
];

export const pickmeWeights: Option[] = [
  { name: "Most likely to win", value: 3 },
  { name: "Likely to win", value: 2 },
  { name: "Least Likely to win", value: 1 },
  { name: "Never win", value: 0 },
];
