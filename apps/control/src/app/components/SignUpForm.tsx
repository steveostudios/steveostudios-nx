import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Button, ButtonStyle, TextInput } from "@nx/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getErrorMessage } from "../helpers/error";

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {createUser} = UserAuth();

  const onSubmit = async () => {
    setError('');
    console.log(email, password)
    try{
      await createUser(email, password)
      navigate("/manage")
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage)
      console.log(errorMessage)
    }
  }
  return (
    <Container>
      <h1>Sign Up</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}                                                                                          
      <form onSubmit={onSubmit}>
        <TextInput slug="email" placeholder="Email" value={email} onChange={setEmail} />
        <TextInput slug="password" placeholder="Password" value={password} onChange={setPassword} />
        <TextInput slug="confirmpassword" placeholder="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} />
        <Button slug="signup" skin={ButtonStyle.SECONDARY} name="Sign up" flex onClick={onSubmit} disabled={!email || !password || !confirmPassword || password !== confirmPassword}/>
      </form>
    </Container>
  );
};

export default SignUpForm;

const Container = styled("div")({
  margin: "0 auto",
  maxWidth: "36rem",
  padding: "2rem",
  h1: {
    padding: 0,
    margin: 0,
    marginBottom: "4rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  }
});

const ErrorMessage = styled("div")({
  padding: "1rem",
  color: Colors.red
})