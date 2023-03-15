import thumb001 from "./assets/theme-thumb001.svg";
import thumb002 from "./assets/theme-thumb002.svg";
import thumb003 from "./assets/theme-thumb003.svg";
import thumb004 from "./assets/theme-thumb004.svg";
import thumb005 from "./assets/theme-thumb005.svg";
import thumb006 from "./assets/theme-thumb006.svg";
import thumb007 from "./assets/theme-thumb007.svg";
import thumb008 from "./assets/theme-thumb008.svg";
import thumb009 from "./assets/theme-thumb009.svg";
import thumb010 from "./assets/theme-thumb010.svg";
import thumb011 from "./assets/theme-thumb011.svg";
import thumb012 from "./assets/theme-thumb012.svg";
import thumb013 from "./assets/theme-thumb013.svg";
import thumb014 from "./assets/theme-thumb014.svg";
import thumb015 from "./assets/theme-thumb015.svg";

export interface BoxesTheme {
  id: number;
  name: string;
  thumb: string;
  colors: string[];
}

export const boxesThemes: BoxesTheme[] = [
  {
    id: 1,
    name: "Marquee",
    thumb: thumb001,
    colors: ["013E57","8AA634","F79C2C","F7561B","DE1428"]
  },
  {
    id: 2,
    name: "LED",
    thumb: thumb002,
    colors: ["003B49","076773","1FA7B1","9CC84B","D3E65F"]
  },
  {
    id: 3,
    name: "Golden Ticket",
    thumb: thumb003,
    colors: ["82336B","501B35","731630","CC1E2C","FF5434"]
  },
  {
    id: 4,
    name: "Naked Dark",
    thumb: thumb004,
    colors: ["666666","555555","444444","333333","222222"]
  },
  {
    id: 5,
    name: "Naked Light",
    thumb: thumb005,
    colors: ["BF1616","E90C0C","E94247","920101","600000"]
  },
  {
    id: 6,
    name: "Box Dark",
    thumb: thumb006,
    colors: ["D0002C","A70007","35580F","487617","63A029"]
  },
  {
    id: 7,
    name: "Box Light",
    thumb: thumb007,
    colors: ["324D5C","46B29D","F0CA4D","E37B40","DE5B49"]
  },
  {
    id: 8,
    name: "Flux Capacitor",
    thumb: thumb008,
    colors: ["E97778","89C7B6","FFD57E","AD84C7","7998C9"]
  },
  {
    id: 9,
    name: "Flux Capacitor",
    thumb: thumb009,
    colors: ["0EB5FD","00DEA2","F4652D","ED2727","FFB300"]
  },
  {
    id: 10,
    name: "Flux Capacitor",
    thumb: thumb010,
    colors: ["333333","444444","555555","666666","C51725"]
  },
  {
    id: 11,
    name: "Flux Capacitor",
    thumb: thumb011,
    colors: ["32450C","717400","DC8505","EC5519","BE2805"]
  },
  {
    id: 12,
    name: "Flux Capacitor",
    thumb: thumb012,
    colors: ["006C8C","008A6E","549E39","8AB833","C0CF3A"]
  },
  {
    id: 13,
    name: "Flux Capacitor",
    thumb: thumb013,
    colors: ["255076","3C8083","559E8D","A09B89","76A4C6"]
  },
  {
    id: 14,
    name: "Flux Capacitor",
    thumb: thumb014,
    colors: ["60A0D4","007DBA","00205B","E57200","E8291C"]
  },
  {
    id: 15,
    name: "Flux Capacitor",
    thumb: thumb015,
    colors: ["E80F46","FF6E19","A223FF","1447E8","1ADAD3"]
  },
];
