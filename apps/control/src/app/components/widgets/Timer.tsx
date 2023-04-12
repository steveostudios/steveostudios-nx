import styled from "@emotion/styled";
import { Timer as ITimer } from "@nx/shared-assets";
import WidgetHeader from "./WidgetHeader";
import { onUpdateUserSettings } from "@nx/firebase";

interface Props {
	userId: string;
	timer: ITimer;
}

const Timer: React.FC<Props> = (props) => {
	// const doSomething = () => {
	// 	return;
	// };
	const onChangeShow = (value: boolean) => {
		onUpdateUserSettings(props.userId, {
			timer: { ...props.timer, show: value },
		});
	};

	return (
		<Container>
			<WidgetHeader
				icon="stopwatch"
				title="Timer"
				show={props.timer.show}
				onChangeShow={onChangeShow}
			/>
		</Container>
	);
};

export default Timer;

const Container = styled("div")({});
