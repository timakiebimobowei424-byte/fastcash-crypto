import { auth } from "./firebase-config.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

try {

await signInWithEmailAndPassword(auth, email, password);

alert("Login successful");

// redirect to dashboard
window.location.href = "dashboard.html";

} catch (error) {
alert(error.message);
}

});