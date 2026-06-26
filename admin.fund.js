import { db }
from "./config.js";

import {

collection,
getDocs,
doc,
setDoc,
updateDoc,
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
.trim()
.toLowerCase();

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

const usersSnap=
await getDocs(
collection(db,"users")
);

let foundUser=null;

usersSnap.forEach(docSnap=>{

const data=
docSnap.data();

if(
data.email &&
data.email.toLowerCase()===email
){

foundUser={

id:docSnap.id,
...data

};

}

});

if(!foundUser){

status.innerText=
"User not found";
return;

}

const uid=
foundUser.uid||foundUser.id;

await setDoc(

doc(db,"wallets",uid),

{

balance:
increment(amount)

},

{

merge:true

}

);

await updateDoc(

doc(db,"users",uid),

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

status.innerText=
"Funding successful";

}
catch(error){

console.log(error);

status.innerText=
error.message;

}

};
