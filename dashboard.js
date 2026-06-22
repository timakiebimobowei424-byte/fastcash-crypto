import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
doc,
getDoc,
setDoc,
updateDoc,
increment,
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

let currentUser;

// AUTH
onAuthStateChanged(auth, async (user) => {
if (!user) {
window.location.href = "login.html";
return;
}

currentUser = user;

document.getElementById("userEmail").innerText = user.email;

loadUser();
});

// LOAD USER DATA
async function loadUser() {
const ref = doc(db, "users", currentUser.uid);
const snap = await getDoc(ref);

if (!snap.exists()) {
await setDoc(ref, {
email: currentUser.email,
balance: 0,
profit: 0,
invested: 0
});
return loadUser();
}

const data = snap.data();

document.getElementById("balance").innerText = "₦" + data.balance;
document.getElementById("profit").innerText = "₦" + data.profit;
document.getElementById("invested").innerText = "₦" + data.invested;
}

// OPEN MODALS
window.openBitcoin = function () {
document.getElementById("depositModal").style.display = "none";
document.getElementById("bitcoinModal").style.display = "block";
};

window.openCard = function () {
document.getElementById("depositModal").style.display = "none";
document.getElementById("cardModal").style.display = "block";
};

// DEPOSIT BUTTON
document.getElementById("depositBtn").onclick = () => {
document.getElementById("depositModal").style.display = "block";
};

// BITCOIN COPY
window.copyBTC = function () {
const input = document.getElementById("btcAddress");
input.select();
document.execCommand("copy");
alert("Copied");
};

// BITCOIN CONFIRM
document.getElementById("btcConfirm").onclick = async () => {

await addDoc(collection(db, "transactions"), {
uid: currentUser.uid,
type: "bitcoin_pending",
amount: 0,
date: serverTimestamp()
});

alert("Submitted for review");
};

// CARD PAY (SIMULATED NOW)
document.getElementById("cardPay").onclick = async () => {

const amount = Number(document.getElementById("cardAmount").value);

if (!amount) return alert("Enter amount");

await updateDoc(doc(db, "users", currentUser.uid), {
balance: increment(amount),
invested: increment(amount)
});

await addDoc(collection(db, "transactions"), {
uid: currentUser.uid,
type: "card_deposit",
amount,
date: serverTimestamp()
});

alert("Deposit successful");
};

// LOGOUT
document.getElementById("logoutBtn").onclick = async () => {
await signOut(auth);
window.location.href = "login.html";
};