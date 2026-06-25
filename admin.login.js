import { auth }
from "./config.js";

import {
signInWithEmailAndPassword,
signOut
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const allowedAdmins=[

"marksinvestmentltd@gmail.com"

];

const status=
document.getElementById("status");

document
.getElementById("loginBtn")
.onclick=async()=>{

const email=
document
.getElementById("email")
.value
.trim();

const password=
document
.getElementById("password")
.value;

if(!email||!password){

status.innerText=
"Enter email and password";

return;

}

status.innerText=
"Signing in...";

try{

const userCredential=

await signInWithEmailAndPassword(
auth,
email,
password
);

const user=
userCredential.user;

if(
!allowedAdmins.includes(
user.email
)
){

await signOut(auth);

status.innerText=
"Access denied";

return;

}

window.location=
"admin.html";

}

catch(error){

console.log(error);

status.innerText=
error.message;

}

};
