import styled from "@emotion/styled";
import { Button } from "@nx/ui";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "../context/AuthContext";


const Account = () => {
  const {user, logout} = useFirebaseAuth()
  const navigate = useNavigate()

  const onSignOut = () => {
    logout()
    navigate("/signin")
  }

  return (
    <Container>
      <h1>Account</h1>
      Logged in as {user && user?.email}
      <Button slug="signout" name="Sign out" onClick={onSignOut} />
    </Container>
  );
};

export default Account;

const Container = styled("div")({

});
