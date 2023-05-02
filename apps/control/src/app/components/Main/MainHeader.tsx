import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { TabGroup, Toggle } from "@nx/ui";
import { onUpdateUserSettings } from "@nx/firebase";
import { Modes } from "@nx/shared-assets";

interface Props {
	selectedFileId: string | null;
	titleGraphic?: boolean;
	sounds?: boolean;
	instructions?: boolean;
	userId: string;
	selectedMode: Modes;
}

const MainHeader: React.FC<Props> = (props) => {
	const onChangeModes = (value: Modes) => {
		if (value === props.selectedMode) return false;
		onUpdateUserSettings(props.userId, { selectedMode: value });
	};
	const onChangeSounds = (value: boolean) => {
		onUpdateUserSettings(props.userId, { sounds: value });
	};
	const onChangeTitleGraphic = (value: boolean) => {
		onUpdateUserSettings(props.userId, { titleGraphic: value });
	};
	const onChangeInstructions = (value: boolean) => {
		onUpdateUserSettings(props.userId, { instructions: value });
	};

	return (
		<Container>
			<TabGroup
				showLabels
				tabs={[
					{
						slug: "edit",
						label: "Edit",
						icon: "pencil",
						onClick: () => onChangeModes(Modes.EDIT),
						selected: props.selectedMode === Modes.EDIT,
					},
					{
						slug: "play",
						label: "Play",
						icon: "play",
						onClick: () => onChangeModes(Modes.PLAY),
						selected: props.selectedMode === Modes.PLAY,
					},
				]}
			/>

			<Toggles>
				<Toggle
					slug="sound"
					label="Sound"
					value={!!props.sounds}
					onChange={(value) => onChangeSounds(value)}
					column
				/>
				<Toggle
					slug="title"
					label="Title Graphic"
					value={!!props.titleGraphic}
					onChange={(value) => onChangeTitleGraphic(value)}
					column
				/>
				<Toggle
					slug="instructions"
					label="Instructions"
					value={!!props.instructions}
					onChange={(value) => onChangeInstructions(value)}
					column
				/>
			</Toggles>
		</Container>
	);
};

export default MainHeader;

const Container = styled("div")({
	height: "8rem",
	minHeight: "8rem",
	border: "none",
	borderBottomWidth: "1px",
	borderBottomStyle: "solid",
	borderBottomColor: Colors.gray9,
	boxSizing: "border-box",
	display: "flex",
	alignItems: "center",
	padding: "0 2rem",
	justifyContent: "space-between",
});

const Toggles = styled("div")({
	display: "flex",
	alignItems: "center",
	gap: "1rem",
	justifyContent: "flex-start",
	label: {
		fontSize: "10px",
		textTransform: "uppercase",
	},
});
