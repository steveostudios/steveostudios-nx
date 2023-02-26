import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";


const SignUp = () => {
  return (
    <Container>
      <SignUpForm />
      <p>
        Already have an account? <Link to="/signin"> Sign in</Link>
      </p>
    </Container>
  );
};

export default SignUp;

const Container = styled("div")({
});
