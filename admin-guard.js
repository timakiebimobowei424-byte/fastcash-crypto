import { auth } from "./config.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const ADMIN_EMAIL = "marksinvestmentltd@gmail.com";

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location="admin-login.html";
return;

}

if(user.email!==ADMIN_EMAIL){

alert("Only admin account allowed");

window.location="dashboard.html";
return;

}

});