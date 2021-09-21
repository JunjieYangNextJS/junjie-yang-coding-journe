import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIXMhVenZv2slgHqlkGUKlbKPvgnkUO_Y",
  authDomain: "junjie-yang-coding-journey.firebaseapp.com",
  projectId: "junjie-yang-coding-journey",
  storageBucket: "junjie-yang-coding-journey.appspot.com",
  messagingSenderId: "85121202784",
  appId: "1:85121202784:web:576637590515e9592ee105",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const fieldPath = firebase.firestore.FieldPath.documentId();
const storage = firebase.storage();

export { db, auth, provider, timestamp, fieldPath, storage };
