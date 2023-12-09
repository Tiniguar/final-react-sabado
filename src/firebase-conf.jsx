// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjv66i-Sqze4D_-oZr8DXQHNA1V1QsWJw",
  authDomain: "clientes-intecap.firebaseapp.com",
  projectId: "clientes-intecap",
  storageBucket: "clientes-intecap.appspot.com",
  messagingSenderId: "185891049498",
  appId: "1:185891049498:web:d22824b1f0d7f38cecc1a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;