// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAm76a0q-23l0wltIjAfO_Yp-Ka2ZZK8Vc",
  authDomain: "marks-investment-limited.firebaseapp.com",
  projectId: "marks-investment-limited",
  storageBucket: "marks-investment-limited.firebasestorage.app",
  messagingSenderId: "586558895358",
  appId: "1:586558895358:web:c539344b38e49ae9df61af",
  measurementId: "G-DR5S0CLLD2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);