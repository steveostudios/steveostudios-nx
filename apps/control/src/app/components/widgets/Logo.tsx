import styled from "@emotion/styled";
import { Colors, Shadows } from "@nx/style";
import { Logo as ILogo } from "@nx/shared-assets";
import WidgetHeader from "./WidgetHeader";
import { onUpdateUserSettings } from "@nx/firebase";

interface Props {
	userId: string;
	logo: ILogo;
}

const Logo: React.FC<Props> = (props) => {
	// const doSomething = () => {
	// 	return;
	// };
	const onChangeShow = (value: boolean) => {
		onUpdateUserSettings(props.userId, {
			logo: { ...props.logo, show: value },
		});
	};

	return (
		<Container>
			<WidgetHeader
				icon="flag"
				title="Logo"
				show={props.logo.show}
				onChangeShow={onChangeShow}
			/>
		</Container>
	);
};

export default Logo;

const Container = styled("div")({});
