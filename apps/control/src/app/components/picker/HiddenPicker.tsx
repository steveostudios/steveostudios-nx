import styled from "@emotion/styled";
import { onUpdateFile } from "@nx/firebase";
import {
	BoxesFile,
	NextWinnerType,
	PickmeFile,
	WheelFile,
} from "@nx/shared-assets";
import { Colors } from "@nx/style";
import { Button, Section } from "@nx/ui";

interface Props {
	file: BoxesFile | PickmeFile | WheelFile;
}

const HiddenPicker: React.FC<Props> = (props) => {
	const { file } = props;
	const selectedFileId = file.id;

	const onShowPicker = (value: boolean) => {
		onUpdateFile(selectedFileId, {
			showPicker: value,
			nextWinnerType: NextWinnerType.RANDOM,
		});
	};

	if (file.showPicker) return null;

	return (
		<Section column>
			<Header>
				<div>The picker is hidden</div>
				<Button
					slug="showPicker"
					onClick={() => onShowPicker(true)}
					icon="eye"
				/>
			</Header>
		</Section>
	);
};

export default HiddenPicker;

const Header = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: Colors.gray9,
	"> *": {
		margin: "1rem",
	},
});
