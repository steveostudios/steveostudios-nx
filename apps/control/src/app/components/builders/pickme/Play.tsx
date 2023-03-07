import styled from "@emotion/styled";
import { ArrayAction, onUpdateArray, onUpdateFile } from "@nx/firebase"
import { Colors } from "@nx/style";
import { File, Item, NextWinnerType, pickmeWeights } from "@nx/shared-assets";
import {Button, List, ButtonStyle, Select, LockedInput, Toggle, TextInput} from "@nx/ui"
import { useState } from "react";

interface Props {
  file: File;
}


const PickmePlay: React.FC<Props> = (props) => {
  const [search, setSearch] = useState("")
  const { file } = props;
  const selectedFileId = props.file.id;


  const onDoSomething = () => {
    console.log(selectedFileId)
    return;
  }

  const onClearSearch = () => {
    setSearch("")
  }

  const getRandomWinner = () => {
    const items = Object
      .entries(file?.items)
      .filter(([id, item]) => id !== file.nextRandomId)
      .filter(([id, item]) => item.visible)
      .filter(([id, item]) => item.weight > 0)
      .map(([id, item]) => {
        return [...Array(item.weight)].map(() => id)
      })
      .flat(1)

    const randomItem = items[Math.floor(Math.random() * items.length)]
    onUpdateFile(selectedFileId, {'nextRandomId': randomItem})
  }

  const onNextWinnerType = (value: NextWinnerType) => {
    onUpdateFile(selectedFileId, {'nextWinnerType': value})
  }

  const onHideLastItem = (value: boolean) => {
    onUpdateFile(selectedFileId, {'hideLastItem': value})
  }
  const onShowPicker = (value: boolean) => {
    onUpdateFile(selectedFileId, {'showPicker': value})
  }

  const onSetNextPreselectedId = (value: string | null) => {
    onUpdateFile(selectedFileId, {'nextPreselectedId': value})
  }

  const onAddPreselectedId = (id: string) => {
    onUpdateArray(selectedFileId, "preselectedIds", id, ArrayAction.ADD)
  }
  const onRemovePreselectedId = (id: string) => {
    if (file.nextPreselectedId === id) {
      onUpdateFile(selectedFileId, {'nextPreselectedId': null})
    }
    onUpdateArray(selectedFileId, "preselectedIds", id, ArrayAction.REMOVE)
  }

  return (
    <>
      <SectionNoBorder>
      <Button slug="spin" onClick={onDoSomething} skin={ButtonStyle.PRIMARY} name="Spin"/>
        <Button slug="newrandom" onClick={getRandomWinner} icon="random" />
        <Toggle label="Hide Last Item" slug="hideLastItem" onChange={onHideLastItem} value={file.hideLastItem} />
        <Toggle label="Show Picker" slug="showpicker" onChange={onShowPicker} value={file.showPicker} />
        <div>
          <Button slug="random" skin={file.nextWinnerType === NextWinnerType.RANDOM ? ButtonStyle.SECONDARY : ButtonStyle.BORDER} onClick={() => onNextWinnerType(NextWinnerType.RANDOM)} name="Random" />
          <Button slug="preselected" skin={file.nextWinnerType === NextWinnerType.PRESELECTED ? ButtonStyle.SECONDARY : ButtonStyle.BORDER} onClick={() => onNextWinnerType(NextWinnerType.PRESELECTED)} name="Preselected" />
        </div>
        <div>
        {file.nextWinnerType === NextWinnerType.RANDOM && "✓"} Next Random Winner: {file.nextRandomId ? file.items[file.nextRandomId].name : "none" } <br />
        {file.nextWinnerType === NextWinnerType.PRESELECTED && "✓"} Next Preselected Winner: {file.nextPreselectedId ? file.items[file.nextPreselectedId].name : "none" }
        </div>
      </SectionNoBorder>
      <SectionTwoColumn>
        <SectionNoBorderColumn>
          <div>
            <TextInput slug="search" value={search} onChange={setSearch} />
            <Button slug="spin" onClick={onClearSearch} icon="times" disabled={!search}/>
          </div>
          <List>
            {Object
              .entries(file?.items)
              .filter(([id, item]) => !file.preselectedIds.includes(id))
              .filter(([id, item]) => item.name.toLowerCase().includes(search.toLowerCase()))
              .sort((a: [string, Item], b: [string, Item]) => a[1].name < b[1].name ? -1 : a[1].name > b[1].name ? 1 : 0)
              .map(([id, item], i) => {
                item = {...item, id: id};
              return <Row key={id} {...item} onAdd={onAddPreselectedId}/>
            })}
          </List>
        </SectionNoBorderColumn>
        <SectionNoBorderColumn>
          <List>
            {Object.entries(file?.items).filter(([id, item]) => file.preselectedIds.includes(id)).sort((a: [string, Item], b: [string, Item]) => a[1].name < b[1].name ? -1 : a[1].name > b[1].name ? 1 : 0).map(([id, item], i) => {
              item = {...item, id: id};
              return <Row key={id} {...item} onRemove={onRemovePreselectedId} onSelect={() => onSetNextPreselectedId(id)} selected={item.id === file.nextPreselectedId} />
            })}
          </List>
        </SectionNoBorderColumn>
      </SectionTwoColumn>
    </>
  );
};

export default PickmePlay;

const SectionTwoColumn = styled("div")({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  padding: "2rem",
  borderBottomColor: Colors.gray9,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  overflow: "hidden",
  flex: 1,
  "> *": {
    width: "50%"
  }
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

const SectionNoBorderColumn = styled("div")({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  padding: "2rem 2rem 0 2rem",
  alignItems: "center",
  justifyContent: "space-between",
  "> * ": {
    width: "100%",
    display: "flex",
    gap: "1rem"
  }
})

interface RowProps extends Item {
  onRemove?: (id: string) => void;
  onAdd?: (id: string) => void;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

const Row: React.FC<RowProps> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()
    if (!props.onSelect) return
    props.onSelect(props.id)
  }

  return (
    <RowContainer key={props.id} className={props.selected && "selected" || ""} onClick={onClick}>
      {props.name}
      {props.onRemove && <Button slug="remove" icon="minus" skin={ButtonStyle.BORDER} stopPropagation onClick={() => props.onRemove && props.onRemove(props.id)}/>}
      {props.onAdd && <Button slug="add" icon="plus" skin={ButtonStyle.SECONDARY} stopPropagation onClick={() => props.onAdd && props.onAdd(props.id)}/>}
    </RowContainer>
  )
}

const RowContainer = styled("li")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "1rem"
})
