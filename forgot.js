import { auth }
from "./config.js";

import {
sendPasswordResetEmail
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const modal =
document.getElementById(
"forgotModal"
);

document.getElementById(
"forgotBtn"
).onclick=()=>{

modal.style.display="flex";

};

document.getElementById(
"closeModal"
).onclick=()=>{

modal.style.display="none";

const resetBtn=
document.getElementById(
"sendReset"
);

resetBtn.innerText=
"Send Reset Link";

};

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

document.getElementById(
"sendReset"
).onclick=async()=>{

const emailField=
document.getElementById(
"resetEmail"
);

const resetBtn=
document.getElementById(
"sendReset"
);

const email=
emailField.value.trim();

if(!email){

shakeField(
emailField
);

resetBtn.innerText=
"Enter Email";

setTimeout(()=>{

resetBtn.innerText=
"Send Reset Link";

},2000);

return;

}

resetBtn.innerText=
"Sending...";

try{

await sendPasswordResetEmail(
auth,
email
);

resetBtn.innerText=
"Email Sent ✓";

setTimeout(()=>{

modal.style.display=
"none";

resetBtn.innerText=
"Send Reset Link";

emailField.value="";

},1500);

}catch(error){

resetBtn.innerText=
"Email Not Found";

setTimeout(()=>{

resetBtn.innerText=
"Send Reset Link";

},3000);

}

};
