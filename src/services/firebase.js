import * as firebase from 'firebase';
import "firebase/firestore"

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase - 
// PUT Your FirebaseAPP Config Here
const firebaseConfig = {
   apiKey: "AIzaSyAMMtZHIIA0FBlDaDk-IWRlJujbyNDTGLQ",
   authDomain: "agendapg-b30a1.firebaseapp.com",
   databaseURL: "https://agendapg-b30a1.firebaseio.com",
   projectId: "agendapg-b30a1",
   storageBucket: "agendapg-b30a1.appspot.com",
   messagingSenderId: "330260495628",
   appId: "1:330260495628:web:e07af154d814c4ff619d29"
 };

firebase.initializeApp(firebaseConfig);

// export const db = firebase.firestore();
export default firebase;