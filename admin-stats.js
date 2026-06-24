import { db } from "./config.js";

import {
collection,
getDocs,
query,
where
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

async function loadStats(){

// Total users
const usersSnap =
await getDocs(
collection(db,"users")
);

document.getElementById(
"users"
).innerText =
usersSnap.size;


// Pending deposits

const depositsSnap =
await getDocs(

query(
collection(db,"transactions"),
where("status","==","Pending"),
where("type","==","Deposit")
)

);

document.getElementById(
"deposits"
).innerText =
depositsSnap.size;


// Pending withdrawals

const withdrawalsSnap =
await getDocs(

query(
collection(db,"withdrawals"),
where("status","==","Pending")
)

);

document.getElementById(
"withdrawals"
).innerText =
withdrawalsSnap.size;


// Total transactions

const transactionSnap =
await getDocs(
collection(db,"transactions")
);

document.getElementById(
"transactions"
).innerText =
transactionSnap.size;

}

loadStats();
