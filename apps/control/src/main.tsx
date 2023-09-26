import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import App from "./app/app";
// import { AuthContextProvider } from './app/context/AuthContext';

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<StrictMode>
		{/* <AuthContextProvider> */}
		<App />
		{/* </AuthContextProvider> */}
	</StrictMode>
);
