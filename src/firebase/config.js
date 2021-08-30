import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_1wVxIPRjjnkKlJxXAMNxkdOPCFkfQp0",
    authDomain: "chat-eb446.firebaseapp.com",
    projectId: "chat-eb446",
    storageBucket: "chat-eb446.appspot.com",
    messagingSenderId: "595805092503",
    appId: "1:595805092503:web:9f7c087ea603610de607d2",
    measurementId: "G-BMQ96N0DCT"
  };
//init firebase
  firebase.initializeApp(firebaseConfig)
//init firestore service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.FieldValue.serverTimestamp
export { projectFirestore, timestamp, projectAuth }

//test 4