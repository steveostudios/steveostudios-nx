import styled from "@emotion/styled";
import { onUpdateFile } from "@nx/firebase";
import { Colors } from "@nx/style";
import {
	Item,
	wheelWeights,
	wheelSizes,
	WheelFile,
	WheelItem,
	wheelThemes,
	wheelPositions,
} from "@nx/shared-assets";
import { Button, List, ButtonStyle, Select, LockedInput, Option } from "@nx/ui";
import DisplayOptions from "./../../Main/DisplayOptions";
import { useModals } from "./../../../providers/ModalProvider";
import { uuidv4 } from "@firebase/util"; // TODO: THis is probably not right
import RemoveAllModal from "./../../modals/RemoveAllModal";
import AddBulkModal, { AddBulkModalData } from "../../modals/AddBulkModal";

interface Props {
	file: WheelFile;
}

const WheelEdit: React.FC<Props> = (props) => {
	const { file } = props;
	const { push } = useModals();
	const selectedFileId = props.file.id;

	const recalcItems = (items: { [id: string]: Omit<WheelItem, "id"> }) => {
		const visibleItems = Object.entries(items)
			.filter(([id, item]) => item.visible)
			.sort(
				(
					prev: [string, Omit<WheelItem, "id">],
					next: [string, Omit<WheelItem, "id">]
				) => next[1].order - prev[1].order
			);
		const totalSegments = visibleItems
			.map(([id, item]) => {
				return [...Array(item.size)].map(() => id);
			})
			.flat(1).length;

		const segment: number = 360 / totalSegments;
		let segmentCounter = 0;

		const updatedItems = Object.entries(items)
			.sort(
				(
					prev: [string, Omit<WheelItem, "id">],
					next: [string, Omit<WheelItem, "id">]
				) => prev[1].order - next[1].order
			)
			.map(([id, item], i) => {
				const newItem = [
					id,
					{
						...item,
						order: i + 1,
						startAngle: segmentCounter,
						textAngle: item.visible
							? segmentCounter + (item.size * segment) / 2
							: segmentCounter,
						percent: item.visible ? (item.size / totalSegments) * 100 : 0,
					},
				];
				if (item.visible) segmentCounter = segmentCounter + item.size * segment;

				return newItem;
			});

		return Object.fromEntries(updatedItems);
	};

	const newItem = (items: Partial<WheelItem>[]) => {
		if (!items.length) return;

		const startOrder = !Object.keys(file.items).length
			? 1
			: Object.entries(file.items).sort(
					(prev: [string, Item], next: [string, Item]) =>
						next[1].order - prev[1].order
			  )[0][1].order;

		const startColor = !Object.keys(file.items).length
			? 1
			: Object.entries(file.items).sort(
					(prev: [string, WheelItem], next: [string, Item]) =>
						next[1].order - prev[1].order
			  )[0][1].color;

		const newItems = items.map((item, i) => {
			const id = uuidv4();
			const order = startOrder + i;
			const color = startColor + (i % 8);
			const newItem: Omit<WheelItem, "id"> = {
				name: item.name || "test",
				order: order,
				visible: item.visible || true,
				weight: item.weight || 2,
				size: item.size || 1,
				color: item.color || color,
				startAngle: item.startAngle || 0,
				textAngle: item.textAngle || 0,
				percent: item.percent || 0,
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

	const onChangeSize = (id: string, value: string | number) => {
		const item = (file.items[id] = { ...file.items[id], size: Number(value) });
		onUpdateFile(selectedFileId, {
			items: recalcItems({ ...file.items, [id]: item }),
		});
	};

	const onChangeColor = (id: string, value: string | number) => {
		const item = (file.items[id] = { ...file.items[id], color: Number(value) });
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
			<Section>
				<DisplayOptions
					selectedFileId={selectedFileId}
					name={file.name}
					builder={file.builder}
					theme={file.theme}
					background={file.background}
					instructionsContent={file.instructionsContent}
					themes={wheelThemes}
					position={file.position}
					positions={wheelPositions}
				/>
			</Section>
			<SectionNoBorder>
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
			</SectionNoBorder>
			<SectionFullHeight>
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
										onChangeSize={onChangeSize}
										onChangeColor={onChangeColor}
										onRemove={onRemoveItem}
										colors={wheelThemes[file.theme].colors}
									/>
								);
							})}
					</List>
				)}
			</SectionFullHeight>
		</>
	);
};

export default WheelEdit;

const Section = styled("div")({
	display: "flex",
	gap: "1rem",
	padding: "2rem",
	borderBottomColor: Colors.gray9,
	borderBottomWidth: 1,
	borderBottomStyle: "solid",
});
const SectionFullHeight = styled("div")({
	display: "flex",
	gap: "1rem",
	padding: "2rem",
	borderBottomColor: Colors.gray9,
	borderBottomWidth: 1,
	borderBottomStyle: "solid",
	overflow: "hidden",
	flex: 1,
});

const SectionNoBorder = styled("div")({
	display: "flex",
	gap: "1rem",
	padding: "2rem 2rem 0 2rem",
	alignItems: "center",
	justifyContent: "space-between",
	"> * ": {
		display: "flex",
		gap: "1rem",
	},
});

const AddMoreContent = styled("div")({
	alignSelf: "center",
	flex: 1,
	color: Colors.gray4,
});

interface RowProps extends WheelItem {
	colors: string[];
	onChangeVisible: (id: string, value: boolean) => void;
	onChangeName: (id: string, value: string) => void;
	onChangeWeight: (id: string, value: string | number) => void;
	onChangeSize: (id: string, value: string | number) => void;
	onChangeColor: (id: string, value: string | number) => void;
	onRemove: (id: string) => void;
}

const Row: React.FC<RowProps> = (props) => {
	const colorOptions: Option[] = props.colors.map((item, i) => ({
		name: item,
		value: i,
	}));

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
			<Select
				slug="weight"
				value={props.weight}
				onChange={(value) => props.onChangeWeight(props.id, value)}
				options={wheelWeights}
			/>
			<Select
				slug="size"
				value={props.size}
				onChange={(value) => props.onChangeSize(props.id, value)}
				options={wheelSizes}
			/>
			<Select
				slug="color"
				value={props.color}
				onChange={(value) => props.onChangeColor(props.id, value)}
				options={colorOptions}
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
