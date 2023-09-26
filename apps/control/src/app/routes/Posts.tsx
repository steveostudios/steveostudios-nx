import {
	Post,
	deleteSingleDoc,
	duplicateSingleDoc,
	getAllDocs,
} from "@nx/firebase";
import { ButtonColor, Container, Heading, List, Section } from "@nx/ui";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModals } from "../providers/ModalProvider";
import RemoveDocsModal from "../modals/RemoveDocs";

export const Posts: React.FC = () => {
	const docType = "posts";
	const docTypeSingular = "post";
	const navigate = useNavigate();
	const { pushModal } = useModals();
	const [docs, setDocs] = useState<Post[]>([]);
	const [selected, setSelected] = useState<string[]>([]);

	useEffect(() => {
		getUpdatedDocs();
	}, []);

	const getUpdatedDocs = () => {
		getAllDocs(docType, (data) => setDocs(data as Post[]));
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

	return (
		<Container>
			<Section>
				<Heading
					title="Posts"
					options={[
						{
							slug: "create",
							icon: "plus",
							name: "Add Post",
							color: ButtonColor.SUCCESS,
							onClick: onCreate,
						},
					]}
				/>
				<List
					docType={docType}
					items={docs}
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
							name: "title",
							label: "Title",
							order: 1,
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

export default Posts;
