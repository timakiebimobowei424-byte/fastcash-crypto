import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
doc,
setDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document
.getElementById("registerBtn")
.addEventListener("click", async()=>{

const fullname =
document.getElementById("fullname").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user = userCredential.user;

await setDoc(doc(db,"users",user.uid),{

fullname:fullname,
email:email,
balance:0,
profit:0,
invested:0

});

alert("Account created successfully");

}catch(error){

alert(error.message);

}

});