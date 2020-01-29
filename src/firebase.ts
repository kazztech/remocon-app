import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBlBdYCWtAquE_3t0I8yPq9nA-bCaa0zs",
  authDomain: "remocon-app-54384.firebaseapp.com",
  databaseURL: "https://remocon-app-54384.firebaseio.com",
  projectId: "remocon-app-54384",
  storageBucket: "remocon-app-54384.appspot.com",
  messagingSenderId: "637577971040",
  appId: "1:637577971040:web:3b37be12d8a284b5d2ca05"
};
// 接続
firebase.initializeApp(firebaseConfig);

export default firebase.firestore().collection("users");