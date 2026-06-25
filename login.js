import {auth}
from "./config.js";

import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const status=
document.getElementById(
"status"
);

document
.getElementById(
"loginBtn"
)
.onclick=
async()=>{

const email=
document
.getElementById(
"email"
)
.value
.trim();

const password=
document
.getElementById(
"password"
)
.value;

if(
!email||
!password
){

status.innerText=
"Enter email and password";

status.style.color=
"#ef4444";

return;

}

status.innerText=
"Signing in...";

status.style.color=
"#22c55e";

try{

await signInWithEmailAndPassword(

auth,
email,
password

);

status.innerText=
"Login successful";

status.style.color=
"#22c55e";

setTimeout(()=>{

window.location.href=
"dashboard.html";

},800);

}

catch(error){

status.innerText=
"Incorrect email or password";

status.style.color=
"#ef4444";

console.log(error);

}

};
