import { db }
from "./config.js";

import {

collection,
query,
where,
getDocs,
updateDoc,
doc,
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

const email=
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
!email||
!amount
){

status.innerText=
"Enter details";

return;

}

status.innerText=
"Funding...";

try{

const q=

query(

collection(
db,
"users"
),

where(
"email",
"==",
email
)

);

const snap=
await getDocs(q);

if(
snap.empty
){

status.innerText=
"User not found";

return;

}

for(const d of snap.docs){

const userData=
d.data();

const uid=
userData.uid || d.id;

const walletRef=

doc(
db,
"wallets",
uid
);

await updateDoc(

walletRef,

{

balance:
increment(amount)

}

);

await addDoc(

collection(
db,
"transactions"
),

{

email:email,

amount:amount,

type:"Admin Funding",

status:"Completed",

date:new Date()

}

);

}

status.innerText=
"Funding successful";

alert(
"User funded successfully"
);

}
catch(error){

console.log(error);

status.innerText=
error.message;

alert(error.message);

}

};
