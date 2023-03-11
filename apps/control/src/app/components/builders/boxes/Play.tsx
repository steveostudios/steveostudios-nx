import styled from "@emotion/styled";
import { ArrayAction, onUpdateArray, onUpdateFile } from "@nx/firebase"
import { Colors, Shadows } from "@nx/style";
import { File, GameState, Item, NextWinnerType, pickmeWeights, WheelFile } from "@nx/shared-assets";
import {Button, List, ButtonStyle, Select, LockedInput, Toggle, TextInput, ButtonSize} from "@nx/ui"
import { useEffect, useRef, useState } from "react";

interface Props {
  file: WheelFile;
}


const WheelPlay: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("")
  const [showPreselectAdd, setShowPreselectAdd] = useState(false);
  const { file } = props;
  const selectedFileId = props.file.id;

  useEffect(() => {
    setSearch("")
  }, [selectedFileId])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowPreselectAdd(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });


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
      onUpdateFile(selectedFileId, {'nextPreselectedId': null, 'nextWinnerType': NextWinnerType.RANDOM})
    }
    onUpdateArray(selectedFileId, "preselectedIds", id, ArrayAction.REMOVE)
  }

  const onSpin = () => {
    if (file.gameState === GameState.ADDMORE) {
      // do nothing
    }
    if (file.gameState === GameState.READY) {
      const items = Object
      .entries(file?.items)
      .filter(([id, item]) => item.visible)
      .filter(([id, item]) => item.weight > 0)
      .map(([id, item]) => {
        return [...Array(item.weight)].map(() => id)
      })
      .flat(1)
      
      let lastItem: string|null = null
      // const randomItem = items[Math.floor(Math.random() * items.length)]
      const spinCycle = Array(10).fill(0).map(() => {
        const possibleItems = items.filter(item => item !== lastItem)
        lastItem = possibleItems[Math.floor(Math.random() * possibleItems.length)]
        return lastItem;
      })
      onUpdateFile(selectedFileId, {
        'gameState': GameState.SPINNING,
        'spinCycle': spinCycle
      }
    )
      // update database
    }
    if (file.gameState === GameState.SPINNING) {
      onUpdateFile(selectedFileId, {
        'gameState': GameState.WINNER,
        'spinCycle': []
      })
    }
    if (file.gameState === GameState.WINNER) {
      onUpdateFile(selectedFileId, {
        'gameState': GameState.READY,
      })
    }
    return;
  }

  return (
      <SectionTwoColumn>
        <SectionNoBorderColumn>
          <PreselectedHeader>
            <div>
              Preselected Items
            </div>
          <Button slug="showPreselectedAdd" icon="plus" onClick={() => setShowPreselectAdd(!showPreselectAdd)} />
          </PreselectedHeader>
          {Object.entries(file?.items).filter(([id, item]) => file.preselectedIds.includes(id)).length ? <List>
            {Object.entries(file?.items).filter(([id, item]) => file.preselectedIds.includes(id)).sort((a: [string, Item], b: [string, Item]) => a[1].name < b[1].name ? -1 : a[1].name > b[1].name ? 1 : 0).map(([id, item], i) => {
              item = {...item, id: id};
              return <Row key={id} {...item} onRemove={onRemovePreselectedId} onSelect={() => onSetNextPreselectedId(id)} selected={item.id === file.nextPreselectedId} />
            })}
          </List> : <List>
            <NoItems>No preselected items</NoItems>
          </List>}
          <PreselectedAdd visible={showPreselectAdd}  ref={ref}>
            <div>
              <TextInput slug="search" value={search} onChange={setSearch} />
              <Button slug="spin" onClick={onClearSearch} icon="times" disabled={!search}/>
            </div>
            {Object
                .entries(file?.items)
                .filter(([id, item]) => !file.preselectedIds.includes(id)).length ? Object
                .entries(file?.items)
                .filter(([id, item]) => !file.preselectedIds.includes(id))
                .filter(([id, item]) => item.name.toLowerCase().includes(search.toLowerCase())).length ? <List>
              {Object
                .entries(file?.items)
                .filter(([id, item]) => !file.preselectedIds.includes(id))
                .filter(([id, item]) => item.name.toLowerCase().includes(search.toLowerCase()))
                .sort((a: [string, Item], b: [string, Item]) => a[1].name < b[1].name ? -1 : a[1].name > b[1].name ? 1 : 0)
                .map(([id, item], i) => {
                  item = {...item, id: id};
                  return <Row key={id} {...item} onAdd={onAddPreselectedId}/>
                })}
            </List> : <List><NoItems>No results found</NoItems></List> : <List><NoItems>Add some items</NoItems></List>}
          </PreselectedAdd>
        </SectionNoBorderColumn>
        <SectionNoBorderColumn>
        <NextType selected={file.nextWinnerType === NextWinnerType.RANDOM}>
          <Button slug="random" skin={file.nextWinnerType === NextWinnerType.RANDOM ? ButtonStyle.SECONDARY : ButtonStyle.BORDER} onClick={() => onNextWinnerType(NextWinnerType.RANDOM)} name="Random" />
          <Button slug="newrandom" onClick={getRandomWinner} icon="random" />
            {file.nextRandomId ? file.items[file.nextRandomId].name : "none" }
        </NextType>
        <NextType selected={file.nextWinnerType === NextWinnerType.PRESELECTED}>
          <Button slug="preselected" skin={file.nextWinnerType === NextWinnerType.PRESELECTED ? ButtonStyle.SECONDARY : ButtonStyle.BORDER} onClick={() => onNextWinnerType(NextWinnerType.PRESELECTED)} name="Preselected" />
            {file.nextPreselectedId ? file.items[file.nextPreselectedId].name : "none" }
        </NextType>
          <div>
          </div>
          <Button slug="spin" size={ButtonSize.LARGE} flex onClick={() => console.log(onSpin())} skin={ButtonStyle.PRIMARY} name={file.gameState === GameState.ADDMORE ? "Add more items" : file.gameState === GameState.READY ? "Spin" : file.gameState === GameState.SPINNING ? "Spinning..." : file.gameState === GameState.WINNER ? "Clear" : ""} disabled={(file.nextWinnerType === NextWinnerType.RANDOM && !file.nextRandomId) || (file.nextWinnerType === NextWinnerType.PRESELECTED && !file.nextPreselectedId) || file.gameState === GameState.ADDMORE}/>
                <div>
                <Toggle label="Hide Last Item" slug="hideLastItem" onChange={onHideLastItem} value={file.hideLastItem} />
        <Toggle label="Show Picker" slug="showpicker" onChange={onShowPicker} value={file.showPicker} />
                </div>
        </SectionNoBorderColumn>
      </SectionTwoColumn>
  );
};

