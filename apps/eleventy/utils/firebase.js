require("dotenv").config();

const { AssetCache } = require("@11ty/eleventy-fetch");
const { initializeApp } = require("firebase/app");
const { getDocs, collection, getFirestore } = require("firebase/firestore");
const { ref, getDownloadURL, getStorage } = require("firebase/storage");

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

const getAllDocs = async (col) => {
	const querySnapshot = await getDocs(collection(db, col));
	const snap = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	const items = Object.entries(snap).map(([id, item]) => ({
		id,
		...item,
	}));
	return await items;
};

module.exports = {
	getImage: async (bucket, filename) => {
		const imageRef = ref(storage, `${bucket}/${filename}`);
		try {
			const downloadUrl = await getDownloadURL(imageRef);
			return downloadUrl;
		} catch (error) {
			return "";
		}
	},
	getFirebaseRecords: async function (col) {
		let asset = new AssetCache(`${col}`, ".cache");
		if (asset.isCacheValid("1d")) {
			console.log(`pulling ${col} from valid cache`);
			return asset.getCachedValue();
		}

		console.log("building cache...");
		const data = await getAllDocs(col);
		// console.log(data);
		// return data;

		await asset.save(data, "json");
		console.log("cache finished");

		return asset.getCachedValue();
	},
};
