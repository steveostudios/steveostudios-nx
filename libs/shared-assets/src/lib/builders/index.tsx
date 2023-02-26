// // titles
import boxesTitle from "./titles/boxes.jpg";
import countdownmakerTitle from "./titles/countdownmaker.jpg";
import emojihuntTitle from "./titles/emojihunt.jpg";
import leaderboardTitle from "./titles/leaderboard.jpg";
import photofuryTitle from "./titles/photofury.jpg";
import pickmeTitle from "./titles/pickme.jpg";
import pixelateTitle from "./titles/pixelate.jpg";
import presenterTitle from "./titles/presenter.jpg";
import surveysaysTitle from "./titles/surveysays.jpg";
import triviaTitle from "./titles/trivia.jpg";
import wheelofdestinyTitle from "./titles/wheelofdestiny.jpg";

import { ReactNode } from "react";

// // circles
// import boxesCircle from "./circles/boxes.png";
// import countdownmakerCircle from "./circles/countdownmaker.png";
// import emojihuntCircle from "./circles/emojihunt.png";
// import leaderboardCircle from "./circles/leaderboard.png";
// import photofuryCircle from "./circles/photofury.png";
// import pickmeCircle from "./circles/pickme.png";
// import pixelateCircle from "./circles/pixelate.png";
// import presenterCircle from "./circles/presenter.png";
// import surveysaysCircle from "./circles/surveysays.png";
// import triviaCircle from "./circles/trivia.png";
// import wheelofdestinyCircle from "./circles/wheelofdestiny.png";

interface Builder {
  slug: string;
  name: string;
  title: string;
}

export const builders:Builder[] =  [
  {
    slug: "BOXES",
    name: "Boxes",
    title: boxesTitle,
    // circle: boxesCircle,
  },
  {
    slug: "COUNTDOWNMAKER",
    name: "Countdown Maker",
    title: countdownmakerTitle,
    // circle: countdownmakerCircle,
  },
  {
    slug: "EMOJIHUNT",
    name: "EmojiHunt",
    title: emojihuntTitle,
    // circle: emojihuntCircle,
  },
  {
    slug: "LEADERBOARD",
    name: "Leaderboard",
    title: leaderboardTitle,
    // circle: leaderboardCircle,
  },
  {
    slug: "PHOTOFURY",
    name: "Photo Fury",
    title: photofuryTitle,
    // circle: photofuryCircle,
  },
  {
    slug: "PICKME",
    name: "pickme",
    title: pickmeTitle,
    // circle: pickmeCircle,
  },
  {
    slug: "PIXELATE",
    name: "pixelate",
    title: pixelateTitle,
    // circle: pixelateCircle,
  },
  {
    slug: "PRESENTER",
    name: "presenter",
    title: presenterTitle,
    // circle: presenterCircle,
  },
  {
    slug: "SURVEYSAYS",
    name: "surveysays",
    title: surveysaysTitle,
    // circle: surveysaysCircle,
  },
  {
    slug: "TRIVIA",
    name: "Trivia",
    title: triviaTitle,
    // circle: triviaCircle,
  },
  {
    slug: "WHEELOFDESTINY",
    name: "Wheel of Destiny",
    title: wheelofdestinyTitle,
    // circle: wheelofdestinyCircle,
  },
];