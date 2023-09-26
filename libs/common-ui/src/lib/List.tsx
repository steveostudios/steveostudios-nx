import styled from "@emotion/styled";
import { CheckboxInput } from "./CheckboxInput";
import { Button, ButtonColor } from "./Button";
import { Colors } from "./Colors";
import { Table } from "./Layout";
import React, { useState } from "react";
// import { useModals } from "../../context/ModalProvider";
// import RemoveAllModal from "../modals/RemoveAll";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Image } from "./Image";

interface ListProps {
	docType: string;
	items: any[];
	columns: Column[];
	header?: React.ReactNode;
	rowOptions?: RowOptionProps[];
	onRemoveAll?: () => void;
	onRemoveSelected?: () => void;
	selected: string[];
	setSelected: (selected: string[]) => void;
}

interface RowOptionProps {
	slug: string;
	icon: IconProp;
	onClick: (id: string) => void;
	color?: ButtonColor;
}

interface Column {
	name: string;
	label: string;
	order: number;
	sortable?: boolean;
	flex?: number;
	imageWidth?: number;
	image?: boolean;
}

export const List: React.FC<ListProps> = (props) => {
	// const [selected, setSelected] = useState<string[]>([]);
	// const { pushModal } = useModals();
	const { selected, setSelected } = props;

	const onSelect = (id: string) => {
		if (selected.includes(id)) {
			setSelected(selected.filter((item) => item !== id));
		} else {
			setSelected([...selected, id]);
		}
	};

	const onSelectAll = () => {
		if (selected.length === props.items.length) {
			setSelected([]);
		} else {
			setSelected(props.items.map((item) => item.id));
		}
	};

	const onRemoveSelected = () => {
		if (props.onRemoveSelected) props.onRemoveSelected();
	};

	return (
		<Table>
			<Header
				onSelectAll={onSelectAll}
				onRemoveSelected={onRemoveSelected}
				selected={props.items.length === selected.length}
				selectedCount={selected.length}
			>
				{props.columns.map((column) => (
					<div key={column.name} style={{ flex: column.flex }}>
						{column.label}
					</div>
				))}
			</Header>
			{!props.items && <Message>Loading...</Message>}
			{props.items && props.items.length === 0 && (
				<Message>No posts found</Message>
			)}
			{props.items &&
				props.items.map((item, i) => (
					<Row
						key={i}
						selected={selected.includes(item.id)}
						onSelected={onSelect}
						rowOptions={props.rowOptions}
						id={item.id}
					>
						{props.columns.map((column) => {
							if (column.image) {
								return (
									<div key={column.name} style={{ flex: column.flex }}>
										<Image
											bucket={props.docType}
											value={item[column.name]}
											alt="cover"
											width={8}
										/>
									</div>
								);
							} else {
								return (
									<div key={column.name} style={{ flex: column.flex }}>
										{item[column.name]}
									</div>
								);
							}
						})}
					</Row>
				))}
		</Table>
	);
};

const Message = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "3rem",
	color: Colors.trim,
});

interface HeaderProps {
	children: React.ReactNode;
	selected: boolean;
	onSelectAll: () => void;
	onRemoveSelected?: () => void;
	selectedCount: number;
}

const Header: React.FC<HeaderProps> = (props) => {
	return (
		<HeaderStyled>
			<CheckboxInput
				label="select"
				visible
				slug="select"
				value={props.selected}
				onChange={() => props.onSelectAll()}
			/>
			{props.children}
			<HeaderOptions>
				{props.onRemoveSelected !== undefined && (
					<Button
						slug="remove"
						onClick={() => props.onRemoveSelected?.()}
						color={ButtonColor.DANGER}
						icon={"trash"}
						disabled={props.selectedCount === 0}
					/>
				)}
			</HeaderOptions>
		</HeaderStyled>
	);
};

const HeaderStyled = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.5rem",
	borderBottom: `1px solid ${Colors.black}`,
	minHeight: "4rem",
	fontWeight: "bold",
	fontSize: "1.25rem",
	gap: "1rem",
});

const HeaderOptions = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	justifyContent: "flex-end",
});

interface RowProps {
	id: string;
	children: React.ReactNode;
	selected: boolean;
	onSelected: (id: string) => void;
	onEdit?: (id: string) => void;
	onRemove?: (id: string) => void;
	onDuplicate?: (id: string) => void;
	rowOptions?: RowOptionProps[];
}

const Row: React.FC<RowProps> = (props) => {
	return (
		<RowStyled>
			<CheckboxInput
				label="select"
				visible
				slug="select"
				value={props.selected}
				onChange={() => props.onSelected(props.id)}
			/>
			{props.children}
			<RowOptions>
				{props.rowOptions?.map((option, i) => (
					<Button
						key={i}
						slug={option.slug}
						onClick={() => option.onClick(props.id)}
						color={option.color}
						icon={option.icon}
					/>
				))}
			</RowOptions>
		</RowStyled>
	);
};

const RowStyled = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.5rem",
	borderBottom: `1px solid ${Colors.trim}`,
	minHeight: "4rem",
	gap: "1rem",
});

const RowOptions = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	justifyContent: "flex-end",
});
