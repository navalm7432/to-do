import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyADzh_92VImIfENRoNo-aeXtZU6nctb8no",
  authDomain: "student-giri-e5d3d.firebaseapp.com",
  projectId: "student-giri-e5d3d",
  storageBucket: "student-giri-e5d3d.appspot.com",
  messagingSenderId: "129062022109",
  appId: "1:129062022109:web:e356e5331f1ddb38f72434",
  measurementId: "G-6G1T1XENJJ"
});

const db = firebaseApp.firestore();

export default db;
