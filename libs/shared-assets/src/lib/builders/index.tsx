// titles
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
// circles
import boxesCircle from "./circles/boxes.png";
import countdownmakerCircle from "./circles/countdownmaker.png";
import emojihuntCircle from "./circles/emojihunt.png";
import leaderboardCircle from "./circles/leaderboard.png";
import photofuryCircle from "./circles/photofury.png";
import pickmeCircle from "./circles/pickme.png";
import pixelateCircle from "./circles/pixelate.png";
import presenterCircle from "./circles/presenter.png";
import surveysaysCircle from "./circles/surveysays.png";
import triviaCircle from "./circles/trivia.png";
import wheelofdestinyCircle from "./circles/wheelofdestiny.png";

interface Builder {
  slug: string;
  name: string;
  title: string;
  circle: string;
  shortDescription: string;
}

export const builders:Builder[] =  [
  {
    slug: "boxes",
    name: "Boxes",
    title: boxesTitle,
    circle: boxesCircle,
    shortDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    slug: "countdownmaker",
    name: "Countdown Maker",
    title: countdownmakerTitle,
    circle: countdownmakerCircle,
    shortDescription: "Nullam tincidunt fringilla vehicula."
  },
  {
    slug: "emojihunt",
    name: "EmojiHunt",
    title: emojihuntTitle,
    circle: emojihuntCircle,
    shortDescription: "Suspendisse facilisis tempor lacus, vel dictum metus convallis vitae."
  },
  {
    slug: "leaderboard",
    name: "Leaderboard",
    title: leaderboardTitle,
    circle: leaderboardCircle,
    shortDescription: "Vivamus sagittis massa odio, vel iaculis lorem varius quis."
  },
  {
    slug: "photofury",
    name: "Photo Fury",
    title: photofuryTitle,
    circle: photofuryCircle,
    shortDescription: "Quisque eget sollicitudin ante, at iaculis quam."
  },
  {
    slug: "pickme",
    name: "Pickme",
    title: pickmeTitle,
    circle: pickmeCircle,
    shortDescription: "Sed et venenatis mauris."
  },
  {
    slug: "pixelate",
    name: "Pixelate",
    title: pixelateTitle,
    circle: pixelateCircle,
    shortDescription: "Pellentesque nec hendrerit lorem, non luctus elit."
  },
  {
    slug: "presenter",
    name: "Presenter",
    title: presenterTitle,
    circle: presenterCircle,
    shortDescription: "Nam quis bibendum nunc."
  },
  {
    slug: "surveysays",
    name: "Survey Says",
    title: surveysaysTitle,
    circle: surveysaysCircle,
    shortDescription: "Nullam in magna et nibh elementum rhoncus."
  },
  {
    slug: "trivia",
    name: "Trivia",
    title: triviaTitle,
    circle: triviaCircle,
    shortDescription: "Aenean ac elementum neque."
  },
  {
    slug: "wheelofdestiny",
    name: "Wheel of Destiny",
    title: wheelofdestinyTitle,
    circle: wheelofdestinyCircle,
    shortDescription: "Ut vel massa nec purus pretium hendrerit."
  },
];