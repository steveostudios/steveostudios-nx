import { MouseEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, ButtonSize, List, ButtonStyle } from "@nx/ui";
import { onDeleteFile, onGetFiles, onRenameFile, onSetFile } from "@nx/firebase";
import { builders, SimpleFile } from "@nx/shared-assets";
import { useContextMenu } from "../../providers/ContextMenuProvider";
import { useModals } from "../../providers/ModalProvider";
import RenameFileModal, { RenameFileModalData } from "../modals/RenameFileModal";
import DeleteFileModal from "../modals/DeleteFileModal";

interface Props {
  file: SimpleFile;
  userId: string;
  selected: boolean;
  setSelectedFileId: (value: string) => void; 
}

const SidebarListFile: React.FC<Props> = (props) => {
  const {addContextMenu } = useContextMenu()
  const {push} = useModals();

  const onContextMenu = (event: MouseEvent) => {
    addContextMenu(
      {
        x: event.clientX,
        y: event.clientY,
        items: [
        {icon: "pencil", label: "Rename", onClick: onRenameModal},
        {icon: "trash", label: "Delete", onClick: onDeleteModal},
      ]}
    )
  }

  const onRenameModal = () => {
    push({
      component: RenameFileModal,
      initialData: {
        id: props.file.id,
        value: props.file.name,
      },
      title: "Rename File",
      onConfirm: onRenameModalConfirm,
      onCancel: () => {return}
    })
  }
  
  const onRenameModalConfirm = (data: RenameFileModalData) => {
    onRenameFile(props.userId, data.id, data.value)
  }

  const onDeleteModal = () => {
    push({
      component: DeleteFileModal,
      title: "Delete File",
      onConfirm: onDeleteModalConfirm,
      onCancel: () => {return}
    })
  }
  
  const onDeleteModalConfirm = () => {
    // if (props.selected) {
      onSetFile(props.userId, "")
    // }
    onDeleteFile(props.userId, props.file.id)
  }

  return (
    <Container key={props.file.id} className={props.selected ? "selected" : ""} onClick={() => props.setSelectedFileId(props.file.id)}>
      <div>
      <img src={builders.find(item => item.slug === props.file.builder)?.circle} alt={props.file.builder} />
      {props.file.name}
      </div>
      <Button slug="options" icon="ellipsis-h" skin={ButtonStyle.GRAY} size={ButtonSize.SMALL} stopPropagation onClick={(event) => onContextMenu(event)} />
    </Container>
  );
};

export default SidebarListFile;

const Container = styled("li")({
  height: "4rem",
  padding: "0 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "> div": {
    display: "flex",
    alignItems: "center",
    img: {
      width: "2rem",
      marginRight: "1rem"
    }
  }
})
