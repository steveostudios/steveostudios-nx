import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";


const Home = () => {
  const [isSignIn, setIsSignIn] = useState(false);
 
  return (
    <Container>
      <h1>Welcome</h1>
      <TwoColumn>
        <div>
          Gameshow is awesome and you should try it out!
        </div>
        <Form>
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      {isSignIn ? <p>Don't have an account? <span onClick={() => setIsSignIn(false)}>Sign up for free</span></p> : <p>Already have an account? <span onClick={() => setIsSignIn(true)}>Sign in</span></p>}
        </Form>
      </TwoColumn>
    </Container>
  );
};

export default Home;

const Container = styled("div")({

});

const TwoColumn = styled("div")({
  display: "grid",
  gridTemplateColumns: "50% 50%"

});

const Form = styled("div")({
});
