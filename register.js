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

const status=
document.getElementById(
"status"
);

function shakeField(field){

field.classList.add(
"error",
"shake"
);

setTimeout(()=>{

field.classList.remove(
"shake"
);

},400);

}

document
.getElementById(
"registerBtn"
)
.onclick=
async()=>{

const firstname=
document.getElementById(
"firstname"
);

const surname=
document.getElementById(
"surname"
);

const country=
document.getElementById(
"country"
);

const phone=
document.getElementById(
"phone"
);

const email=
document.getElementById(
"email"
);

const password=
document.getElementById(
"password"
);

document
.querySelectorAll(
"input,select"
)
.forEach(el=>{

el.classList.remove(
"error"
);

});

let hasError=false;

[
firstname,
surname,
phone,
email,
password
]
.forEach(field=>{

if(
!field.value.trim()
){

shakeField(
field
);

hasError=true;

}

});

if(
!country.value||
country.value==="Select Country"
){

shakeField(
country
);

hasError=true;

}

if(hasError){

status.innerText=
"Please complete all fields";

status.style.color=
"#ef4444";

return;

}

status.innerText=
"Creating account...";

status.style.color=
"#22c55e";

try{

const userCredential=

await createUserWithEmailAndPassword(

auth,
email.value.trim(),
password.value

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

firstname:
firstname.value,

surname:
surname.value,

country:
country.value,

phone:
phone.value,

email:
email.value,

createdAt:
new Date()

}

);

await setDoc(

doc(
db,
"wallets",
user.uid
),

{

balance:0

}

);

await sendEmailVerification(
user
);

status.innerText=
"Account created successfully";

status.style.color=
"#22c55e";

setTimeout(()=>{

window.location.href=
"login.html";

},1500);

}
catch(error){

status.innerText=
error.message;

status.style.color=
"#ef4444";

console.log(error);

}

};
