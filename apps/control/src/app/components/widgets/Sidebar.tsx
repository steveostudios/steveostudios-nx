import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { TabGroup } from "@nx/ui";
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

	return (
		<Container>
			<div>
				<TabGroup
					tabs={[
						{
							slug: "score",
							label: "Score",
							icon: "tally",
							onClick: () => onSelectWidget(Widgets.SCORE),
							selected: props.selectedWidget === Widgets.SCORE,
						},
						{
							slug: "timer",
							label: "Timer",
							icon: "stopwatch",
							onClick: () => onSelectWidget(Widgets.TIMER),
							selected: props.selectedWidget === Widgets.TIMER,
						},
						{
							slug: "logo",
							label: "Logo",
							icon: "flag",
							onClick: () => onSelectWidget(Widgets.LOGO),
							selected: props.selectedWidget === Widgets.LOGO,
						},
					]}
				/>
			</div>

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

const Container = styled("div")({
	minWidth: "40rem",
	maxWidth: "40rem",
	display: "flex",
	flexDirection: "column",
	border: "none",
	borderLeftStyle: "solid",
	borderLeftWidth: 1,
	borderLeftColor: Colors.gray9,
	flex: "0 1",
	maxHeight: "calc(100vh - 8rem)",
});
