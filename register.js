import {auth,db}
from "./config.js";

import {

createUserWithEmailAndPassword,
sendEmailVerification

}

from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {

doc,
setDoc

}

from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document
.getElementById("registerBtn")
.onclick=async()=>{

const email=
document.getElementById("email").value;

const password=
document.getElementById("password").value;

const firstname=
document.getElementById("firstname").value;

const surname=
document.getElementById("surname").value;

try{

const userCredential=

await createUserWithEmailAndPassword(
auth,
email,
password
);

const user=
userCredential.user;

await setDoc(

doc(
db,
"users",
user.uid
),

{

uid:user.uid,
email:email,
fullname:
firstname+" "+surname,

balance:0,
invested:0,
profit:0,
createdAt:new Date()

}

);

await sendEmailVerification(
user
);

alert(
"Account created successfully"
);

window.location.href=
"login.html";

}
catch(error){

alert(
error.message
);

}

};
