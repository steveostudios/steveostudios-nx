import styled from "@emotion/styled";
import { onUpdateFile } from "@nx/firebase"
import { Colors } from "@nx/style";
import { Item, BoxesFile, boxesWeights, boxesThemes, BoxesItem } from "@nx/shared-assets";
import {Button, List, ButtonStyle, Select, LockedInput} from "@nx/ui"
import DisplayOptions from "./../../Main/DisplayOptions"
import { useModals } from "./../../../providers/ModalProvider"
import { uuidv4 } from "@firebase/util"; // TODO: THis is probably not right
import RemoveAllModal from "./../../modals/RemoveAllModal";
import AddBulkModal, { AddBulkModalData } from "../../modals/AddBulkModal";

interface Props {
  file: BoxesFile;
}

const BoxesEdit: React.FC<Props> = (props) => {
  const { file } = props;
  const { push } = useModals();
  const selectedFileId = props.file.id;

  const onAddBulkModal = () => {
    push({
      component: AddBulkModal,
      title: "Add Bulk",
      onConfirm: onAddBulkModalConfirm,
      onCancel: () => {return}
    })
  }

  const onAddBulkModalConfirm = (data: AddBulkModalData) => {
    const items = data.value.split(/\r?\n/).map((item => item.trim()));
    if (items.length) {
      const itemsObj = {}
      const order = !Object.keys(file.items).length ? 1 : Object.entries(file.items).sort((prev: [string, Item], next: [string, Item]) => next[1].order - prev[1].order)[0][1].order + 1;
      const itemObject = items.map((name, i) => {
        return {
          id: uuidv4(),
          name,
          order: order + i,
          visible: true,
          weight: 2,
          color: 3,
          emoji: "test"
        }
      }).reduce((obj, item) => {
        const {id, ...properties} = item;
        return {
          ...obj,
          [`items.${id}`]: properties,
        };
      }, itemsObj);

      onUpdateFile(selectedFileId, {...itemObject})
    }
  }

  const onChangeVisibleAll = (value: boolean) => {
    const items = Object.fromEntries(Object.entries(file.items)
      .map(([id, item]) => [id, {...item, visible: value}])
    )
    onUpdateFile(selectedFileId, {"items": items})
  }

  const onAddItem = () => {
    const id = uuidv4();
    const order = !Object.keys(file.items).length ? 1 : Object.entries(file.items).sort((prev: [string, BoxesItem], next: [string, Item]) => next[1].order - prev[1].order)[0][1].order + 1;
    const item: Omit<BoxesItem, "id"> = {
      name: "test",
      order: order,
      visible: true,
      weight: 2,
      color: 2,
      emoji: "test"
    }
    onUpdateFile(selectedFileId, {[`items.${id}`]: item})
  }

  const onChangeVisible = (id: string, value: boolean) => {
    onUpdateFile(selectedFileId, {[`items.${id}.visible`]: value})
  }

  const onChangeName = (id: string, value: string) => {
    onUpdateFile(selectedFileId, {[`items.${id}.name`]: value})
  }
  
  const onChangeWeight = (id: string, value: string | number) => {
    onUpdateFile(selectedFileId, {[`items.${id}.weight`]: Number(value)})
  }

  const onRemoveItem = (value: string) => {
    const items = Object.fromEntries(Object.entries(file.items)
      .filter(([id, item]) => id !== value)
      .sort((a: [string, Item], b: [string, Item]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0)
      .map(([id, item], i) => [id, {...item, order: i + 1 }])
    )
    onUpdateFile(selectedFileId, {"items": items})
  }

  const onRemoveAllModal = () => {
    push({
      component: RemoveAllModal,
      title: "Remove All",
      onConfirm: onRemoveAll,
      onCancel: () => {return}
    });
  };

  const onRemoveAll = () => {
    onUpdateFile(selectedFileId, {'items': {}})
  };

  return (
    <>
      <Section>
        <DisplayOptions selectedFileId={selectedFileId} name={file.name} builder={file.builder} theme={file.theme} background={file.background} instructionsContent={file.instructionsContent} themes={boxesThemes} />
      </Section>
      <SectionNoBorder>
        <div>
          <Button icon="plus" slug="additem" onClick={onAddItem} />
          <Button icon="plus-hexagon" slug="addbulkitems" onClick={onAddBulkModal} />
        </div>
        <div>
          <Button icon="eye" slug="showall" onClick={() => onChangeVisibleAll(true)} disabled={!Object.entries(file?.items).filter(([id, item]) => !item.visible).length}/>
          <Button icon="eye-slash" slug="hideall" onClick={() => onChangeVisibleAll(false)} disabled={!Object.entries(file?.items).filter(([id, item]) => item.visible).length} />
          <Button icon="trash" slug="removeall" onClick={onRemoveAllModal} disabled={!Object.entries(file.items).length}/>
        </div>
      </SectionNoBorder>
      <SectionFullHeight>
        {!Object.entries(file?.items).length 
          ? <AddMoreContent>Add more items to play</AddMoreContent> 
          : <List>
            {Object.entries(file?.items).sort((a: [string, Item], b: [string, Item]) => a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0).map(([id, item], i) => {
            item = {...item, id: id};
            return <Row key={id} {...item} onChangeVisible={onChangeVisible} onChangeName={onChangeName} onChangeWeight={onChangeWeight} onRemove={onRemoveItem}  />
          })}
        </List>}
      </SectionFullHeight>
    </>
  );
};

export default BoxesEdit;

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

const AddMoreContent = styled("div")({
  alignSelf: "center",
  flex: 1,
  color: Colors.gray4
})

interface RowProps extends BoxesItem {
  onChangeVisible: (id: string, value: boolean) => void;
  onChangeName: (id: string, value: string) => void;
  onChangeWeight: (id: string, value: string | number) => void;
  onRemove: (id: string) => void;
}

const Row: React.FC<RowProps> = (props) => {
  return (
    <RowContainer key={props.id} visible={props.visible}>
      <Button slug="handle" name={String(props.order)} skin={ButtonStyle.CLEAR} onClick={() => {return}} disabled/>
        {props.visible
        ?  <Button slug="visible" icon="eye" skin={ButtonStyle.CLEAR} onClick={() => props.onChangeVisible(props.id, false)}/>
        : <Button slug="hide" icon="eye-slash" skin={ButtonStyle.CLEAR} onClick={() => props.onChangeVisible(props.id, true)}/>}
      <LockedInput slug="name" value={props.name} onChange={(value) => props.onChangeName(props.id, value)} />
      <Select slug="weight" value={props.weight} onChange={(value) => props.onChangeWeight(props.id, value)} options={boxesWeights} />
      <Button slug="delete" icon="trash" skin={ButtonStyle.CLEAR} onClick={() => props.onRemove(props.id)}/>
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
