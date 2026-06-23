import {auth,db}
from "./config.js";

import {
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document
.getElementById(
"depositBtn"
)

.onclick=async()=>{

const amount=
document
.getElementById(
"amount"
).value;

const method=
document
.getElementById(
"method"
).value;

const user=
auth.currentUser;

if(!amount){

alert(
"Enter amount"
);

return;

}


await addDoc(

collection(
db,
"transactions"
),

{

uid:user.uid,
type:"Deposit",
amount:amount,
method:method,
status:"Pending",
date:Date.now()

}

);


if(method==="Bitcoin"){

alert(

"Send $" + amount +

"\n\nTo Bitcoin Address:\n\nbc1qq0phsp53j20svznj8e9sy0cwqytqfh99e3jvts"

);

}

else{

alert(

"Request submitted.\nWaiting for approval."

);

}


if(method!=="Bitcoin"){

window.location=
"transactions.html";

}

};