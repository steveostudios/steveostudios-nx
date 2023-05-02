import styled from "@emotion/styled";
import { ArrayAction, onUpdateArray, onUpdateFile } from "@nx/firebase";
import { Colors, Shadows } from "@nx/style";
import {
	BoxesFile,
	Item,
	NextWinnerType,
	PickmeFile,
	WheelFile,
} from "@nx/shared-assets";
import { Button, List, ButtonStyle, TextInput, Section, Popover } from "@nx/ui";
import { useEffect, useState } from "react";

interface Props {
	file: BoxesFile | PickmeFile | WheelFile;
}

const Preselected: React.FC<Props> = (props) => {
	const [search, setSearch] = useState("");
	const [showPreselectAdd, setShowPreselectAdd] = useState(false);
	const { file } = props;
	const selectedFileId = file.id;

	useEffect(() => {
		setSearch("");
	}, [selectedFileId]);

	const onClearSearch = () => {
		setSearch("");
	};

	const onSetNextPreselectedId = (value: string | null) => {
		onUpdateFile(selectedFileId, { nextPreselectedId: value });
	};

	const onAddPreselectedId = (id: string) => {
		onUpdateArray(selectedFileId, "preselectedIds", id, ArrayAction.ADD);
	};
	const onRemovePreselectedId = (id: string) => {
		if (file.nextPreselectedId === id) {
			onUpdateFile(selectedFileId, {
				nextPreselectedId: null,
				nextWinnerType: NextWinnerType.RANDOM,
			});
		}
		onUpdateArray(selectedFileId, "preselectedIds", id, ArrayAction.REMOVE);
	};

	return (
		<Section fullHeight column>
			{file.showPicker &&
				file.nextWinnerType === NextWinnerType.PRESELECTED && (
					<Header>
						<div>Preselected Items</div>
						<Popover
							active={showPreselectAdd}
							setActive={() => setShowPreselectAdd(!showPreselectAdd)}
							maxHeight={56}
							target={
								<Button
									slug="showPreselectedAdd"
									icon="plus"
									onClick={() => setShowPreselectAdd(!showPreselectAdd)}
								/>
							}
							popover={
								<PreselectedAdd>
									<div>
										<TextInput
											slug="search"
											value={search}
											onChange={setSearch}
										/>
										<Button
											slug="spin"
											onClick={onClearSearch}
											icon="times"
											disabled={!search}
										/>
									</div>
									{Object.entries(file?.items).filter(
										([id]) => !file.preselectedIds.includes(id)
									).length ? (
										Object.entries(file?.items)
											.filter(([id]) => !file.preselectedIds.includes(id))
											.filter(([_, item]) =>
												item.name.toLowerCase().includes(search.toLowerCase())
											).length ? (
											<List>
												{Object.entries(file?.items)
													.filter(([id]) => !file.preselectedIds.includes(id))
													.filter(([_, item]) =>
														item.name
															.toLowerCase()
															.includes(search.toLowerCase())
													)
													.sort((a: [string, Item], b: [string, Item]) =>
														a[1].name < b[1].name
															? -1
															: a[1].name > b[1].name
															? 1
															: 0
													)
													.map(([id, item]) => {
														item = { ...item, id: id };
														return (
															<Row
																key={id}
																{...item}
																onAdd={onAddPreselectedId}
															/>
														);
													})}
											</List>
										) : (
											<List>
												<NoItems>No results found</NoItems>
											</List>
										)
									) : (
										<List>
											<NoItems>Add some items</NoItems>
										</List>
									)}
								</PreselectedAdd>
							}
						/>
					</Header>
				)}
			{file.nextWinnerType === NextWinnerType.PRESELECTED && file.showPicker ? (
				Object.entries(file?.items).filter(([id]) =>
					file.preselectedIds.includes(id)
				).length ? (
					<List>
						{Object.entries(file?.items)
							.filter(([id]) => file.preselectedIds.includes(id))
							.sort((a: [string, Item], b: [string, Item]) =>
								a[1].name < b[1].name ? -1 : a[1].name > b[1].name ? 1 : 0
							)
							.map(([id, item]) => {
								item = { ...item, id: id };
								return (
									<Row
										key={id}
										{...item}
										onRemove={onRemovePreselectedId}
										onSelect={() => onSetNextPreselectedId(id)}
										selected={item.id === file.nextPreselectedId}
									/>
								);
							})}
					</List>
				) : (
					<List>
						<NoItems>No preselected items</NoItems>
					</List>
				)
			) : null}
		</Section>
	);
};

export default Preselected;

const Header = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: Colors.gray9,
	"> *": {
		margin: "1rem",
	},
});

const PreselectedAdd = styled("div")({
	right: "4rem",
	backgroundColor: Colors.gray10,
	boxShadow: Shadows.standard,
	borderRadius: "0.5rem",
	display: "flex",
	gap: "1rem",
	flexDirection: "column",
	padding: "2rem",
	alignItems: "center",
	justifyContent: "space-between",
	minWidth: "32rem",
	maxWidth: "50%",
	maxHeight: "unset",
	flex: 1,
	"> * ": {
		width: "100%",
		display: "flex",
		gap: "1rem",
	},
});

const NoItems = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "100%",
	color: Colors.gray4,
});

interface RowProps extends Item {
	onRemove?: (id: string) => void;
	onAdd?: (id: string) => void;
	onSelect?: (id: string) => void;
	selected?: boolean;
}

const Row: React.FC<RowProps> = (props) => {
	const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
		event.stopPropagation();
		if (!props.onSelect) return;
		props.onSelect(props.id);
	};

	return (
		<RowContainer
			key={props.id}
			className={(props.selected && "selected") || ""}
			onClick={onClick}
		>
			{props.name}
			{props.onRemove && (
				<Button
					slug="remove"
					icon="minus"
					skin={ButtonStyle.BORDER}
					stopPropagation
					onClick={() => props.onRemove && props.onRemove(props.id)}
				/>
			)}
			{props.onAdd && (
				<Button
					slug="add"
					icon="plus"
					skin={ButtonStyle.SECONDARY}
					stopPropagation
					onClick={() => props.onAdd && props.onAdd(props.id)}
				/>
			)}
		</RowContainer>
	);
};

const RowContainer = styled("li")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: "1rem",
	padding: "1rem",
});
