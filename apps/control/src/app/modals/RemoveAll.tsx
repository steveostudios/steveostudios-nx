import styled from "@emotion/styled";

const RemoveAllModal: React.FunctionComponent = (props) => {
  return (
    <Container>
      Are you sure you want to remove all items? This action cannot be undone.
    </Container>
  );
};

export default RemoveAllModal;

const Container = styled("div")({});
