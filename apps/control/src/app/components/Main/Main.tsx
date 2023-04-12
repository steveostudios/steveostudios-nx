import styled from "@emotion/styled";
import { Logo, Modes, Score, Timer, Widgets } from "@nx/shared-assets";
import { ReactNode } from "react";
import WidgetSidebar from "../widgets/Sidebar";
import MainHeader from "./MainHeader";

interface Props {
	children: ReactNode;
	selectedFileId: string | null;
	titleGraphic?: boolean;
	sounds?: boolean;
	instructions?: boolean;
	userId: string;
	selectedWidget: Widgets;
	selectedMode: Modes;
	score: Score;
	timer: Timer;
	logo: Logo;
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
			<MainContainer>
				<Wrapper>{props.children}</Wrapper>
				<WidgetSidebar
					userId={props.userId}
					score={props.score}
					timer={props.timer}
					logo={props.logo}
					selectedWidget={props.selectedWidget}
				/>
			</MainContainer>
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
const MainContainer = styled("div")({
	display: "flex",
	flex: 1,
	height: "100vh",
	flexDirection: "row",
});
const Wrapper = styled("div")({
	flex: 1,
	maxHeight: "calc(100vh - 8rem)",
	display: "flex",
	flexDirection: "column",
});
