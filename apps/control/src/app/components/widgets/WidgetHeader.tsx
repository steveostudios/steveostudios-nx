import styled from "@emotion/styled";
import { Toggle } from "@nx/ui";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	title: string;
	icon: IconProp;
	show: boolean;
	onChangeShow: (value: boolean) => void;
}

const WidgetHeader: React.FC<Props> = (props) => {
	return (
		<Container>
			<div>
				<FontAwesomeIcon icon={props.icon} />
				{props.title}
			</div>
			<Toggle slug="show" value={!!props.show} onChange={props.onChangeShow} />
		</Container>
	);
};

export default WidgetHeader;

const Container = styled("div")({
	height: "4rem",
	border: "none",
	display: "flex",
	alignItems: "center",
	padding: "0 2rem",
	justifyContent: "space-between",
	svg: {
		marginRight: "1rem",
	},
});
