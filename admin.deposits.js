import { db }
from "./config.js";

import {

collection,
query,
where,
getDocs,
doc,
updateDoc,
addDoc

}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const container=

document.getElementById(
"depositContainer"
);

async function loadDeposits(){

container.innerHTML=
"Loading...";

try{

const q=

query(

collection(
db,
"deposits"
),

where(
"status",
"==",
"pending"
)

);

const snap=

await getDocs(q);

container.innerHTML="";

if(
snap.empty
){

container.innerHTML=

"No pending deposits";

return;

}

snap.forEach(

(d)=>{

const data=
d.data();

container.innerHTML+=`

<div class="deposit">

<p>

<b>User:</b>

${data.email||"Unknown"}

</p>

<p>

<b>Amount:</b>

$${data.amount||0}

</p>

<p>

<b>Method:</b>

${data.method||"Unknown"}

</p>

<button
class="approve"
onclick="approveDeposit('${d.id}')">

Approve

</button>

<button
class="reject"
onclick="rejectDeposit('${d.id}')">

Reject

</button>

</div>

`;

}

);

}
catch(error){

console.log(error);

container.innerHTML=
"Error loading deposits";

}

}

window.approveDeposit=
async(id)=>{

try{

await updateDoc(

doc(
db,
"deposits",
id
),

{

status:
"approved"

}

);

await addDoc(

collection(
db,
"transactions"
),

{

type:
"Deposit",

status:
"Completed",

date:
new Date()

}

);

alert(
"Deposit approved"
);

loadDeposits();

}
catch(error){

console.log(error);

}

};

window.rejectDeposit=
async(id)=>{

try{

await updateDoc(

doc(
db,
"deposits",
id
),

{

status:
"rejected"

}

);

alert(
"Deposit rejected"
);

loadDeposits();

}
catch(error){

console.log(error);

}

};

loadDeposits();
