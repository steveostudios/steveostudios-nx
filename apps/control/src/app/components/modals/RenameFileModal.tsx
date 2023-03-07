import styled from "@emotion/styled";
import { TextArea, TextInput } from "@nx/ui";

export interface RenameFileModalData {
  id: string;
  value: string;
}

interface Props {
  data: RenameFileModalData;
  initialData: RenameFileModalData;
  setData: ({value}: RenameFileModalData)  => void;
}

const RenameFileModal: React.FunctionComponent<Props> = (props) => {
  console.log(props)
  return (
    <Container>
      <TextInput slug="name" value={
          props.data.value !== undefined
            ? props.data.value
            : props.initialData.value
        }
        onChange={(value) => props.setData({id: props.initialData.id, value: value})} />
    </Container>
  );
};

export default RenameFileModal;

const Container = styled("div")({

});
