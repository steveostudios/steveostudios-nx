// // import react
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import theme001 from "./../../assets/pickme/theme-file001.png";
// import theme002 from "./../../assets/pickme/theme-file002.png";
// import theme003 from "./../../assets/pickme/theme-file003.png";
// import theme004 from "./../../assets/pickme/theme-file004.png";
// import theme005 from "./../../assets/pickme/theme-file005.png";
// import theme006 from "./../../assets/pickme/theme-file006.png";
// import theme007 from "./../../assets/pickme/theme-file007.png";
// import theme008 from "./../../assets/pickme/theme-file008.png";

// const Container = styled.div`
//   position: absolute;
//   width: 100%;
//   top: 0;
//   z-index: 1;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Text = styled.div`
//   display: flex;
//   height: initial;
//   font-size: 3rem;
//   padding: 2rem;
//   position: absolute;
//   z-index: 1;
// `;

// const Theme = styled.div`
//   position: relative;
//   width: 100%;
//   top: 0;
//   z-index: 1;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-position: center;
//   background-size: cover;
//   background-image: ${(props) =>
//     props.theme === 1
//       ? `url("${theme001}")`
//       : props.theme === 2
//       ? `url("${theme002}")`
//       : props.theme === 3
//       ? `url("${theme003}")`
//       : props.theme === 4
//       ? `url("${theme004}")`
//       : props.theme === 5
//       ? `url("${theme005}")`
//       : props.theme === 6
//       ? `url("${theme006}")`
//       : props.theme === 7
//       ? `url("${theme007}")`
//       : props.theme === 8
//       ? `url("${theme008}")`
//       : null};
// `;

// const Pickme = (props) => {
//   const [text, setText] = useState("");
//   const [lastSpunItem, setLastSpunItem] = useState(null);

//   function tick() {
//     // var keys = Object.keys(props.items);

//     const items = Object.entries(props.items)
//       .map((item) => {
//         return { id: item[0], ...item[1] };
//       })
//       .filter((item) => item.visible)
//       .filter((item) => item.id !== lastSpunItem);
//     const randomItem = items[Math.floor(Math.random() * items.length)];
//     setText(randomItem.name);
//     setLastSpunItem(randomItem.id);
//   }

//   useEffect(() => {
//     var timerID;
//     if (props.settings.gameState === 2) {
//       timerID = setInterval(() => tick(), 100);
//     } else {
//       clearInterval(timerID);
//     }

//     return function cleanup() {
//       clearInterval(timerID);
//     };
//   });

//   useEffect(() => {
//     const gameState = props.settings.gameState;
//     if (gameState === 1) {
//       setText("Get Ready");
//     } else if (gameState === 2) {
//       setText("Spinning...");
//     } else if (gameState === 3) {
//       const nextWinner =
//         props.settings.nextWinner === "random"
//           ? props.settings.nextRandomWinner
//           : props.settings.nextPickedWinner;
//       setText(props.items[nextWinner].name);
//     } else {
//       setText("Add mroe items");
//     }
//   }, [props.settings, props.items]);

//   return props.items ? (
//     <Container>
//       <Theme theme={parseInt(props.settings.theme)} />
//       <Text>{text}</Text>
//     </Container>
//   ) : null;
// };

// export default Pickme;
