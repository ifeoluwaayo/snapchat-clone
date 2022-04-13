import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyANfsJty4bm92s_RFPh4WrwqTXUUFTAHLI",
	authDomain: "snapchat-clone-8fe88.firebaseapp.com",
	projectId: "snapchat-clone-8fe88",
	storageBucket: "snapchat-clone-8fe88.appspot.com",
	messagingSenderId: "287290825452",
	appId: "1:287290825452:web:28e4799098c750aaf023c9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
