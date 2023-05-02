import styled from "@emotion/styled";
import { onGetFile, onGetUserSettings, onSetFile } from "@nx/firebase";
import {
	Builders,
	File,
	Modes,
	UserSettings,
	AnyFile,
	WheelFile,
	PickmeFile,
	BoxesFile,
	Widgets,
	defaultUserSettings,
} from "@nx/shared-assets";
import { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import PickmeEdit from "../components/builders/pickme/Edit";
import PickmePlay from "../components/builders/pickme/Play";
import { Colors } from "@nx/style";
import { useFirebaseAuth } from "../context/AuthContext";
import WheelEdit from "../components/builders/wheel/Edit";
import WheelPlay from "../components/builders/wheel/Play";
import BoxesEdit from "../components/builders/boxes/Edit";
import BoxesPlay from "../components/builders/boxes/Play";

const Manage = () => {
	const [file, setFile] = useState<AnyFile | null>(); // MtEyqt2j6NLs5nO8vIOA
	// const userId = "iBfXqM9uuEWBMv8bEARIaQgwJFI3";
	const { user } = useFirebaseAuth();
	const [userSettings, setUserSettings] =
		useState<UserSettings>(defaultUserSettings);

	useEffect(() => {
		if (user && user.uid)
			onGetUserSettings(user.uid, (data) => setUserSettings({ ...data }));
	}, [user]);

	useEffect(() => {
		if (userSettings.selectedFileId) {
			onGetFile(userSettings.selectedFileId, setFile);
		} else {
			setFile(null);
		}
	}, [userSettings.selectedFileId]);

	const onSelectFile = (fileId: string) => {
		if (user && user.uid) onSetFile(user.uid, fileId);
	};

	if (!user?.uid) return <div>no user</div>;

	const getMain = () => {
		if (userSettings.selectedFileId) {
			if (file?.builder === Builders.PICKME) {
				if (userSettings.selectedMode === Modes.EDIT) {
					return <PickmeEdit file={file as PickmeFile} />;
				} else {
					return <PickmePlay file={file as PickmeFile} />;
				}
			}
			if (file?.builder === Builders.WHEEL) {
				if (userSettings.selectedMode === Modes.EDIT) {
					return <WheelEdit file={file as WheelFile} />;
				} else {
					return <WheelPlay file={file as WheelFile} />;
				}
			}
			if (file?.builder === Builders.BOXES) {
				if (userSettings.selectedMode === Modes.EDIT) {
					return <BoxesEdit file={file as BoxesFile} />;
				} else {
					return <BoxesPlay file={file as BoxesFile} />;
				}
			}
		}
		return null;
	};

	return (
		<Container>
			<Sidebar
				userId={user.uid}
				selectedFileId={userSettings?.selectedFileId}
				setSelectedFileId={onSelectFile}
			/>
			{file && userSettings.selectedFileId ? (
				<Main
					userId={user.uid}
					selectedFileId={userSettings?.selectedFileId}
					titleGraphic={userSettings?.titleGraphic}
					sounds={userSettings?.sounds}
					instructions={userSettings?.instructions}
					selectedMode={userSettings?.selectedMode || Modes.EDIT}
					score={userSettings?.score}
					timer={userSettings?.timer}
					logo={userSettings?.logo}
					selectedWidget={userSettings?.selectedWidget}
				>
					{getMain()}
				</Main>
			) : (
				<NoFileSelected>Select or create a file from the left.</NoFileSelected>
			)}
		</Container>
	);
};

export default Manage;

const Container = styled("div")({
	display: "grid",
	gridTemplateColumns: "32rem auto",
	height: "100vh",
	overflow: "hidden",
});

const NoFileSelected = styled("div")({
	alignItems: "center",
	justifyContent: "center",
	display: "flex",
	color: Colors.gray4,
});
