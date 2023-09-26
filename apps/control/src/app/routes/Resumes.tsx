import {
	Resume,
	deleteSingleDoc,
	duplicateSingleDoc,
	getAllDocs,
} from "@nx/firebase";
import { ButtonColor, Container, Heading, List, Section } from "@nx/ui";
import { useNavigate } from "react-router-dom";
import { useModals } from "../providers/ModalProvider";
import { useEffect, useState } from "react";
import RemoveDocsModal from "../modals/RemoveDocs";

export const Resumes: React.FC = () => {
	const docType = "resumes";
	const docTypeSingular = "resume";
	const navigate = useNavigate();
	const { pushModal } = useModals();
	const [docs, setDocs] = useState<Resume[]>([]);
	const [selected, setSelected] = useState<string[]>([]);

	useEffect(() => {
		getUpdatedDocs();
	}, []);

	const getUpdatedDocs = () => {
		getAllDocs(docType, (data) => setDocs(data as Resume[]));
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
		const name = docs.find((doc) => doc.id === id)?.name;
		pushModal({
			title: "Remove Doc",
			component: RemoveDocsModal,
			destructive: true,
			initialData: { docs: [{ id, name }] },
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
					name: docs.find((doc) => doc.id === id)?.name,
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
					title="Resumes"
					options={[
						{
							slug: "create",
							icon: "plus",
							name: "Add Resume",
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
							name: "name",
							label: "Name",
							order: 1,
							flex: 1,
						},
						{
							name: "logo",
							label: "Logo",
							order: 2,
							image: true,
							imageWidth: 4,
						},
					]}
					onRemoveSelected={onRemoveSelected}
					selected={selected}
					setSelected={setSelected}
				/>
			</Section>
		</Container>
	);
};

export default Resumes;
