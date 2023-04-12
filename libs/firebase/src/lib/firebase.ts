export const hello = "hello world";

// import { Builders } from "@nx/shared-assets";
import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	collection,
	getFirestore,
	onSnapshot,
	doc,
	updateDoc,
	addDoc,
	arrayUnion,
	arrayRemove,
	deleteDoc,
	deleteField,
} from "firebase/firestore";
import { AnyFile, Builders, SimpleFile, UserSettings } from "@nx/shared-assets";

const firebaseConfig = {
	apiKey: process.env.NX_FIREBASE_API_KEY,
	authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NX_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NX_FIREBASE_APP_ID,
	measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const auth = getAuth(app);

interface FileTest {
	name: string;
	builder: string;
}

interface UserFile {
	name: string;
	builder: string;
}

interface UserFileMap {
	[key: string]: UserFile;
}

// Authentication
export const createUser = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
	return signOut(auth);
};

// Files
export const onGetFiles = async (
	userId: string,
	updateState: (data: SimpleFile[] | undefined) => void
) => {
	const userRef = doc(db, "users", userId);
	onSnapshot(userRef, (snapshot) => {
		const data = snapshot.data();
		updateState(
			Object.entries(data?.files as UserFileMap).map(([id, item]) => ({
				id,
				name: item.name,
				builder: item.builder as Builders,
			})) || undefined
		);
	});
};

// - create a new file
export const onCreateFile = async (
	userId: string,
	file: Omit<AnyFile, "id">
) => {
	const fileRef = await addDoc(collection(db, "files"), file);
	const userRef = doc(db, "users", userId);
	await updateDoc(userRef, {
		[`files.${fileRef.id}`]: {
			name: file.name,
			builder: file.builder,
		},
	});
};

// Delete a file
export const onDeleteFile = async (userId: string, fileId: string) => {
	const userRef = doc(db, "users", userId);
	const fileRef = doc(db, "files", fileId);
	await deleteDoc(fileRef);
	await updateDoc(userRef, { [`files.${fileId}`]: deleteField() });
};

// Rename a file
export const onRenameFile = async (
	userId: string,
	fileId: string,
	name: string
) => {
	const userRef = doc(db, "users", userId);
	const fileRef = doc(db, "files", fileId);
	await updateDoc(userRef, {
		[`files.${fileId}`]: {
			name: name,
		},
	});
	await updateDoc(fileRef, { name });
};

// File
// - set the user current file
export const onSetFile = async (userId: string, fileId: string) => {
	const userRef = doc(db, "users", userId);
	await updateDoc(userRef, { selectedFileId: fileId });
};

// - get a file
export const onGetFile = async (
	fileId: string,
	updateState: (data: any | undefined) => void
) => {
	const fileRef = doc(db, "files", fileId);
	await onSnapshot(fileRef, (snapshot) => {
		const data = snapshot.data();
		updateState({
			id: snapshot.id,
			...data,
		});
	});
};

// Settings
export const onUpdateFileSettings = async (fileId: string, update: object) => {
	const settingsRef = doc(db, "files", fileId);
	await updateDoc(settingsRef, update);
};

// updateFile
export const onUpdateFile = async (fileId: string, update: object) => {
	console.log(fileId, update);
	const fileRef = doc(db, "files", fileId);
	await updateDoc(fileRef, update);
};

// get User data
export const onGetUser = (
	userId: string,
	updateState: (data: string | null | undefined) => void
) => {
	const userRef = doc(db, "users", userId);
	onSnapshot(userRef, (snapshot) => {
		const data = snapshot.data();
		updateState(data?.selectedFileId);
	});
};
// get User data
export const onGetUserSettings = async (
	userId: string,
	updateState: (data: UserSettings) => void
) => {
	const userRef = doc(db, "users", userId);
	await onSnapshot(userRef, (snapshot) => {
		const data = snapshot.data();
		updateState({
			titleGraphic: data?.titleGraphic,
			sounds: data?.sounds,
			instructions: data?.instructions,
			selectedMode: data?.selectedMode,
			selectedFileId: data?.selectedFileId,
			selectedWidget: data?.selectedWidget,
			score: data?.score,
			timer: data?.timer,
			logo: data?.logo,
		});
	});
};

export const onUpdateUserSettings = async (userId: string, update: object) => {
	console.log(userId, update);
	const userRef = doc(db, "users", userId);
	await updateDoc(userRef, update);
};

export enum ArrayAction {
	ADD = "union",
	REMOVE = "remove",
}

export const onUpdateArray = async (
	fileId: string,
	arrayName: string,
	value: string,
	action: ArrayAction
) => {
	const fileRef = doc(db, "files", fileId);
	if (action === ArrayAction.ADD) {
		await updateDoc(fileRef, {
			[arrayName]: arrayUnion(value),
		});
	}
	if (action === ArrayAction.REMOVE) {
		await updateDoc(fileRef, {
			[arrayName]: arrayRemove(value),
		});
	}
	return;
};
