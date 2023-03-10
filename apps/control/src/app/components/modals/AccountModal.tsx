import styled from "@emotion/styled";
import { Button } from "@nx/ui";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../../context/AuthContext";


const AccountModal: React.FC = () => {
  const {user, logout} = useFirebaseAuth()
  const navigate = useNavigate()

  const onSignOut = () => {
    logout()
    navigate("/")
  }

  return (
    <Container>
      <p>
        Logged in as {user && user?.email}
      </p>
      <Button slug="signout" name="Sign out" onClick={onSignOut} />
    </Container>
  );
};

export default AccountModal;

const Container = styled("div")({

});
