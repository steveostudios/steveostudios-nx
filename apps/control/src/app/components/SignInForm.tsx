import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Button, TextInput } from "@nx/ui";
import { useState } from "react";
import { getErrorMessage } from "../helpers/error";
import { useFirebaseAuth } from "../providers/AuthProvider";

const SignInForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login } = useFirebaseAuth();

	const onSubmit = async () => {
		setError("");
		console.log(email, password);
		try {
			await login(email, password);
		} catch (error) {
			const errorMessage = getErrorMessage(error);
			setError(errorMessage);
			console.log(errorMessage);
		}
	};
	return (
		<Container>
			<h1>Sign In</h1>
			<form>
				{error && <ErrorMessage>{error}</ErrorMessage>}
				<TextInput
					slug="email"
					label="Email"
					placeholder="Email"
					value={email}
					onChange={setEmail}
					visible
				/>
				<TextInput
					label="Password"
					type="password"
					slug="password"
					placeholder="Password"
					value={password}
					onChange={setPassword}
					visible
				/>
				<Button
					slug="signin"
					name="Sign In"
					onClick={onSubmit}
					disabled={!email || !password}
				/>
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
		marginBottom: "4rem",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	},
});

const ErrorMessage = styled("div")({
	padding: "1rem",
	color: Colors.red,
});
