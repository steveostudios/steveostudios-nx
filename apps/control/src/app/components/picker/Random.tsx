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

const Random: React.FC<Props> = (props) => {
	const { file } = props;
	const selectedFileId = file.id;

	const getRandomWinner = () => {
		const items = Object.entries(file?.items)
			.filter(([id]) => id !== file.nextRandomId)
			.filter(([_, item]) => item.visible)
			.filter(([_, item]) => item.weight > 0)
			.map(([id, item]) => {
				return [...Array(item.weight)].map(() => id);
			})
			.flat(1);

		const randomItem = items[Math.floor(Math.random() * items.length)];
		onUpdateFile(selectedFileId, { nextRandomId: randomItem });
	};

	if (!file.showPicker || file.nextWinnerType !== NextWinnerType.RANDOM)
		return null;

	return (
		<Section column>
			<Header>
				<div>Random</div>
				<Button slug="newrandom" onClick={getRandomWinner} icon="random" />
			</Header>
		</Section>
	);
};

export default Random;

const Header = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: Colors.gray9,
	"> *": {
		margin: "1rem",
	},
});
