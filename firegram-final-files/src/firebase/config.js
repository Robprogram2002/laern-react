import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLFmgeuxDgby6xU93DJWTbNhJ8Z4CzziU",
  authDomain: "tweetter-clone.firebaseapp.com",
  databaseURL: "https://tweetter-clone.firebaseio.com",
  projectId: "tweetter-clone",
  storageBucket: "tweetter-clone.appspot.com",
  messagingSenderId: "79552981368",
  appId: "1:79552981368:web:71b49b01ece64460f3008d",
  measurementId: "G-C4DXS054HR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };