import { onUpdateFile } from "@nx/firebase";
import {
	BoxesFile,
	NextWinnerType,
	PickmeFile,
	WheelFile,
} from "@nx/shared-assets";
import { Button, ButtonGroup, ButtonStyle, Section } from "@nx/ui";

interface Props {
	file: BoxesFile | PickmeFile | WheelFile;
}

const NextWinnerTypeToggle: React.FC<Props> = (props) => {
	const { file } = props;
	const selectedFileId = file.id;

	const onNextWinnerType = (value: NextWinnerType) => {
		onUpdateFile(selectedFileId, { nextWinnerType: value });
	};

	return (
		<Section>
			<ButtonGroup slug="nextWinner" flex>
				<Button
					slug="random"
					skin={
						file.nextWinnerType === NextWinnerType.RANDOM
							? ButtonStyle.SECONDARY
							: ButtonStyle.BORDER
					}
					onClick={() => onNextWinnerType(NextWinnerType.RANDOM)}
					name="Random"
				/>
				<Button
					slug="preselected"
					skin={
						file.nextWinnerType === NextWinnerType.PRESELECTED
							? ButtonStyle.SECONDARY
							: ButtonStyle.BORDER
					}
					onClick={() => onNextWinnerType(NextWinnerType.PRESELECTED)}
					disabled={!file.showPicker}
					name="Preselected"
				/>
			</ButtonGroup>
		</Section>
	);
};

export default NextWinnerTypeToggle;
