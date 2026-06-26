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

const btn=
document.getElementById(
"registerBtn"
);

btn.onclick=async()=>{

const firstname=
document.getElementById(
"firstname"
).value.trim();

const surname=
document.getElementById(
"surname"
).value.trim();

const country=
document.getElementById(
"country"
).value;

const phone=
document.getElementById(
"phone"
).value.trim();

const email=
document.getElementById(
"email"
).value.trim();

const password=
document.getElementById(
"password"
).value;

if(
!firstname||
!surname||
!country||
country==="Select Country"||
!phone||
!email||
!password
){

alert(
"Please complete all fields"
);

return;

}

btn.innerText=
"Creating...";

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

firstname:
firstname,

surname:
surname,

country:
country,

phone:
phone,

balance:0,

invested:0,

profit:0,

createdAt:
new Date()

}

);

await sendEmailVerification(
user
);

alert(
"Account created successfully. Check your email."
);

window.location.href=
"login.html";

}
catch(error){

console.log(error);

alert(
error.message
);

}

btn.innerText=
"Create Account";

};
