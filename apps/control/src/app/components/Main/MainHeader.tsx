import styled from "@emotion/styled";
import { Colors } from "@nx/style";

const MainHeader = () => {

  return (
    <Container>
      Edit Play
    </Container>
  );
};

export default MainHeader;

const Container = styled("div")({
  height: "8rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "transparent",
  borderBottomColor: Colors.gray9,
  display: "flex",
  alignItems: "center",
  padding: "0 2rem",
  justifyContent: "flex-start"
})