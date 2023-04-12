import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Colors } from "@nx/style";
import {
	Background,
	Instructions,
	Title,
	Builders,
	Modes,
	UserSettings,
	NoFileSelected,
	AnyFile,
	PickmeFile,
	WheelFile,
	BoxesFile,
	Widgets,
	defaultUserSettings,
} from "@nx/shared-assets";
import { onGetFile, onGetUserSettings } from "@nx/firebase";
import { useParams } from "react-router-dom";
import { Pickme } from "../builders/Pickme";
import { Wheel } from "../builders/Wheel";
import { Boxes } from "../builders/Boxes";
import { Score } from "../widgets/Score";

export const Player: React.FC = () => {
	const [file, setFile] = useState<AnyFile | null>();
	const { userId } = useParams();
	const [userSettings, setUserSettings] =
		useState<UserSettings>(defaultUserSettings);

	useEffect(() => {
		if (userId)
			onGetUserSettings(userId, (data) => setUserSettings({ ...data }));
	}, [userId]);

	useEffect(() => {
		if (userSettings.selectedFileId) {
			onGetFile(userSettings.selectedFileId, setFile);
		} else {
			setFile(null);
		}
	}, [userSettings.selectedFileId]);

	return (
		<Container>
			{file && userSettings?.selectedFileId ? (
				<>
					<Background value={file.background} />
					{file.builder === Builders.PICKME && (
						<Pickme file={file as PickmeFile} />
					)}
					{file.builder === Builders.WHEEL && (
						<Wheel file={file as WheelFile} />
					)}
					{file.builder === Builders.BOXES && (
						<Boxes file={file as BoxesFile} />
					)}
					<Score active={userSettings.score.show} score={userSettings.score} />
					<Instructions
						active={!!userSettings?.instructions}
						value={file.instructionsContent}
						showBackground
					/>
					<Title
						active={!!userSettings?.titleGraphic}
						value={file.name}
						builder={Builders.PICKME}
					/>
				</>
			) : (
				<NoFileSelected />
			)}
		</Container>
	);
};

const Container = styled("div")({
	position: "absolute",
	width: "100%",
	height: "100vh",
	backgroundColor: Colors.black,
});
