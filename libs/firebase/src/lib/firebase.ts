export const hello = "hello world";

// import { Builders } from "@nx/shared-assets";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, onSnapshot, doc, where, query, updateDoc, addDoc } from "firebase/firestore";
import {File, SimpleFile, UserSettings} from "@nx/shared-assets"

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

// export const auth = getAuth(app)

// Files
export const onGetFiles = async (userId: string | undefined, updateState: (data: SimpleFile[] | undefined) => void) => {
  if (userId) {
    const filesRef = collection(db, "files");
    const q = query(filesRef, where('userId', "==", userId ))
    await onSnapshot(q, snapshot => {
      updateState(snapshot.docs.map(doc => {return {id: doc.id, name: doc.data().name}}))
    })
  }
}

// File
// - set the user current file
export const onSetFile = async (userId: string, fileId: string) => {
	const userRef = doc(db, "users", userId);
	await updateDoc(userRef, {selectedFileId: fileId});
}

// - get a file
export const onGetFile = async (fileId: string, updateState: (data: any | undefined) => void) => {
  const fileRef = doc(db, "files", fileId);
  await onSnapshot(fileRef, snapshot => {
    const data = snapshot.data();
    updateState({
      id: snapshot.id, 
      builder: data?.builder, 
      name: data?.name,
      settings: data?.settings,
			items: data?.items
    })
  })
}

// - create a new file 
export const onCreateFile = async (file: Omit<File, "id">) => {
	await addDoc(collection(db, "files"), file);
}

// Settings
export const onUpdateFileSettings = async (fileId: string, update: object) => {
  const settingsRef = doc(db, "files", fileId);
  await updateDoc(settingsRef, update);
}

// updateFile
export const onUpdateFile = async (fileId: string, update: object) => {
  console.log(fileId, update)
  const fileRef = doc(db, "files", fileId);
  await updateDoc(fileRef, update);
}

// get User data
export const onGetUser = (userId: string, updateState: (data: string | null | undefined) => void) => {
  const userRef = doc(db, "users", userId);
  onSnapshot(userRef, snapshot => {
    const data = snapshot.data();
    updateState(data?.selectedFileId)
  })
}
// get User data
export const onGetUserSettings = async (userId: string, updateState: (data: UserSettings) => void) => {
  const userRef = doc(db, "users", userId);
  await onSnapshot(userRef, snapshot => {
    const data = snapshot.data();
     updateState({
      titleGraphic: data?.titleGraphic,
      sounds: data?.sounds,
      instructions: data?.instructions,
      selectedMode: data?.selectedMode,
      selectedFileId: data?.selectedFileId
    })
  })
}

export const onUpdateUserSettings = async (userId: string, update: object) => {
  console.log(userId, update)
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, update);
}