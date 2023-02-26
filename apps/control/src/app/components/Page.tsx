import styled from "@emotion/styled";
import { Modal } from "@nx/ui";
import { ReactElement, ReactNode, useMemo, useState } from "react";
import { ModalContext, ModalProps } from "../providers/ModalProvider";

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
