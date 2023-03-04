import styled from "@emotion/styled";

interface Props {
  userId: string;
}

const SidebarPreview: React.FC<Props> = (props) => {

  return (
    <Container>
      <IFrame src={`http://localhost:5201/${props.userId}`}
        title="preview"
        width={256}
        height={144}
      />
    </Container>
  );
};

export default SidebarPreview;

const Container = styled("div")({
  width: "32rem",
  height: "18rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden"

})

const IFrame = styled("iframe")({
  overflow: "hidden",
  border: "none",
})
