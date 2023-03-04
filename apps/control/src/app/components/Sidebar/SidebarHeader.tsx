import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Button } from "@nx/ui";
import { useModals } from "../../providers/ModalProvider";
import AccountModal from "../modals/AccountModal";

const SidebarHeader = () => {
  const { push } = useModals();
  const onAccount = () => {
    push({
      component: AccountModal,
      title: "Account"
    })
  }

  return (
    <Container>
      <div>Gameshow</div>
      <div><Button slug="account" icon="user" onClick={onAccount}/></div>
    </Container>
  );
};

export default SidebarHeader;

const Container = styled("div")({
  boxSizing: "border-box",
  height: "8rem",
  border: "none",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: Colors.gray9,
  display: "flex",
  alignItems: "center",
  padding: "0 2rem",
  justifyContent: "space-between"
})
