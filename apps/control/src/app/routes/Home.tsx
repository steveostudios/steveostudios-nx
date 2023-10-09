import { Container, H2, Section } from "@nx/ui";
import SignInForm from "../components/SignInForm";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Home = () => {
	const auth = useContext(AuthContext);
	return (
		<Container>
			<Section>
				<H2>Home</H2>
				{(!auth || !auth.user) && <SignInForm />}
				{auth?.user?.email && <p>Logged in as {auth?.user?.email}</p>}
			</Section>
		</Container>
	);
};

export default Home;
