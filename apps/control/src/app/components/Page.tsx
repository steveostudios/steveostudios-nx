import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Page: React.FC<Props> = (props) => {
  return (  
      <Container>
        {props.children}
      </Container>
  );
};

export default Page;

const Container = styled("div")({
  display: "flex"
});
