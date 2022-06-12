import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDD3UIssUF9v18FYTDBKSQVHTZZEEx9m9g",
    authDomain: "the-chat-51b78.firebaseapp.com",
    projectId: "the-chat-51b78",
    storageBucket: "the-chat-51b78.appspot.com",
    messagingSenderId: "178893617384",
    appId: "1:178893617384:web:42edd27d0f571cdfedf15d"
};

const app = firebase.initializeApp(firebaseConfig)

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider(auth);

export { db, auth, provider };