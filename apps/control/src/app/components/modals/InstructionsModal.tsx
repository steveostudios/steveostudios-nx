import styled from "@emotion/styled";
import { TextArea } from "@nx/ui";

export interface InstructionsModalData {
  value: string;
}

interface Props {
  data: InstructionsModalData;
  initialData: InstructionsModalData;
  setData: ({value}: InstructionsModalData)  => void;
}

const InstructionsModal: React.FunctionComponent<Props> = (props) => {
  console.log(props)
  return (
    <Container>
      <TextArea slug="instructions" value={
          props.data.value !== undefined
            ? props.data.value
            : props.initialData.value
        }
        onChange={(value) => props.setData({value: value})} />
    </Container>
  );
};

export default InstructionsModal;

const Container = styled("div")({

});
