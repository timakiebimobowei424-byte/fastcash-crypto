import {auth}
from "./config.js";

import {

createUserWithEmailAndPassword,
sendEmailVerification

}

from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

document
.getElementById("registerBtn")
.onclick=async()=>{

const email=
document.getElementById("email").value;

const password=
document.getElementById("password").value;

try{

const userCredential=
await createUserWithEmailAndPassword(
auth,
email,
password
);

await sendEmailVerification(
userCredential.user
);

alert(
"Account created successfully. Check your email."
);

window.location.href=
"login.html";

}

catch(error){

alert(error.message);

}

};
