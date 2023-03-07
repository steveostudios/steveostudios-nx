import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Button, ButtonStyle, TextInput } from "@nx/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { getErrorMessage } from "../helpers/error";

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const {login} = UserAuth();

  const onSubmit = async () => {
    setError('');
    console.log(email, password)
    try{
      await login(email, password)
      navigate("/manage")
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage)
      console.log(errorMessage)
    }
  }
  return (
    <Container>
      <h1>Sign In</h1>
      <form>
        {error && <ErrorMessage>{error}</ErrorMessage>}                                                                                          
        <TextInput slug="email" placeholder="Email" value={email} onChange={setEmail} />
        <TextInput slug="password" placeholder="Password" value={password} onChange={setPassword} />
        <Button slug="signin" skin={ButtonStyle.SECONDARY} flex name="Sign In" onClick={onSubmit} disabled={!email || !password}/>
      </form>
    </Container>
  );
};

export default SignInForm;

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