import styled from "@emotion/styled";

interface Props {
  userId: string;
}

const SidebarPreview: React.FC<Props> = (props) => {

  return (
    <Container>
      <IFrame src={`http://localhost:5201/${props.userId}`}
              title="preview"
              width={384}
              height={216} />

    </Container>
  );
};

export default SidebarPreview;


const Container = styled("div")({
  height: "19rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

const IFrame = styled("iframe")({
  width: "100%",
  height: "auto",
  overflow: "hidden",
  border: "none",
})
