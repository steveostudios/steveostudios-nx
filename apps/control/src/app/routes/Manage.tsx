import styled from "@emotion/styled";
import { onGetFile, onGetUser, onGetUserSettings, onSetFile, onUpdateFile } from "@nx/firebase"
import { Colors } from "@nx/style";
import { File, Item, Modes, pickmeWeights, UserSettings } from "@nx/shared-assets";
import {Button, List, TextInput, Skin, Select, LockedInput, Toggle} from "@nx/ui"
import { useEffect, useState } from "react";
import DisplayOptions from "../components/Main/DisplayOptions";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import { useModals } from "../providers/ModalProvider";
import { uuidv4 } from "@firebase/util"; // TODO: THis is probably not right

const TestModal: React.FC = () => {
  return (
    <div>Hello there</div>
  )
}

const Manage = () => {
  const userId = "iBfXqM9uuEWBMv8bEARIaQgwJFI3";
  const [userSettings, setUserSettings] = useState<UserSettings | null>({  
    titleGraphic: false,
    sounds: true,
    instructions: false,
    selectedMode: Modes.EDIT,
    selectedFileId: null
  })
  const [selectedFileId, setSelectedFileId] = useState<string | null>("MtEyqt2j6NLs5nO8vIOA")
  const [file, setFile] = useState<File | undefined>()

  const { push } = useModals();


  useEffect(() => {
    if (userId) onGetUserSettings(userId, (data) => setUserSettings({...data}))
   }, [userId])


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

  const onChangeVisibleAll = (value: boolean) => {
    if(selectedFileId && file) {
      const items = Object.fromEntries(Object.entries(file.items)
        .map(([id, item]) => [id, {...item, visible: value}])
      )
      onUpdateFile(selectedFileId, {"items": items})
    }
  }

  const onAddItem = () => {
    if (selectedFileId && file) {
      const id = uuidv4();
      const order = !Object.keys(file.items).length ? 1 : Object.entries(file.items).sort((prev: [string, Item], next: [string, Item]) => next[1].order - prev[1].order)[0][1].order + 1;
      const item: Omit<Item, "id"> = {
        name: "test",
        order: order,
        visible: true,
        weight: 2
      }
      onUpdateFile(selectedFileId, {[`items.${id}`]: item})
    }
  }
  const onChangeVisible = (id: string, value: boolean) => {
    if(selectedFileId) {
      onUpdateFile(selectedFileId, {[`items.${id}.visible`]: value})
    }
  }

  const onChangeName = (id: string, value: string) => {
    if(selectedFileId) {
      onUpdateFile(selectedFileId, {[`items.${id}.name`]: value})
    }
  }
  
  const onChangeWeight = (id: string, value: string | number) => {
    if(selectedFileId) {
      console.log(id, Number(value))
      onUpdateFile(selectedFileId, {[`items.${id}.weight`]: Number(value)})
    }
  }

  const onRemoveItem = (value: string) => {
    if (selectedFileId && file?.items) {
      const items = Object.fromEntries(Object.entries(file.items)
        .filter(([id, item]) => id !== value)
        .sort((a: [string, Item], b: [string, Item]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0)
        .map(([id, item], i) => [id, {...item, order: i + 1 }])
      )

      onUpdateFile(selectedFileId, {"items": items})
    }
  }

  const onHideLastItem = (value: boolean) => {
    if (selectedFileId) {
      onUpdateFile(selectedFileId, {'settings.hideLastItem': value})
    }
  }

  return (
    <Container>
      <Sidebar userId={userId} selectedFileId={selectedFileId} setSelectedFileId={onSelectFile} />
      {file && selectedFileId && userSettings?.selectedMode === Modes.EDIT && <Main userId={userId} selectedFileId={selectedFileId} titleGraphic={userSettings?.titleGraphic} sounds={userSettings?.sounds} instructions={userSettings?.instructions}>
        <Section>
          <DisplayOptions selectedFileId={selectedFileId} name={file.name} builder={file.builder} theme={file.settings.theme} background={file.settings.background} instructionsContent={file.settings.instructionsContent} />
        </Section>
        <SectionNoBorder>
          <div>
            <Button icon="plus" slug="additem" onClick={onAddItem} />
            <Button icon="plus-hexagon" slug="addbulkitems" onClick={onDoSomething} />
          </div>
          <div>
            <Button icon="eye" slug="showall" onClick={() => onChangeVisibleAll(true)} />
            <Button icon="eye-slash" slug="hideall" onClick={() => onChangeVisibleAll(false)} />
            <Button icon="trash" slug="removeall" onClick={onDoSomething} />
          </div>
        </SectionNoBorder>
        <SectionFullHeight>
          <List>
            {Object.entries(file?.items).sort((a: [string, Item], b: [string, Item]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0).map(([id, item], i) => {
              item = {...item, id: id};
              return <Row key={id} {...item} onChangeVisible={onChangeVisible} onChangeName={onChangeName} onChangeWeight={onChangeWeight} onRemove={onRemoveItem} />
            })}
          </List>
        </SectionFullHeight>
      </Main>}
      {file 
      && selectedFileId 
      && userSettings?.selectedMode === Modes.PLAY 
      && <Main userId={userId} selectedFileId={selectedFileId} titleGraphic={userSettings?.titleGraphic} sounds={userSettings?.sounds} instructions={userSettings?.instructions}>
        <Section>
          <Button slug="spin" onClick={onDoSomething} skin={Skin.primary} name="Spin"/>
          <Toggle label="Hide Last Item" slug="hideLastItem" onChange={onHideLastItem} value={file.settings.hideLastItem} />
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
const SectionFullHeight = styled("div")({
  display: "flex",
  gap: "1rem",
  padding: "2rem",
  borderBottomColor: Colors.gray9,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  overflow: "hidden",
  flex: 1
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
  onChangeWeight: (id: string, value: string | number) => void;
  onRemove: (id: string) => void;
}

const Row: React.FC<RowProps> = (props) => {

  return (
    <RowContainer key={props.id} visible={props.visible}>
      <Button slug="handle" name={String(props.order)} skin={Skin.clear} onClick={() => {return}} disabled/>
        {props.visible
        ?  <Button slug="visible" icon="eye" skin={Skin.clear} onClick={() => props.onChangeVisible(props.id, false)}/>
        : <Button slug="hide" icon="eye-slash" skin={Skin.clear} onClick={() => props.onChangeVisible(props.id, true)}/>}
      <LockedInput slug="name" value={props.name} onChange={(value) => props.onChangeName(props.id, value)} />
      <Select slug="weight" value={props.weight} onChange={(value) => props.onChangeWeight(props.id, value)} options={pickmeWeights} />
      <Button slug="delete" icon="trash" skin={Skin.clear} onClick={() => props.onRemove(props.id)}/>
    </RowContainer>
  )
}

const RowContainer = styled("li")({
  display: "flex",
  gap: "1rem",
  padding: "1rem"
}, 
(props: {visible: boolean}) => {
  if (!props.visible) {
    return {
      "> *" : {opacity: 0.25}
    }
  }
  
  return {}
})
