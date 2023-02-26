import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";

const SignIn = () => {

  return (
    <Container>
      <SignInForm />
      <p>
        Don't have an account? <Link to="/signup"> Sign up for free</Link>
      </p>
    </Container>
  );
};

export default SignIn;

const Container = styled("div")({
 
});
