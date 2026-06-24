import {db}
from "./config.js";

import {
collection,
query,
where,
getDocs,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const list =
document.getElementById(
"withdrawList"
);

async function load(){

const q=query(
collection(db,"withdrawals"),
where("status","==","Pending")
);

const snap=
await getDocs(q);

list.innerHTML="";

if(snap.empty){

list.innerHTML=
"No pending withdrawals";

return;

}

snap.forEach(d=>{

const data=d.data();

list.innerHTML+=`

<div class="card">

<p>Account Name: ${data.accountName}</p>

<p>Account Number: ${data.accountNumber}</p>

<p>Amount: $${data.amount}</p>

<button
onclick="approve('${d.id}')">

Approve

</button>

</div>

`;

});

}

window.approve=
async(id)=>{

await updateDoc(
doc(db,"withdrawals",id),
{
status:"Approved"
}
);

alert(
"Withdrawal approved"
);

load();

};

load();
