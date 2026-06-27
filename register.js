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

function shakeField(field){

field.style.border=
"2px solid #ef4444";

field.animate(
[
{transform:"translateX(-6px)"},
{transform:"translateX(6px)"},
{transform:"translateX(-6px)"},
{transform:"translateX(6px)"},
{transform:"translateX(0px)"}
],
{
duration:400
}
);

setTimeout(()=>{

field.style.border=
"none";

},1000);

}

btn.onclick=async()=>{

const firstnameField=
document.getElementById(
"firstname"
);

const surnameField=
document.getElementById(
"surname"
);

const countryField=
document.getElementById(
"country"
);

const phoneField=
document.getElementById(
"phone"
);

const emailField=
document.getElementById(
"email"
);

const passwordField=
document.getElementById(
"password"
);

const firstname=
firstnameField.value.trim();

const surname=
surnameField.value.trim();

const country=
countryField.value;

const phone=
phoneField.value.trim();

const email=
emailField.value.trim();

const password=
passwordField.value;

let hasError=false;

[
firstnameField,
surnameField,
phoneField,
emailField,
passwordField

].forEach(field=>{

if(
!field.value.trim()
){

shakeField(field);

hasError=true;

}

});

if(
country==="Select Country"
){

shakeField(countryField);

hasError=true;

}

if(hasError){

btn.innerText=
"Please fill all fields";

setTimeout(()=>{

btn.innerText=
"Create Account";

},2000);

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

btn.innerText=
"Account Created ✓";

setTimeout(()=>{

window.location.href=
"login.html";

},1000);

}
catch(error){

btn.innerText=
error.message;

setTimeout(()=>{

btn.innerText=
"Create Account";

},3000);

}

};
