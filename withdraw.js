import { auth, db } from "./config.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document.getElementById("withdrawBtn").onclick = async () => {

const name = document.getElementById("name").value;
const number = document.getElementById("number").value;
const bank = document.getElementById("bank").value;
const amount = document.getElementById("amount").value;

if (!name || !number || !bank || !amount) {
alert("Fill all fields");
return;
}

const user = auth.currentUser;

if (!user) {
alert("Not logged in");
return;
}

await addDoc(collection(db, "withdrawals"), {

uid: user.uid,
name,
number,
bank,
amount,
status: "Pending",
date: Date.now()

});



alert("Withdrawal request submitted,Check your email for activatation code");

};