// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcVWGgK7a89NQHWSJY_V3D9B1QFbUs_Kg",
  authDomain: "socialposting-11343.firebaseapp.com",
  projectId: "socialposting-11343",
  storageBucket: "socialposting-11343.firebasestorage.app",
  messagingSenderId: "146526622552",
  appId: "1:146526622552:web:282d187e90ba1784a60b2d",
  measurementId: "G-ZZ1C2N9GPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);