export default WheelPlay;

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

const NextType = styled("div")({
  display: "flex",
  alignItems: "center",
  opacity: 0.25,
}, (props: {selected: boolean}) => {
  if (props.selected) {
    return {
      opacity: 1
    }
  }
  return {}
})

const SectionNoBorderColumn = styled("div")({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  padding: "2rem 2rem 0 2rem",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "space-between",
  "> * ": {
    width: "100%",
    display: "flex",
    gap: "1rem"
  }
})

const PreselectedHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: Colors.gray9,
  "> *": {
    margin: "1rem"
  }
})

const PreselectedAdd = styled("div")({
  position: "absolute",
  right: "4rem",
  backgroundColor: Colors.gray10,
  boxShadow: Shadows.standard,
  borderRadius: "0.5rem",
  opacity: 0,
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  padding: "2rem",
  alignItems: "center",
  justifyContent: "space-between",
  minWidth: "32rem",
  maxWidth: "50%",
  flex: 1,
  height: "-webkit-fill-available",
  zIndex: -1,
  "> * ": {
    width: "100%",
    display: "flex",
    gap: "1rem"
  }
}, (props: {visible: boolean}) => {
  if (props.visible) {

    return {
      zIndex: 1,
      opacity: 1
    }
  }
  return {}
})

const NoItems = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: Colors.gray4
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
