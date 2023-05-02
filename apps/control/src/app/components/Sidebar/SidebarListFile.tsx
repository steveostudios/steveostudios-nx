import { useState } from "react";
import styled from "@emotion/styled";
import { Button, ButtonSize, ButtonStyle, Popover, ContextMenu } from "@nx/ui";
import { onDeleteFile, onRenameFile, onSetFile } from "@nx/firebase";
import { builders, SimpleFile } from "@nx/shared-assets";
import { useModals } from "../../providers/ModalProvider";
import RenameFileModal, {
	RenameFileModalData,
} from "../modals/RenameFileModal";
import DeleteFileModal from "../modals/DeleteFileModal";

interface Props {
	file: SimpleFile;
	userId: string;
	selected: boolean;
	setSelectedFileId: (value: string) => void;
}

const SidebarListFile: React.FC<Props> = (props) => {
	const [contextMenu, setContextMenu] = useState(false);
	const { push } = useModals();

	const onRenameModal = () => {
		push({
			component: RenameFileModal,
			initialData: {
				id: props.file.id,
				value: props.file.name,
			},
			title: "Rename File",
			onConfirm: onRenameModalConfirm,
			onCancel: () => {
				return;
			},
		});
	};

	const onRenameModalConfirm = (data: RenameFileModalData) => {
		onRenameFile(props.userId, data.id, data.value);
	};

	const onDeleteModal = () => {
		push({
			component: DeleteFileModal,
			title: "Delete File",
			onConfirm: onDeleteModalConfirm,
			onCancel: () => {
				return;
			},
		});
	};

	const onDeleteModalConfirm = () => {
		// if (props.selected) {
		onSetFile(props.userId, "");
		// }
		onDeleteFile(props.userId, props.file.id);
	};

	return (
		<Container key={props.file.id} className={props.selected ? "selected" : ""}>
			<FileButton onClick={() => props.setSelectedFileId(props.file.id)}>
				<img
					src={
						builders.find((item) => item.slug === props.file.builder)?.circle
					}
					alt={props.file.builder}
				/>
				{props.file.name}
			</FileButton>
			<Popover
				active={contextMenu}
				position="right"
				setActive={(value) => setContextMenu(value)}
				target={
					<Button
						slug="options"
						icon="ellipsis-h"
						skin={ButtonStyle.GRAY}
						size={ButtonSize.SMALL}
						onClick={() => setContextMenu(!contextMenu)}
					/>
				}
				popover={
					<ContextMenu
						items={[
							{ icon: "pencil", label: "Rename", onClick: onRenameModal },
							{ icon: "trash", label: "Delete", onClick: onDeleteModal },
							{ icon: "pencil", label: "Rename", onClick: onRenameModal },
							{ icon: "trash", label: "Delete", onClick: onDeleteModal },
						]}
					/>
				}
			/>
		</Container>
	);
};

export default SidebarListFile;

const Container = styled("li")({
	height: "4rem",
	padding: "0 1rem",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
});

const FileButton = styled("div")({
	display: "flex",
	alignItems: "center",
	height: "100%",
	width: "100%",
	flex: 1,
	img: {
		width: "2rem",
		marginRight: "1rem",
	},
});
