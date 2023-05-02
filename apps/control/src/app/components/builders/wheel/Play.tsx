import { onUpdateFile } from "@nx/firebase";
import { GameState, NextWinnerType, WheelFile } from "@nx/shared-assets";
import { Button, ButtonStyle, ButtonSize, Section } from "@nx/ui";
import HideLastItem from "../../picker/HideLastItem";
import ShowPicker from "../../picker/ShowPicker";
import NextWinner from "../../picker/NextWinner";
import NextWinnerTypeToggle from "../../picker/NextWinnerTypeToggle";
import HiddenPicker from "../../picker/HiddenPicker";
import Random from "../../picker/Random";
import Preselected from "../../picker/Preselected";

interface Props {
	file: WheelFile;
}

const WheelPlay: React.FC<Props> = (props) => {
	const { file } = props;
	const selectedFileId = file.id;

	const onSpin = () => {
		if (file.gameState === GameState.ADDMORE) {
			// do nothing
		}
		if (file.gameState === GameState.READY) {
			const items = Object.entries(file?.items)
				.filter(([_, item]) => item.visible)
				.filter(([_, item]) => item.weight > 0)
				.map(([id, item]) => {
					return [...Array(item.weight)].map(() => id);
				})
				.flat(1);

			let lastItem: string | null = null;
			// const randomItem = items[Math.floor(Math.random() * items.length)]
			const spinCycle = Array(10)
				.fill(0)
				.map(() => {
					const possibleItems = items.filter((item) => item !== lastItem);
					lastItem =
						possibleItems[Math.floor(Math.random() * possibleItems.length)];
					return lastItem;
				});
			onUpdateFile(selectedFileId, {
				gameState: GameState.SPINNING,
				spinCycle: spinCycle,
			});
			// update database
		}
		if (file.gameState === GameState.SPINNING) {
			onUpdateFile(selectedFileId, {
				gameState: GameState.WINNER,
				spinCycle: [],
			});
		}
		if (file.gameState === GameState.WINNER) {
			onUpdateFile(selectedFileId, {
				gameState: GameState.READY,
			});
		}
		return;
	};

	return (
		<Section fullHeight padding paddingBottom>
			<Section fullHeight column>
				<ShowPicker file={file} />
				<NextWinner file={file} />
				<NextWinnerTypeToggle file={file} />
				<HiddenPicker file={file} />
				<Random file={file} />
				<Preselected file={file} />
			</Section>
			<Section fullHeight column>
				<Button
					slug="spin"
					size={ButtonSize.LARGE}
					flex
					onClick={() => console.log(onSpin())}
					skin={ButtonStyle.PRIMARY}
					name={
						file.gameState === GameState.ADDMORE
							? "Add more items"
							: file.gameState === GameState.READY
							? "Spin"
							: file.gameState === GameState.SPINNING
							? "Spinning..."
							: file.gameState === GameState.WINNER
							? "Clear"
							: ""
					}
					disabled={
						(file.nextWinnerType === NextWinnerType.RANDOM &&
							!file.nextRandomId) ||
						(file.nextWinnerType === NextWinnerType.PRESELECTED &&
							!file.nextPreselectedId) ||
						file.gameState === GameState.ADDMORE
					}
				/>
				<HideLastItem file={file} />
			</Section>
		</Section>
	);
};

export default WheelPlay;
