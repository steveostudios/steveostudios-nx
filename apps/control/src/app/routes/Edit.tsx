import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import {Button, List, TextInput} from "@nx/ui"
import { Skin } from "@nx/ui";
import DisplayOptions from "../components/Main/DisplayOptions";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import { fakeData, Item } from "../fake-data";

const Edit = () => {

  const onDoSomething = () => {
    return;
  }


  return (
    <Container>
      <Sidebar files={fakeData.files} />
      <Main>
        <Section>
          <DisplayOptions />
        </Section>
        <SectionNoBorder>
          <div>
            <Button icon="plus" slug="additem" onClick={onDoSomething} />
            <Button icon="plus-hexagon" slug="addbulkitems" onClick={onDoSomething} />
          </div>
          <div>
            <Button icon="eye" slug="showall" onClick={onDoSomething} />
            <Button icon="eye-slash" slug="hideall" onClick={onDoSomething} />
            <Button icon="trash" slug="removeall" onClick={onDoSomething} />
          </div>
        </SectionNoBorder>
        <Section>
          <List>
            {fakeData.files[0].items.map(item => <Row key={item.id} {...item} onChangeVisible={onDoSomething} onChangeName={onDoSomething} onRemove={onDoSomething}/>)}
          </List>
        </Section>
      </Main>
    </Container>
  );
};

export default Edit;

const Container = styled("div")({
  display: "grid",
  backgroundColor: Colors.gray10,
  height: "100vh",
  width: "100%",
  margin: 0,
  padding: 0,
  gridTemplateColumns: "32rem auto",
});

const Section = styled("div")({
  display: "flex",
  gap: "1rem",
  padding: "2rem",
  borderBottomColor: Colors.gray9,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
})
const SectionNoBorder = styled("div")({
  display: "flex",
  gap: "1rem",
  padding: "2rem 2rem 0 2rem",
  alignItems: "center",
  justifyContent: "space-between",
  "> * ": {
    display: "flex",
    gap: "1rem"
  }
})

interface RowProps extends Item {
  onChangeVisible: (id: string, value: boolean) => void;
  onChangeName: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

const Row: React.FC<RowProps> = (props) => {

  return (
    <RowContainer key={props.id}>
              {props.visible ? 
        <Button slug="visible" icon="eye" skin={Skin.clear} onClick={() => props.onChangeVisible(props.id, true)}/> : 
        <Button slug="hide" icon="eye-slash" skin={Skin.clear} onClick={() => props.onChangeVisible(props.id, false)}/>}
      <TextInput slug="name" value={props.name} onChange={(value) => props.onChangeName(props.id, value)} />
      <Button slug="delete" icon="trash" skin={Skin.clear} onClick={() => props.onRemove(props.id)}/>
    </RowContainer>
  )
}

const RowContainer = styled("li")({
  display: "flex",
  gap: "1rem",
})