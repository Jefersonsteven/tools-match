// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCusjiWe8R10L0zSUdUSl3gcenyy_6-MEY",
  authDomain: "toolmatch.firebaseapp.com",
  projectId: "toolmatch",
  storageBucket: "toolmatch.appspot.com",
  messagingSenderId: "319003856210",
  appId: "1:319003856210:web:70b6697702e612084ebe8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
