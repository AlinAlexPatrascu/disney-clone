import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDpqGCEn51VjUnvpUvPcMKDbrDvzqVMC1g",
  authDomain: "disney-clone-238f0.firebaseapp.com",
  projectId: "disney-clone-238f0",
  storageBucket: "disney-clone-238f0.appspot.com",
  messagingSenderId: "588854829172",
  appId: "1:588854829172:web:61746f542d7e788f08f121",
  measurementId: "G-FRQ8MPNX81"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage};
export default db;
