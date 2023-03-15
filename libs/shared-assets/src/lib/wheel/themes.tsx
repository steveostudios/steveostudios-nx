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

export interface WheelTheme {
  id: number;
  name: string;
  thumb: string;
  colors: string[];
}

export const wheelThemes: WheelTheme[] = [
  {
    id: 1,
    name: "Marquee",
    thumb: thumb001,
    colors: ["C11030","EE6D21","FFCA38","72BF53","00A763","0077B8","5A2D8D","A41E8A"]
  },
  {
    id: 2,
    name: "LED",
    thumb: thumb002,
    colors: ["FBAE30","EB6A3C","CE4356","C10C2E","990D24","640917","5D1F54","2E0F2B"]
  },
  {
    id: 3,
    name: "Golden Ticket",
    thumb: thumb003,
    colors: ["003C4B","008B70","549E45","8BB846","C3CF4F","4FCFBC","0390B5","006E8B"]
  },
  {
    id: 4,
    name: "Naked Dark",
    thumb: thumb004,
    colors: ["D62D0E","DE4B15","E3691C","F38624","FFA32D","E48408","B52703","A01B02"]
  },
  {
    id: 5,
    name: "Naked Light",
    thumb: thumb005,
    colors: ["003158","00458A","0076D4","0D8BEF","2D9FFA","5FBAFA","025AA1","001C32"]
  },
  {
    id: 6,
    name: "Box Dark",
    thumb: thumb006,
    colors: ["50B4ED","082F3A","105062","009086","6CD686","FFAE4C","FF5443","368ABB"]
  },
  {
    id: 7,
    name: "Box Light",
    thumb: thumb007,
    colors: ["C10006","D0202D","DF3D36","F25B3E","D5290E","5B0012","7B0018","D33957"]
  },
  {
    id: 8,
    name: "Flux Capacitor",
    thumb: thumb008,
    colors: ["2C3037","3D4149","515761","646A75","797F8A","959BA6","B22A36","F7CB57"]
  },
  {
    id: 9,
    name: "Flux Capacitor",
    thumb: thumb009,
    colors: ["468BB2","46B29D","F0CA4D","EB6A3C","DE5B49","B34141","6D4E8C","324D5C"]
  },
  {
    id: 10,
    name: "Flux Capacitor",
    thumb: thumb010,
    colors: ["AD84C7","E97778","FFB47E","FFD57E","92C789","89C7E1","60AACA","8D6BA3"]
  },
  {
    id: 11,
    name: "Flux Capacitor",
    thumb: thumb011,
    colors: ["CE3E1D","32450C","717400","ECA82C","D88000","C84D07","EA651B","AF2202"]
  },
  {
    id: 12,
    name: "Flux Capacitor",
    thumb: thumb012,
    colors: ["255076","3C8183","559E8D","86CBBC","C6C0AA","A09B89","76A4C6","49789B"]
  },
  {
    id: 13,
    name: "Flux Capacitor",
    thumb: thumb013,
    colors: ["0EB5FD","42E9F4","00DEA2","FFD944","EFAB0A","F4652D","ED2727","484DC0"]
  },
  {
    id: 14,
    name: "Flux Capacitor",
    thumb: thumb014,
    colors: ["4D87B1","2A638C","FECC53","F2A336","D24D25","A11D03","45A170","2D734D"]
  },
];

