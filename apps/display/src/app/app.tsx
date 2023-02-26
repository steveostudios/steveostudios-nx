import "./app.css";
import styled from "@emotion/styled";
import { Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";
import { Player } from "./routes/Player";

const StyledApp = styled("div")({
	padding: 0,
	margin: 0
})

export function App() {
	return (
		<StyledApp>
			<Routes>
				<Route path="/:userId" element={<Player />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</StyledApp>
	);
}

export default App;
