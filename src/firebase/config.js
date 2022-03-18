import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDLQqzitlJYi7LHe6vmIlplZQMRYma2Cvo",
    authDomain: "chat-app-b2243.firebaseapp.com",
    projectId: "chat-app-b2243",
    storageBucket: "chat-app-b2243.appspot.com",
    messagingSenderId: "435908649877",
    appId: "1:435908649877:web:193ca4367d434b25434c9c",
    measurementId: "G-P29QB1983V"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  auth.useEmulator("http://localhost:9099");
  if(window.location.hostname === "localhost"){
    db.useEmulator('localhost', '8080');
  }

  export { auth, db };
  export default firebase;