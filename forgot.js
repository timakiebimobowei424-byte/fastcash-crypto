import { auth }
from "./config.js";

import {
sendPasswordResetEmail
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

document.getElementById(
"forgotBtn"
).onclick = async()=>{

const email =
prompt(
"Enter your email address"
);

if(!email){

return;

}

try{

await sendPasswordResetEmail(
auth,
email
);

alert(
"Password reset email sent. Check your inbox."
);

}catch(error){

alert(
error.message
);

}

};
