import { Builders } from "@nx/shared-assets";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, onSnapshot, doc, where, query, updateDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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

export interface Item {
  id: string;
  name: string;
  visible: boolean;
  weight: number;
}

export interface File {
  id: string;
  builder: Builders;
  settings: Settings
  name: string;
}

export interface Settings {
  titleGraphic: boolean;
  sounds: boolean;
  background: number;
  theme: number;
  instructionsContent: string;
  instructions: boolean; 
}

export const getFiles = async () => {
  console.log(firebaseConfig)
  const querySnapshot = await getDocs(collection(db, "files"));
  const files = querySnapshot.docs.map(doc => {return {id: doc.id, name: doc.data().name}})
  console.log(files)
  return files
}

interface SimpleFile {
  id: string;
  name: string;
}

export const onGetFiles = async (userId: string | undefined, updateState: (data: SimpleFile[] | undefined) => void) => {
  if (userId) {
    const filesRef = collection(db, "files");
    const q = query(filesRef, where('userId', "==", userId ))
    await onSnapshot(q, snapshot => {
      updateState(snapshot.docs.map(doc => {return {id: doc.id, name: doc.data().name}}))
    })
  }
}


export const auth = getAuth(app)

export const onGetFile = (fileId: string, updateState: (data: any | undefined) => void) => {
  const fileRef = doc(db, "files", fileId);
  onSnapshot(fileRef, snapshot => {
    console.log(snapshot.data())
    const data = snapshot.data();
    updateState({
      id: snapshot.id, 
      builder: data?.builder, 
      name: data?.name,
      settings: data?.settings
    })
  })
}

export const onGetUser = (userId: string, updateState: (data: string | null | undefined) => void) => {
  const userRef = doc(db, "users", userId);
  onSnapshot(userRef, snapshot => {
    const data = snapshot.data();
    updateState(data?.selectedFileId)
  })
}

export const onSetFile = async (userId: string, fileId: string) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {selectedFileId: fileId});
}

export const onUpdateFileSettings = async (fileId: string, update: object) => {
  const settingsRef = doc(db, "files", fileId);
  console.log(update)
  await updateDoc(settingsRef, update);
}

// export const updateFileItems = () => {}

// export const updateFileSettings = () => {}

// export const updateFileName = () => {}

