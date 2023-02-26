import styled from "@emotion/styled";
import { Button } from "@nx/ui";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";


const AccountModal: React.FC = () => {
  const {user, logout} = UserAuth()
  const navigate = useNavigate()

  const onSignOut = () => {
    logout()
    navigate("/")
  }

  return (
    <Container>
      <h1>Account</h1>
      Logged in as {user && user?.email}
      <Button slug="signout" name="Sign out" onClick={onSignOut} />
    </Container>
  );
};

export default AccountModal;

const Container = styled("div")({

});
