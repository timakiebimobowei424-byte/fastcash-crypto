import { db } from "./config.js";

import {
collection,
query,
where,
getDocs,
updateDoc,
doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const list = document.getElementById("list");

async function loadDeposits(){

const q = query(
collection(db,"transactions"),
where("type","==","Deposit")
);

const snap = await getDocs(q);

list.innerHTML = "";

snap.forEach(d => {

const data = d.data();

const div = document.createElement("div");

div.className = "card";

div.innerHTML = `
<p>Amount: $${data.amount}</p>
<p>Method: ${data.method}</p>
<p>Status: ${data.status}</p>

<button class="approve">Approve</button>
<button class="reject">Reject</button>
`;

div.querySelector(".approve").onclick = async () => {

await updateDoc(doc(db,"transactions",d.id),{
status:"Approved"
});

alert("Approved");
loadDeposits();

};

div.querySelector(".reject").onclick = async () => {

await updateDoc(doc(db,"transactions",d.id),{
status:"Rejected"
});

alert("Rejected");
loadDeposits();

};

list.appendChild(div);

});

}

loadDeposits();