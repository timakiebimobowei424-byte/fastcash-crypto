import { auth }
from "./config.js";

import {
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const allowedAdmins=[

"marksinvestmentltd@gmail.com"

];

onAuthStateChanged(
auth,
(user)=>{

if(!user){

window.location=
"admin.login.html";

return;

}

if(
!allowedAdmins.includes(
user.email
)
){

signOut(auth);

window.location=
"admin.login.html";

return;

}

document.body.style.visibility=
"visible";

}

);
