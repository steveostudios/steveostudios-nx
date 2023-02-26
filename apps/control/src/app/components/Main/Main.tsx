import styled from "@emotion/styled";
import { ReactNode } from "react";
import MainHeader from "./MainHeader";

interface Props {
  children: ReactNode;
  selectedFileId: string | null;
  titleGraphic: boolean;
  sounds: boolean;
  instructions: boolean;
}

const Main: React.FC<Props> = (props) => {

  return (
    <Container>
      <MainHeader selectedFileId={props.selectedFileId} titleGraphic={props.titleGraphic} sounds={props.sounds} instructions={props.instructions} />
      <Wrapper>
        {props.children}
        </Wrapper>
    </Container>
  );
};

export default Main;

const Container = styled("main")({
  flex: 1,
})

const Wrapper = styled("div")({
})
