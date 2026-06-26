import { db }
from "./config.js";

import {

doc,
getDoc,
setDoc,
increment,
addDoc

}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const status=
document.getElementById(
"status"
);

document
.getElementById(
"fundBtn"
)
.onclick=
async()=>{

const uid=
document
.getElementById(
"email"
)
.value
.trim();

const amount=
Number(
document
.getElementById(
"amount"
)
.value
);

if(
!uid||
!amount
){

status.innerText=
"Enter UID and amount";

return;

}

status.innerText=
"Funding...";

try{

const userRef=
doc(
db,
"users",
uid
);

const userSnap=
await getDoc(
userRef
);

if(
!userSnap.exists()
){

status.innerText=
"User not found";

return;

}

await setDoc(

doc(
db,
"wallets",
uid
),

{

balance:
increment(amount)

},

{

merge:true

}

);

await addDoc(

collection(
db,
"transactions"
),

{

uid:uid,
email:userSnap.data().email || "",
amount:amount,
type:"Admin Funding",
status:"Completed",
date:new Date()

}

);

status.innerText=
"Funding successful";

alert(
"User funded successfully"
);

}
catch(error){

console.log(
error
);

status.innerText=
error.message;

}

};
