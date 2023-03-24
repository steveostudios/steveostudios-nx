import styled from "@emotion/styled";
import { Colors } from "@nx/style";
import { Button, ButtonStyle, Toggle } from "@nx/ui";
import { onUpdateFileSettings, onUpdateUserSettings } from "@nx/firebase";
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

	const selectedStyle = {
		borderBottom: `0.5rem solid ${Colors.blue}`,
	};
	const deselectedStyle = {
		opacity: 0.5,
		borderBottom: `0.5rem solid transparent`,
	};

	return (
		<Container>
			<ModesContainer>
				<Button
					slug="edit"
					name="Edit"
					skin={ButtonStyle.CLEAR}
					icon="pencil"
					onClick={() => onChangeModes(Modes.EDIT)}
					style={
						props.selectedMode === Modes.EDIT ? selectedStyle : deselectedStyle
					}
				/>
				<Button
					slug="play"
					name="Play"
					skin={ButtonStyle.CLEAR}
					icon="play"
					onClick={() => onChangeModes(Modes.PLAY)}
					style={
						props.selectedMode === Modes.PLAY ? selectedStyle : deselectedStyle
					}
				/>
			</ModesContainer>
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

const ModesContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
	gap: "2rem",
	height: "100%",
	"> * ": {
		height: "inherit",
		button: {
			height: "inherit",
		},
	},
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
