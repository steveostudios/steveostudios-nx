// import { ReactElement, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { ContextMenu, ContextMenuProps, Modal } from "@nx/ui";
import { ModalContext } from "./providers/ModalProvider";
// import { ContextMenuContext } from "./providers/ContextMenuProvider";
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
import { ReactElement, useEffect, useMemo, useState } from "react";
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
library.add(fal, far, fas, fab);

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

	// const ContextMenuActions = useMemo(
	// 	() => ({
	// 		addContextMenu(options: ContextMenuProps) {
	// 			console.log(options);
	// 			const close = () => {
	// 				console.log("close");
	// 				setContextMenu(null);
	// 			};

	// 			setContextMenu(<ContextMenu close={close} {...options} />);
	// 		},
	// 	}),
	// 	[]
	// );

	return (
		<Page>
			<Router>
				<ModalContext.Provider value={actions}>
					{/* 
					<ContextMenuContext.Provider value={ContextMenuActions}> */}
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />

						<Route path="/books" element={<Books />} />
						<Route path="/bourbons" element={<Bourbons />} />
						<Route path="/resumes" element={<Resumes />} />
						<Route path="/posts" element={<Posts />} />
						<Route path="/projects" element={<Projects />} />

						<Route path="/books/bulk" element={<BooksBulk />} />
						<Route path="/resumes/bulk" element={<ResumesBulk />} />
						<Route path="/posts/bulk" element={<PostsBulk />} />
						<Route path="/bourbon/:id?" element={<BourbonSingle />} />
						<Route path="/book/:id?" element={<BookSingle />} />
						<Route path="/resume/:id?" element={<ResumeSingle />} />
						<Route path="/post/:id?" element={<PostSingle />} />
						<Route path="/project/:id?" element={<ProjectSingle />} />
					</Routes>
					{modals}
					{/* 
						{contextMenu} */}
					{/* </ContextMenuContext.Provider>
					 */}
				</ModalContext.Provider>
			</Router>
		</Page>
	);
}

export default App;
