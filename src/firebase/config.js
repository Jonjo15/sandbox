import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBOI9CbRfXhx8u-aOPb66yxcy5aTVqR1o0",
    authDomain: "sandbox-f99c4.firebaseapp.com",
    databaseURL: "https://sandbox-f99c4.firebaseio.com",
    projectId: "sandbox-f99c4",
    storageBucket: "sandbox-f99c4.appspot.com",
    messagingSenderId: "576837837419",
    appId: "1:576837837419:web:969f61ef801b853395072e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()
  export const timestamp = firebase.firestore.FieldValue.serverTimestamp;