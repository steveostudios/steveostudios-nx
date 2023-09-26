import { initializeApp } from "firebase/app";
import {
	signInWithEmailAndPassword,
	getAuth,
	signOut,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { uuidv4 } from "@firebase/util";
import {
	collection,
	doc,
	getDocs,
	getDoc,
	getFirestore,
	onSnapshot,
	updateDoc,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { AnyDoc, Book } from "./types";
// import { fileTypeFromFile } from "file-type";

const firebaseConfig = {
	apiKey: process.env.NX_FIREBASE_API_KEY,
	authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NX_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NX_FIREBASE_APP_ID,
	measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

// authorization
export const auth = getAuth(app);

export const createUser = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
	return signOut(auth);
};

// TODO: this will go away
export const getCover = async (filename: string) => {
	const coverRef = ref(storage, `books/${filename}`);
	const downloadUrl = await getDownloadURL(coverRef);
	return downloadUrl;
};

export const uploadCover = async (url: string) => {
	const uuid = uuidv4();
	fetch(url)
		.then((res) => res.blob())
		.then((blob) => {
			const coverRef = ref(storage, `books/${uuid}.jpg`);
			uploadBytes(coverRef, blob).then((snapshot) => {
				// console.log(snapshot);
			});
		});
	return uuid;
};

// Update books collection
// TODO: this will go away
export const onUpdateBooksDoc = async (books: Book[]) => {
	const booksRef = doc(db, "site", "books");
	const result = convertArrayToObject(books, "id");
	await updateDoc(booksRef, result);
};

// convert array ([id: XXX, ...data]) to object ({XXX: {...data}})
const convertArrayToObject = (array: any[], key: string) => {
	const initialValue = {};
	return array.reduce((obj, item: any) => {
		const id = item[key];
		delete item[key];
		return {
			...obj,
			[id]: item,
		};
	}, initialValue);
};

export const getImage = async (bucket: string, filename: string) => {
	const imageRef = ref(storage, `${bucket}/${filename}`);
	try {
		const downloadUrl = await getDownloadURL(imageRef);
		return downloadUrl;
	} catch (error) {
		return "";
	}
};

// ALL IN ONE DOCUMENT
// real-time updates for docs
export const snapshotData = async (
	collection: string,
	updateState: (data: any | undefined) => void
) => {
	const dataRef = doc(db, "site", collection);
	await onSnapshot(dataRef, (snapshot) => {
		const data = snapshot.data();
		const items = Object.entries(data as AnyDoc).map(([id, item]) => ({
			id,
			...item,
		}));
		updateState(items);
	});
};

// update a document
export const updateData = async (collection: string, data: AnyDoc[]) => {
	const dataRef = doc(db, "site", collection);
	const result = convertArrayToObject(data, "id");
	console.log(result);
	await updateDoc(dataRef, result)
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
};

// images
export const uploadImageFromUrl = async (
	col: string,
	url: string,
	extension: string
) => {
	const uuid = uuidv4();
	fetch(url)
		.then((res) => res.blob())
		.then((blob) => {
			const imageRef = ref(storage, `${col}/${uuid}.${extension}`);
			uploadBytes(imageRef, blob).then((snapshot) => {
				// console.log(snapshot);
			});
		});
	return uuid;
};

export const uploadImageFromLocal = async (col: string, file: File) => {
	const uuid = uuidv4();
	const imageRef = ref(storage, `${col}/${uuid}.jpg`);
	uploadBytes(imageRef, file).then((snapshot) => {
		// console.log(snapshot);
	});
	return uuid;
};

// using docs and collections
export const getAllDocs = async (
	col: string,
	updateState: (data: AnyDoc[]) => void
) => {
	const querySnapshot = await getDocs(collection(db, col));
	const snap = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const items = Object.entries(snap as any[]).map(([id, item]) => ({
		id,
		...item,
	}));
	console.log(items);
	updateState(items);
};

export const getSingleDoc = async (
	col: string,
	id: string,
	updateState: (data: Partial<AnyDoc> | undefined) => void
) => {
	const docRef = doc(db, col, id);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) updateState(undefined);
	const result: Partial<AnyDoc> = { ...docSnap.data(), id };
	updateState(result);
};

export const updateSingleDoc = async (
	col: string,
	id: string,
	data: Partial<AnyDoc>
) => {
	if (id === "new") {
		const newId = uuidv4();
		const docRef = doc(db, col, newId);
		delete data.id;
		console.log(data);
		await setDoc(docRef, data).catch((error) => {
			console.log(error);
		});
		return;
	} else {
		const docRef = doc(db, col, id);
		await updateDoc(docRef, data);
	}
};

export const duplicateSingleDoc = async (col: string, id: string) => {
	const docRef = doc(db, col, id);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) return;
	const data = docSnap.data();
	const newId = uuidv4();
	data.name = `${data.name} (copy)`;
	const newDocRef = doc(db, col, newId);
	await setDoc(newDocRef, data);
};

export const deleteSingleDoc = async (col: string, id: string) => {
	const docRef = doc(db, col, id);
	await deleteDoc(docRef);
};
