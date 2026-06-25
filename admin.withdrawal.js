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
"withdrawalContainer"
);

async function loadWithdrawals(){

container.innerHTML=
"Loading...";

try{

const q=

query(

collection(
db,
"withdrawals"
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

"No pending withdrawals";

return;

}

snap.forEach(

(d)=>{

const data=
d.data();

container.innerHTML+=`

<div class="withdrawal">

<p>

<b>User:</b>

${data.email||"Unknown"}

</p>

<p>

<b>Amount:</b>

$${data.amount||0}

</p>

<p>

<b>Wallet:</b>

${data.wallet||"Not specified"}

</p>

<button
class="approve"
onclick="approveWithdrawal('${d.id}')">

Approve

</button>

<button
class="reject"
onclick="rejectWithdrawal('${d.id}')">

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
"Error loading withdrawals";

}

}

window.approveWithdrawal=
async(id)=>{

try{

await updateDoc(

doc(
db,
"withdrawals",
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
"Withdrawal",

status:
"Completed",

date:
new Date()

}

);

alert(
"Withdrawal approved"
);

loadWithdrawals();

}
catch(error){

console.log(error);

}

};

window.rejectWithdrawal=
async(id)=>{

try{

await updateDoc(

doc(
db,
"withdrawals",
id
),

{

status:
"rejected"

}

);

alert(
"Withdrawal rejected"
);

loadWithdrawals();

}
catch(error){

console.log(error);

}

};

loadWithdrawals();
