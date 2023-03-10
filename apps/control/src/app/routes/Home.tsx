import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";


const Home = () => {
  const [isSignIn, setIsSignIn] = useState(false);
 
  return (
    <Container>
      <h1>Gameshow</h1>
      <TwoColumn>
        <Features>
          <h2>
            Gameshow is awesome and you should try it out!
          </h2>
          <p>Make your class or service more fun with customizable, interactive presentations!</p>
          <p>Works on any screen.</p>
          <p>Sign up for free</p>
        </Features>
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
  maxWidth: "128rem",
  margin: "0 auto",
  display: "grid",
  gap: "4rem",
  gridTemplateColumns: "50% 50%"

});

const Form = styled("div")({
  backgroundColor: Colors.gray9,
  width: "38rem",
  padding: "2rem 4rem",
  borderRadius: "2rem"
});

const Features = styled("div")({
  textAlign: "left"
});