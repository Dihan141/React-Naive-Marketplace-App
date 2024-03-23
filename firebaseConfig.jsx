// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJSNHupeaT5Ip-Uq1ozwbc7Fs1IuqbdzE",
  authDomain: "my-project-5b5c5.firebaseapp.com",
  projectId: "my-project-5b5c5",
  storageBucket: "my-project-5b5c5.appspot.com",
  messagingSenderId: "934554143317",
  appId: "1:934554143317:web:0530f55d36806fa1a762dc",
  measurementId: "G-6VNE2YPHF3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);