import { db } from "./config.js";

import {
doc,
getDoc,
setDoc,
updateDoc,
increment,
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document
.getElementById("fundBtn")
.onclick = async()=>{

const uid =
document.getElementById("uid").value;

const amount =
Number(
document.getElementById("amount").value
);

if(!uid || !amount){

alert("Fill all fields");
return;

}

const walletRef =
doc(db,"wallets",uid);

const walletSnap =
await getDoc(walletRef);

if(!walletSnap.exists()){

await setDoc(
walletRef,
{
balance:0
}
);

}

await updateDoc(
walletRef,
{
balance:increment(amount)
}
);

await addDoc(
collection(db,"transactions"),
{
uid:uid,
type:"Admin Fund",
amount:amount,
status:"Completed",
date:Date.now()
}
);

alert(
"User funded successfully"
);

};
