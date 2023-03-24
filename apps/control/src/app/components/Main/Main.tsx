import styled from "@emotion/styled";
import { Modes } from "@nx/shared-assets";
import { ReactNode } from "react";
import MainHeader from "./MainHeader";

interface Props {
	children: ReactNode;
	selectedFileId: string | null;
	titleGraphic?: boolean;
	sounds?: boolean;
	instructions?: boolean;
	userId: string;
	selectedMode: Modes;
}

const Main: React.FC<Props> = (props) => {
	return (
		<Container>
			<MainHeader
				selectedMode={props.selectedMode}
				userId={props.userId}
				selectedFileId={props.selectedFileId}
				titleGraphic={props.titleGraphic}
				sounds={props.sounds}
				instructions={props.instructions}
			/>
			<Wrapper>{props.children}</Wrapper>
		</Container>
	);
};

export default Main;

const Container = styled("main")({
	display: "flex",
	flexDirection: "column",
	flex: 1,
	height: "100vh",
});

const Wrapper = styled("div")({
	flex: 1,
	maxHeight: "calc(100vh - 8rem)",
	display: "flex",
	flexDirection: "column",
});
