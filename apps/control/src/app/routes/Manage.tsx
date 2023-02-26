import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import {Button, List, TextInput} from "@nx/ui"
import { Skin } from "@nx/ui";
import { useEffect, useState } from "react";
import DisplayOptions from "../components/Main/DisplayOptions";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import { onGetFile, File, Item, onSetFile } from "../integrations/firebase";
import { useModals } from "../providers/ModalProvider";

const TestModal: React.FC = () => {
  return (
    <div>Hello there</div>
  )
}

const Manage = () => {
  const userId = "iBfXqM9uuEWBMv8bEARIaQgwJFI3";
  const [selectedFileId, setSelectedFileId] = useState<string | null>("MtEyqt2j6NLs5nO8vIOA")
  const [file, setFile] = useState<File | undefined>()

  const { push } = useModals();


  useEffect(() => {
    if (selectedFileId) {
      onGetFile(selectedFileId, (data) => setFile({...data}))
    }
  }, [selectedFileId])

  useEffect(() => {
    console.log(file)
  }, [file])

  const onSelectFile = (fileId:string) => {
    onSetFile(userId, fileId);
    setSelectedFileId(fileId);
  }

  const onDoSomething = () => {
    console.log("click")
    push({
      component: TestModal,
      title: "test",

    })
    return;
  }

  return (
    <Container>
      <Sidebar userId={userId} selectedFileId={selectedFileId} setSelectedFileId={onSelectFile} />
      {file && selectedFileId && <Main selectedFileId={selectedFileId} titleGraphic={file?.settings?.titleGraphic} sounds={file?.settings?.sounds} instructions={file?.settings?.instructions}>
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
          {selectedFileId}
          <List>
            {/* {file?.items.map((item, i) => <div>{i}</div>)} */}
            {/* {file && file.items && file.items.map((item: Item) => <div>hey</div>)} */}
            {/* {file && file.items && file.items.map((item:any) => <Row key={item.id} {...item} onChangeVisible={onDoSomething} onChangeName={onDoSomething} onRemove={onDoSomething}/>)} */}
          </List>
        </Section>
      </Main>}
    </Container>
  );
};

export default Manage;

const Container = styled("div")({
  display: "grid",
  gridTemplateColumns: "32rem auto",
  height: "100vh",
  overflow: "hidden"
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