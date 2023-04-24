import styled from "@emotion/styled";
import { Section, Toggle } from "@nx/ui";
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
		<Section>
			<div>
				<FontAwesomeIcon icon={props.icon} />
				{props.title}
			</div>
			<Toggle slug="show" value={!!props.show} onChange={props.onChangeShow} />
		</Section>
	);
};

export default WidgetHeader;
