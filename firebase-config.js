// Firebase imports
import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your config
const firebaseConfig={

apiKey:"AIzaSyAm76a0q-23l0wltIjAfO_Yp-Ka2ZZK8Vc ",

authDomain:"marks-investment-limited.firebaseapp.com",

projectId:"marks-investment-limited",

storageBucket:"marks-investment-limited.firebasestorage.app",

messagingSenderId:"586558895358",

appId:"1:586558895358:web:c539344b38e49ae9df61af"

};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);

export {auth,db};