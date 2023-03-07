import styled from "@emotion/styled";

const DeleteFileModal: React.FunctionComponent = (props) => {  
  return (
    <Container>
      Are you sure you want to delete this file? This action cannot be undone.
    </Container>
  );
};

export default DeleteFileModal;

const Container = styled("div")({

});
