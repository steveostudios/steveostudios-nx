import { onUpdateFile } from "@nx/firebase";
import { BoxesFile, PickmeFile, WheelFile } from "@nx/shared-assets";
import { Section, Toggle } from "@nx/ui";

interface Props {
	file: BoxesFile | PickmeFile | WheelFile;
}

const HideLastItem: React.FC<Props> = (props) => {
	const { file } = props;
	const selectedFileId = file.id;

	const onHideLastItem = (value: boolean) => {
		onUpdateFile(selectedFileId, { hideLastItem: value });
	};

	return (
		<Section>
			<Toggle
				label="Hide Last Item"
				slug="hideLastItem"
				onChange={onHideLastItem}
				value={file.hideLastItem}
			/>
		</Section>
	);
};

export default HideLastItem;
