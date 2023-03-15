import thumb001 from "./assets/theme-thumb001.png";
import thumb002 from "./assets/theme-thumb002.png";
import thumb003 from "./assets/theme-thumb003.png";
import thumb004 from "./assets/theme-thumb004.png";
import thumb005 from "./assets/theme-thumb005.png";
import thumb006 from "./assets/theme-thumb006.png";
import thumb007 from "./assets/theme-thumb007.png";
import thumb008 from "./assets/theme-thumb008.png";
import file001 from "./assets/theme-file001.png";
import file002 from "./assets/theme-file002.png";
import file003 from "./assets/theme-file003.png";
import file004 from "./assets/theme-file004.png";
import file005 from "./assets/theme-file005.png";
import file006 from "./assets/theme-file006.png";
import file007 from "./assets/theme-file007.png";
import file008 from "./assets/theme-file008.png";

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