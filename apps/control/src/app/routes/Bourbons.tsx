import { Button, ButtonColor, Container, Heading, List, Section } from "@nx/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModals } from "../providers/ModalProvider";
import {
	Bourbon,
	deleteSingleDoc,
	duplicateSingleDoc,
	getAllDocs,
} from "@nx/firebase";
import RemoveDocsModal from "../modals/RemoveDocs";
import styled from "@emotion/styled";

export const Bourbons: React.FC = () => {
	const docType = "bourbons";
	const docTypeSingular = "bourbon";
	const navigate = useNavigate();
	const { pushModal } = useModals();
	const [docs, setDocs] = useState<Bourbon[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [sortKey, setSortKey] = useState<string>("unfinished");

	useEffect(() => {
		getUpdatedDocs();
	}, []);

	const getUpdatedDocs = () => {
		getAllDocs(docType, (data) => setDocs(data as Bourbon[]));
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

	const docFilter = (doc: Bourbon) => {
		if (sortKey === "unopened") {
			return !doc.opened;
		}

		if (sortKey === "opened") {
			return doc.opened;
		}

		if (sortKey === "unfinished") {
			return !doc.finished;
		}

		if (sortKey === "finished") {
			return doc.finished;
		}

		if (sortKey === "singleBarrel") {
			return doc.singleBarrel;
		}

		if (sortKey === "bottleInBond") {
			return doc.bottleAndBond;
		}

		return true;
	};

	return (
		<Container>
			<Section>
				<Heading
					title="Bourbons"
					options={[
						{
							slug: "create",
							icon: "plus",
							name: "Add Bourbon",
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
						color={sortKey === "unopened" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("unopened")}
						name="Unopened"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "opened" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("opened")}
						name="Opened"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "unfinished" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("unfinished")}
						name="Unfinished"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "finished" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("finished")}
						name="Finished"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "singleBarrel" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("singleBarrel")}
						name="Single Barrel"
					/>
					<Button
						slug="sortTitle"
						color={sortKey === "bottleInBond" ? ButtonColor.ORANGE : undefined}
						onClick={() => setSortKey("bottleInBond")}
						name="Bottle-in-Bond"
					/>
				</Filters>
				<List
					docType={docType}
					items={docs
						.filter(docFilter)
						.sort((a, b) => a.name.localeCompare(b.name))}
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
					]}
					selected={selected}
					setSelected={setSelected}
					onRemoveSelected={onRemoveSelected}
				/>
			</Section>
		</Container>
	);
};

export default Bourbons;

const Filters = styled("div")({
	display: "flex",
	gap: "1rem",
});
