import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Button, ButtonStyle } from "@nx/ui";
import Score from "./Score";
import {
	Score as IScore,
	Timer as ITimer,
	Widgets,
	Logo as ILogo,
} from "@nx/shared-assets";
import Timer from "./Timer";
import Logo from "./Logo";
import { onUpdateUserSettings } from "@nx/firebase";

interface Props {
	selectedWidget: Widgets;
	score: IScore;
	timer: ITimer;
	logo: ILogo;
	userId: string;
}

const WidgetSidebar: React.FC<Props> = (props) => {
	const onSelectWidget = (value: Widgets) => {
		if (value === props.selectedWidget) return;
		onUpdateUserSettings(props.userId, { selectedWidget: value });
	};

	const selectedStyle = {
		borderBottom: `0.5rem solid ${Colors.blue}`,
	};
	const deselectedStyle = {
		opacity: 0.5,
		borderBottom: `0.5rem solid transparent`,
	};

	return (
		<Container>
			<Tabbar>
				<Button
					slug="score"
					icon="tally"
					skin={ButtonStyle.CLEAR}
					onClick={() => onSelectWidget(Widgets.SCORE)}
					style={
						props.selectedWidget === Widgets.SCORE
							? selectedStyle
							: deselectedStyle
					}
				/>
				<Button
					slug="timer"
					icon="stopwatch"
					skin={ButtonStyle.CLEAR}
					onClick={() => onSelectWidget(Widgets.TIMER)}
					style={
						props.selectedWidget === Widgets.TIMER
							? selectedStyle
							: deselectedStyle
					}
				/>
				<Button
					slug="logo"
					icon="flag"
					skin={ButtonStyle.CLEAR}
					onClick={() => onSelectWidget(Widgets.LOGO)}
					style={
						props.selectedWidget === Widgets.LOGO
							? selectedStyle
							: deselectedStyle
					}
				/>
			</Tabbar>

			{props.selectedWidget === Widgets.SCORE && (
				<Score score={props.score} userId={props.userId} />
			)}

			{props.selectedWidget === Widgets.TIMER && (
				<Timer timer={props.timer} userId={props.userId} />
			)}

			{props.selectedWidget === Widgets.LOGO && (
				<Logo logo={props.logo} userId={props.userId} />
			)}
		</Container>
	);
};

export default WidgetSidebar;

const Container = styled("main")({
	width: "40rem",
	gap: "2rem",
	display: "flex",
	flexDirection: "column",
	border: "none",
	borderLeftStyle: "solid",
	borderLeftWidth: 1,
	borderLeftColor: Colors.gray9,
});

const Tabbar = styled("div")({
	display: "flex",
	width: "inherit",
	height: "6rem",
	alignItems: "center",
	gap: "1rem",
	borderBottomStyle: "solid",
	borderBottomWidth: 1,
	borderBottomColor: Colors.gray9,
});
