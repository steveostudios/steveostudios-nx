import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import SidebarCreateFile from "./SidebarCreateFile";
import SidebarHeader from "./SidebarHeader";
import SidebarList from "./SidebarList";
import SidebarPreview from "./SidebarPreview";
import SidebarListHeader from "./SidebarListHeader";

interface Props {
	userId: string;
	selectedFileId: string | null;
	setSelectedFileId: (value: string) => void;
}

const Sidebar: React.FC<Props> = (props) => {
	return (
		<Container>
			<SidebarHeader />
			<SidebarPreview userId={props.userId} />
			<SidebarListHeader />
			<SidebarList
				userId={props.userId}
				selectedFileId={props.selectedFileId}
				setSelectedFileId={props.setSelectedFileId}
			/>
			<SidebarCreateFile userId={props.userId} />
		</Container>
	);
};

export default Sidebar;

const Container = styled("aside")({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	boxSizing: "border-box",
	borderRightColor: Colors.gray9,
	borderRightWidth: "1px",
	borderRightStyle: "solid",
});
