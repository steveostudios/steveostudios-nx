import styled from "@emotion/styled";
import { ReactNode } from "react";
import MainHeader from "./MainHeader";

interface Props {
  children: ReactNode;
}

const Main: React.FC<Props> = (props) => {

  return (
    <Container>
      <MainHeader />
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
