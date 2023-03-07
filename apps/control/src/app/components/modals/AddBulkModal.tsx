import styled from "@emotion/styled";
import { TextArea } from "@nx/ui";
import { useState } from "react";

export interface AddBulkModalData {
  value: string;
}

interface Props {
  data: AddBulkModalData;
  setData: ({value}: AddBulkModalData)  => void;
}

const AddBulkModal: React.FunctionComponent<Props> = (props) => {
  return (
    <Container>
      <TextArea slug="instructions" value={props.data.value}
        onChange={(value) => props.setData({value: value})} />
    </Container>
  );
};

export default AddBulkModal;

const Container = styled("div")({

});
