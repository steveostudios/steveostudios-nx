import styled from "@emotion/styled";
import { onCreateFile } from "@nx/firebase";
import { AnyFile, pickmeDefaultFile, wheelDefaultFile } from "@nx/shared-assets";
import { Colors } from "@nx/style";
import { Button, ButtonStyle } from "@nx/ui";
import { useModals } from "../../providers/ModalProvider";
import CreateFileModal, { CreateFileModalData } from "../modals/CreateFileModal";

interface Props {
  userId: string;
}

interface IDefaultFile {
  [key: string]: Omit<AnyFile, "id">
}

const SidebarCreateFile: React.FC<Props> = (props) => {
   const { push } = useModals();

  const onCreateFileModal = () => {
    push({
      component: CreateFileModal,
      title: "Create File",
      onConfirm: onCreateFileModalConfirm,
      onCancel: () => {return}
    })
  }

  const onCreateFileModalConfirm = (data: CreateFileModalData) => {
    const defaultFiles: IDefaultFile  = {
      pickme: pickmeDefaultFile,
      wheel: wheelDefaultFile
    }
    onCreateFile(props.userId, {...defaultFiles[data.builder], name: data.name})
  }

  return (
    <Container>
      <Button slug="createFile" icon="plus" name="Create File" skin={ButtonStyle.SECONDARY} flex onClick={onCreateFileModal} />
    </Container>
  );
};

export default SidebarCreateFile;

const Container = styled("div")({
  height: "6rem",
  padding: "1rem 2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderTopColor: Colors.gray9,
  borderTopStyle: "solid",
  borderTopWidth: 1,
})
