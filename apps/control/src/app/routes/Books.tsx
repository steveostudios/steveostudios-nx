import { Container, Section, Button, List, Heading, ButtonColor } from "@nx/ui";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
	Book,
	deleteSingleDoc,
	duplicateSingleDoc,
	getAllDocs,
} from "@nx/firebase";
import { useModals } from "../providers/ModalProvider";
import RemoveDocsModal from "../modals/RemoveDocs";

export const Books: React.FC = (props) => {
	const navigate = useNavigate();
	const docType = "books";
	const docTypeSingular = "book";
	const { pushModal } = useModals();
	const [sortKey, setSortKey] = useState<string>("all");
	const [docs, setDocs] = useState<Book[]>([]);
	const [selected, setSelected] = useState<string[]>([]);

	useEffect(() => {
		getUpdatedDocs();
	}, []);

	const getUpdatedDocs = () => {
		getAllDocs(docType, (data) => setDocs(data as Book[]));
	};

	const onCreate = () => {
		navigate(`/${docTypeSingular}`);
	};

	const onEdit = (id: string) => {
		navigate(`/${docTypeSingular}/${id}`);
	};

	const onDuplicate = async (id: string) => {
		await duplicateSingleDoc(docType, id);
		getUpdatedDocs();
	};

	const onRemove = async (id: string) => {
		const title = docs.find((doc) => doc.id === id)?.title;
		pushModal({
			title: "Remove Doc",
			component: RemoveDocsModal,
			destructive: true,
			initialData: { docs: [{ id, name: title }] },
			onConfirm: () => {
				setSelected([]);
				onRemoveConfirm(id);
			},
			onCancel: () => {
				return;
			},
		});
	};

	const onRemoveConfirm = async (id: string) => {
		await deleteSingleDoc(docType, id);
		getUpdatedDocs();
	};

	const onRemoveSelected = () => {
		pushModal({
			title: "Remove Selected Docs",
			component: RemoveDocsModal,
			destructive: true,
			initialData: {
				docs: selected.map((id) => ({
					id,
					name: docs.find((doc) => doc.id === id)?.title,
				})),
			},
			onConfirm: () => {
				setSelected([]);
				onRemoveSelectedConfirm(selected);
			},
			onCancel: () => {
				return;
			},
		});
	};

	const onRemoveSelectedConfirm = async (ids: string[]) => {
		await Promise.all(ids.map((id) => deleteSingleDoc(docType, id)));
		getUpdatedDocs();
	};

	const bookFilter = (book: Book) => {
		if (sortKey === "notStarted") {
			return !book.dateFinish && !book.dateStart;
		}

		if (sortKey === "reading") {
			return !book.dateFinish && book.dateStart;
		}

		if (sortKey === "finished") {
			return !!book.dateFinish;
		}

		return true;
	};

	return (
		<Container>
			<Section>
				<Heading
					title="Books"
					options={[
						{
							slug: "create",
							icon: "plus",
							name: "Add Book",
							color: ButtonColor.SUCCESS,
							onClick: onCreate,
						},
					]}
				/>
				<Filters>
					<Button
						slug="sortTitle"
						color={sortKey === "all" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("all")}
						name="All"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "notStarted" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("notStarted")}
						name="Not Started"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "reading" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("reading")}
						name="Reading"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "finished" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("finished")}
						name="Finished"
					/>
				</Filters>
				<List
					docType={docType}
					items={docs.filter(bookFilter).sort((a, b) => {
						return (b.dateFinish || 0) > (a.dateFinish || 0) ? 1 : -1;
					})}
					rowOptions={[
						{ slug: "edit", icon: "pencil", onClick: onEdit },
						{ slug: "duplicate", icon: "clone", onClick: onDuplicate },
						{
							slug: "remove",
							icon: "trash",
							onClick: onRemove,
							color: ButtonColor.DANGER,
						},
					]}
					columns={[
						{
							name: "cover",
							label: "Cover",
							order: 1,
							image: true,
							imageWidth: 1,
						},
						{
							name: "title",
							label: "Title",
							order: 2,
							flex: 1,
						},
					]}
					selected={selected}
					setSelected={setSelected}
					onRemoveSelected={onRemoveSelected}
				/>
			</Section>
		</Container>
	);
};

export default Books;

const Filters = styled("div")({
	display: "flex",
	gap: "1rem",
});
