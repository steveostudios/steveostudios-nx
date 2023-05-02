import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import {
	BoxesFile,
	NextWinnerType,
	PickmeFile,
	WheelFile,
} from "@nx/shared-assets";
import { Section } from "@nx/ui";

interface Props {
	file: BoxesFile | PickmeFile | WheelFile;
}

const NextWinner: React.FC<Props> = (props) => {
	const { file } = props;
	// const selectedFileId = file.id;

	return (
		<Section>
			<NextWinnerHeader>
				Next Winner:{" "}
				<span className={file.showPicker ? "" : "hidden"}>
					{!file.showPicker
						? "hidden"
						: file.nextWinnerType === NextWinnerType.RANDOM && file.nextRandomId
						? file.items[file.nextRandomId].name
						: NextWinnerType.PRESELECTED && file.nextPreselectedId
						? file.items[file.nextPreselectedId].name
						: "none"}
				</span>
			</NextWinnerHeader>
		</Section>
	);
};

export default NextWinner;

const NextWinnerHeader = styled("div")({
	display: "flex",
	height: "6rem",
	alignItems: "center",
	color: Colors.gray4,
	span: {
		color: Colors.white,
	},
	"span.hidden": {
		color: Colors.gray4,
	},
});
