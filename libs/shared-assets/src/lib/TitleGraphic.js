// import react
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { storage } from "./../../integrations/firebase";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-position: center;
  background-size: cover;
  background-image: ${(props) => (props.url ? `url(${props.url})` : null)};
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity 0.25s ease-in-out;
  z-index: 100;
`;

const TitleGraphic = (props) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (props.titleGraphic) {
      storage
        .ref()
        .child("files")
        .child(props.id)
        .child(props.titleGraphic)
        .getDownloadURL()
        .then((url) => {
          setUrl(url);
        });
    }
  }, [props.id, props.titleGraphic]);

  return <Container active={props.active} url={url} />;
};

export default TitleGraphic;
