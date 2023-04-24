import styled from "@emotion/styled";
import { onUpdateFile } from "@nx/firebase";
import { Colors } from "@nx/style";
import {
	Item,
	PickmeFile,
	PickmeItem,
	pickmeThemes,
	pickmeWeights,
} from "@nx/shared-assets";
import {
	Button,
	List,
	ButtonStyle,
	LockedInput,
	RowDropdown,
	Section,
} from "@nx/ui";
import DisplayOptions from "./../../Main/DisplayOptions";
import { useModals } from "./../../../providers/ModalProvider";
import { uuidv4 } from "@firebase/util"; // TODO: THis is probably not right
import RemoveAllModal from "./../../modals/RemoveAllModal";
import AddBulkModal, { AddBulkModalData } from "../../modals/AddBulkModal";

interface Props {
	file: PickmeFile;
}

const PickmeEdit: React.FC<Props> = (props) => {
	const { file } = props;
	const { push } = useModals();
	const selectedFileId = props.file.id;

	const recalcItems = (items: { [id: string]: Omit<PickmeItem, "id"> }) => {
		const updatedItems = Object.entries(items)
			.sort(
				(
					prev: [string, Omit<PickmeItem, "id">],
					next: [string, Omit<PickmeItem, "id">]
				) => prev[1].order - next[1].order
			)
			.map(([id, item], i) => {
				const newItem = [
					id,
					{
						...item,
						order: i + 1,
					},
				];

				return newItem;
			});

		return Object.fromEntries(updatedItems);
	};

	const newItem = (items: Partial<PickmeItem>[]) => {
		if (!items.length) return;

		const startOrder = !Object.keys(file.items).length
			? 1
			: Object.entries(file.items).sort(
					(prev: [string, Item], next: [string, Item]) =>
						next[1].order - prev[1].order
			  )[0][1].order;

		const newItems = items.map((item, i) => {
			const id = uuidv4();
			const order = startOrder + i;
			const newItem: Omit<PickmeItem, "id"> = {
				name: item.name || "test",
				order: order,
				visible: item.visible || true,
				weight: item.weight || 2,
			};
			return [id, newItem];
		});

		return Object.fromEntries(newItems);
	};

	const onAddBulkModal = () => {
		push({
			component: AddBulkModal,
			title: "Add Bulk",
			onConfirm: onAddBulkModalConfirm,
			onCancel: () => {
				return;
			},
		});
	};

	const onAddBulkModalConfirm = (data: AddBulkModalData) => {
		// split items
		const items = newItem(
			data.value
				.split(/\r?\n/)
				.map((item) => item.trim())
				.map((name) => ({ name: name }))
		);
		if (items)
			onUpdateFile(selectedFileId, {
				items: recalcItems({ ...file.items, ...items }),
			});
	};

	const onAddItem = () => {
		const items = newItem([{}]);
		if (items)
			onUpdateFile(selectedFileId, {
				items: recalcItems({ ...file.items, ...items }),
			});
	};

	const onChangeVisibleAll = (value: boolean) => {
		const items = Object.fromEntries(
			Object.entries(file.items).map(([id, item]) => [
				id,
				{ ...item, visible: value },
			])
		);
		onUpdateFile(selectedFileId, { items: recalcItems({ ...items }) });
	};

	const onChangeVisible = (id: string, value: boolean) => {
		const item = (file.items[id] = { ...file.items[id], visible: value });
		onUpdateFile(selectedFileId, {
			items: recalcItems({ ...file.items, [id]: item }),
		});
	};

	const onChangeName = (id: string, value: string) => {
		const item = (file.items[id] = { ...file.items[id], name: value });
		onUpdateFile(selectedFileId, {
			items: recalcItems({ ...file.items, [id]: item }),
		});
	};

	const onChangeWeight = (id: string, value: string | number) => {
		const item = (file.items[id] = {
			...file.items[id],
			weight: Number(value),
		});
		onUpdateFile(selectedFileId, {
			items: recalcItems({ ...file.items, [id]: item }),
		});
	};

	const onRemoveItem = (id: string) => {
		const items = Object.fromEntries(
			Object.entries(file.items).filter(([itemId, item]) => itemId !== id)
		);
		onUpdateFile(selectedFileId, { items: recalcItems({ ...items }) });
	};

	const onRemoveAllModal = () => {
		push({
			component: RemoveAllModal,
			title: "Remove All",
			onConfirm: onRemoveAll,
			onCancel: () => {
				return;
			},
		});
	};

	const onRemoveAll = () => {
		onUpdateFile(selectedFileId, { items: {} });
	};

	return (
		<>
			<Section border paddingBottom>
				<DisplayOptions
					selectedFileId={selectedFileId}
					name={file.name}
					builder={file.builder}
					theme={file.theme}
					background={file.background}
					instructionsContent={file.instructionsContent}
					themes={pickmeThemes}
				/>
			</Section>
			<Section>
				<div>
					<Button icon="plus" slug="additem" onClick={onAddItem} />
					<Button
						icon="plus-hexagon"
						slug="addbulkitems"
						onClick={onAddBulkModal}
					/>
				</div>
				<div>
					<Button
						icon="eye"
						slug="showall"
						onClick={() => onChangeVisibleAll(true)}
						disabled={
							!Object.entries(file?.items).filter(([id, item]) => !item.visible)
								.length
						}
					/>
					<Button
						icon="eye-slash"
						slug="hideall"
						onClick={() => onChangeVisibleAll(false)}
						disabled={
							!Object.entries(file?.items).filter(([id, item]) => item.visible)
								.length
						}
					/>
					<Button
						icon="trash"
						slug="removeall"
						onClick={onRemoveAllModal}
						disabled={!Object.entries(file.items).length}
					/>
				</div>
			</Section>
			<Section fullHeight paddingBottom>
				{!Object.entries(file?.items).length ? (
					<AddMoreContent>Add more items to play</AddMoreContent>
				) : (
					<List>
						{Object.entries(file?.items)
							.sort((a: [string, Item], b: [string, Item]) =>
								a[1].order < b[1].order ? -1 : a[1].order > b[1].order ? 1 : 0
							)
							.map(([id, item], i) => {
								item = { ...item, id: id };
								return (
									<Row
										key={id}
										{...item}
										onChangeVisible={onChangeVisible}
										onChangeName={onChangeName}
										onChangeWeight={onChangeWeight}
										onRemove={onRemoveItem}
									/>
								);
							})}
					</List>
				)}
			</Section>
		</>
	);
};

