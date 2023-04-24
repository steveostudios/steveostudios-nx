import styled from "@emotion/styled";
import {
	Timer as ITimer,
	TimerDirection,
	TimerPosition,
	TimerPostAction,
	TimerPreAction,
} from "@nx/shared-assets";
import WidgetHeader from "./WidgetHeader";
import { onUpdateUserSettings } from "@nx/firebase";
import {
	Button,
	ButtonGroup,
	ButtonStyle,
	Label,
	NumberInput,
	Section,
	Toggle,
} from "@nx/ui";

interface Props {
	userId: string;
	timer: ITimer;
}

const Timer: React.FC<Props> = (props) => {
	const doSomething = () => {
		return;
	};

	const onChangeShow = (value: boolean) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, show: value },
		});
	};

	const onChangeDirection = (value: TimerDirection) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, direction: value },
		});
	};

	const onChangePreAction = (value: TimerPreAction) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, preAction: value },
		});
	};
	const onChangePostAction = (value: TimerPostAction) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, postAction: value },
		});
	};

	const onChangePosition = (value: TimerPosition) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, position: value },
		});
	};

	const onChangeIsPlaying = (value: boolean) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, isPlaying: value },
		});
	};

	const onChangePlate = (value: boolean) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, plate: value },
		});
	};

	return (
		<>
			<WidgetHeader
				icon="stopwatch"
				title="Timer"
				show={props.timer.show}
				onChangeShow={onChangeShow}
			/>
			<Section column>
				<ButtonGroup slug="direction" label="Direction">
					<Button
						slug="up"
						icon="arrow-up"
						skin={
							props.timer.direction === TimerDirection.UP
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangeDirection(TimerDirection.UP)}
					/>
					<Button
						slug="down"
						icon="arrow-down"
						skin={
							props.timer.direction === TimerDirection.DOWN
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangeDirection(TimerDirection.DOWN)}
					/>
				</ButtonGroup>
				<ButtonGroup slug="pretimer" label="Pre Timer">
					<Button
						slug="start"
						icon="ban"
						skin={
							props.timer.preAction === TimerPreAction.START
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePreAction(TimerPreAction.START)}
					/>
					<Button
						slug="count"
						icon="flag"
						skin={
							props.timer.preAction === TimerPreAction.COUNT
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePreAction(TimerPreAction.COUNT)}
					/>
				</ButtonGroup>
				<ButtonGroup slug="postaction" label="Post Action">
					<Button
						slug="stop"
						icon="times-hexagon"
						skin={
							props.timer.postAction === TimerPostAction.STOP
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePostAction(TimerPostAction.STOP)}
					/>
					<Button
						slug="reverse"
						icon="arrow-up"
						skin={
							props.timer.postAction === TimerPostAction.REVERSE
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePostAction(TimerPostAction.REVERSE)}
					/>
					<Button
						slug="alert"
						icon="stopwatch"
						skin={
							props.timer.postAction === TimerPostAction.ALERT
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePostAction(TimerPostAction.ALERT)}
					/>
				</ButtonGroup>
				<ButtonGroup slug="position" label="Position">
					<Button
						slug="full"
						icon="expand"
						skin={
							props.timer.position === TimerPosition.FULL
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePosition(TimerPosition.FULL)}
					/>
					<Button
						slug="center"
						icon="compress"
						skin={
							props.timer.position === TimerPosition.CENTER
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePosition(TimerPosition.CENTER)}
					/>
					<Button
						slug="tl"
						name="TL"
						skin={
							props.timer.position === TimerPosition.TOPLEFT
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePosition(TimerPosition.TOPLEFT)}
					/>
					<Button
						slug="tr"
						name="TR"
						skin={
							props.timer.position === TimerPosition.TOPRIGHT
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePosition(TimerPosition.TOPRIGHT)}
					/>
					<Button
						slug="bl"
						name="BL"
						skin={
							props.timer.position === TimerPosition.BOTTOMLEFT
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePosition(TimerPosition.BOTTOMLEFT)}
					/>
					<Button
						slug="br"
						name="BR"
						skin={
							props.timer.position === TimerPosition.BOTTOMRIGHT
								? ButtonStyle.SECONDARY
								: ButtonStyle.BORDER
						}
						onClick={() => onChangePosition(TimerPosition.BOTTOMRIGHT)}
					/>
				</ButtonGroup>
			</Section>
			<Section>
				<Label slug="time" label="Time" />

				<NumberInput
					slug="hour"
					value={0}
					onChange={doSomething}
					min={0}
					max={100}
					width="2rem"
				/>
				<NumberInput
					slug="min"
					value={0}
					onChange={doSomething}
					min={0}
					max={100}
				/>
				<NumberInput
					slug="sec"
					value={0}
					onChange={doSomething}
					min={0}
					max={100}
				/>
			</Section>
			<Section>
				{props.timer.isPlaying ? (
					<Button
						slug="pause"
						icon="pause"
						onClick={() => onChangeIsPlaying(false)}
					/>
				) : (
					<Button
						slug="play"
						icon="play"
						onClick={() => onChangeIsPlaying(true)}
					/>
				)}
				<Button
					slug="reset"
					icon="undo"
					onClick={doSomething}
					disabled={!props.timer.elapsed}
				/>
			</Section>
			<Section>
				<Toggle
					label="Background"
					slug="background"
					value={props.timer.plate}
					onChange={onChangePlate}
				/>
			</Section>
		</>
	);
};

export default Timer;

const Row = styled("div")({
	display: "flex",
});
