import { onUpdateFile } from "@nx/firebase";
import {
	BoxesFile,
	NextWinnerType,
	PickmeFile,
	WheelFile,
} from "@nx/shared-assets";
import { Section, Toggle } from "@nx/ui";

interface Props {
	file: BoxesFile | PickmeFile | WheelFile;
}

const ShowPicker: React.FC<Props> = (props) => {
	const { file } = props;
	const selectedFileId = file.id;

	const onShowPicker = (value: boolean) => {
		onUpdateFile(selectedFileId, {
			showPicker: value,
			nextWinnerType: NextWinnerType.RANDOM,
		});
	};

	return (
		<Section>
			<Toggle
				label="Show Picker"
				slug="showpicker"
				onChange={onShowPicker}
				value={file.showPicker}
			/>
		</Section>
	);
};

export default ShowPicker;