export default PickmeEdit;

const AddMoreContent = styled("div")({
	alignSelf: "center",
	flex: 1,
	color: Colors.gray4,
});

interface RowProps extends PickmeItem {
	onChangeVisible: (id: string, value: boolean) => void;
	onChangeName: (id: string, value: string) => void;
	onChangeWeight: (id: string, value: string | number) => void;
	onRemove: (id: string) => void;
}

const Row: React.FC<RowProps> = (props) => {
	return (
		<RowContainer key={props.id} visible={props.visible}>
			<Button
				slug="handle"
				name={String(props.order)}
				skin={ButtonStyle.CLEAR}
				onClick={() => {
					return;
				}}
				disabled
			/>
			{props.visible ? (
				<Button
					slug="visible"
					icon="eye"
					skin={ButtonStyle.CLEAR}
					onClick={() => props.onChangeVisible(props.id, false)}
				/>
			) : (
				<Button
					slug="hide"
					icon="eye-slash"
					skin={ButtonStyle.CLEAR}
					onClick={() => props.onChangeVisible(props.id, true)}
				/>
			)}
			<LockedInput
				slug="name"
				value={props.name}
				onChange={(value) => props.onChangeName(props.id, value)}
			/>
			<RowDropdown
				slug="weight"
				value={props.weight}
				onChange={(value) => props.onChangeWeight(props.id, value)}
				options={pickmeWeights}
				title="Odds"
				description="How likely this item will get picked"
			/>
			<Button
				slug="delete"
				icon="trash"
				skin={ButtonStyle.CLEAR}
				onClick={() => props.onRemove(props.id)}
			/>
		</RowContainer>
	);
};

const RowContainer = styled("li")(
	{
		display: "flex",
		gap: "1rem",
		padding: "1rem",
	},
	(props: { visible: boolean }) => {
		if (!props.visible) {
			return {
				"> *": { opacity: 0.25 },
			};
		}

		return {};
	}
);
