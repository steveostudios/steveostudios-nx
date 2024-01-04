import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ModalContext } from "./providers/ModalProvider";
import { Modal, ModalProps } from "@nx/ui";
import "./app.css";
// Routes
import Home from "./routes/Home";
// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Nav } from "./components/Nav";
import Books from "./routes/Books";
import { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { Page } from "@nx/ui";
import Bourbons from "./routes/Bourbons";
import Resumes from "./routes/Resumes";
import Posts from "./routes/Posts";
import Projects from "./routes/Projects";
import PostSingle from "./routes/Post";
import ResumeSingle from "./routes/Resume";
import BourbonSingle from "./routes/Bourbon";
import ProjectSingle from "./routes/Project";
import { BooksBulk } from "./routes/BooksBulk";
import BookSingle from "./routes/Book";
import { ResumesBulk } from "./routes/ResumesBulk";
import { PostsBulk } from "./routes/PostsBulk";
import { AuthContext, AuthContextProvider } from "./providers/AuthProvider";
library.add(fal, far, fas);

const uid = (() => {
	let i = 0;
	return () => `${i++}`;
})();

export function App() {
	useEffect(() => {}, []);
	const [modals, setModals] = useState<ReactElement[]>([]);
	// const [contextMenu, setContextMenu] = useState<ReactElement | null>();

	const actions = useMemo(
		() => ({
			pushModal(options: ModalProps) {
				const key = uid();
				console.log(key);
				const close = () => {
					setModals((modals) => {
						return modals.filter((modal) => modal.key !== key);
					});
				};

				const modal = <Modal key={key} close={close} {...options} />;
				setModals((modals) => [...modals, modal]);
			},
		}),
		[]
	);

	return (
		<Page>
			<Router>
				<AuthContextProvider>
					<ModalContext.Provider value={actions}>
						<Nav />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="/books"
								element={
									<ProtectedRoute>
										<Books />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/bourbons"
								element={
									<ProtectedRoute>
										<Bourbons />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/resumes"
								element={
									<ProtectedRoute>
										<Resumes />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/posts"
								element={
									<ProtectedRoute>
										<Posts />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/projects"
								element={
									<ProtectedRoute>
										<Projects />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/books/bulk"
								element={
									<ProtectedRoute>
										<BooksBulk />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/resumes/bulk"
								element={
									<ProtectedRoute>
										<ResumesBulk />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/posts/bulk"
								element={
									<ProtectedRoute>
										<PostsBulk />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/bourbon/:id?"
								element={
									<ProtectedRoute>
										<BourbonSingle />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/book/:id?"
								element={
									<ProtectedRoute>
										<BookSingle />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/resume/:id?"
								element={
									<ProtectedRoute>
										<ResumeSingle />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/post/:id?"
								element={
									<ProtectedRoute>
										<PostSingle />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/project/:id?"
								element={
									<ProtectedRoute>
										<ProjectSingle />
									</ProtectedRoute>
								}
							/>
						</Routes>
						{modals}
					</ModalContext.Provider>
				</AuthContextProvider>
			</Router>
		</Page>
	);
}

export default App;

interface ProtectedRouteProps {
	children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
	const auth = useContext(AuthContext);

	if (!auth?.user) {
		return <Navigate to="/" />;
	}

	return props.children;
};
