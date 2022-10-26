const MAX_REPONSES = 300

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7hTWEmt1JRX3JXpq_dDNQWo0KKKC008",
  authDomain: "shvushon2.firebaseapp.com",
  databaseURL: "https://shvushon2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shvushon2",
  storageBucket: "shvushon2.appspot.com",
  messagingSenderId: "833572668563",
  appId: "1:833572668563:web:efd646d875de094f203966",
  measurementId: "G-VTT9E38KE8"
};

initializeApp(firebaseConfig);

var count_for_all = '';
var big_all_count = 0;
var small_all_count = 0;
var qRef = ref(getDatabase());
var snapshot = await get(qRef);
var val = snapshot.val();

function func(t)
{
  document.getElementById('yeshivot').hidden = true;
  document.getElementById('avg-container').hidden = false;
  const avg = document.getElementById('avg-container');
  const children = document.getElementById('musagim').children;
  const count_ktanim = Math.floor(val[t.id][0] / MAX_REPONSES);
  const count_gdolim = val[t.id][0] % MAX_REPONSES;
  avg.innerHTML += `<p>כמה ענו: ${count_ktanim}, ${count_gdolim}, ${count_ktanim+count_gdolim}`;
  for (var i = 0; i < children.length; i++)
  {
    const num = val[t.id][i+1];
    const ktanim = Math.floor(num / MAX_REPONSES);
    const gdolim = num % MAX_REPONSES;

    const k = (100 * ktanim / count_ktanim).toFixed(1);
    const g = (100 * gdolim / count_gdolim).toFixed(1);
    const all = (100 * (ktanim + gdolim) / (count_ktanim + count_gdolim)).toFixed(1);

    console.log(val[t.id][i+1]);
    avg.innerHTML += `<p>${children[i].innerHTML}: ק - ${k}, ג - ${g}, כולם - ${all}`;
  }
}

var sum = [0, 0, 0];

for (var key in val) // in yeshivot
{
  const yeshivot = document.getElementById('yeshivot');
  const count_ktanim = Math.floor(val[key][0] / MAX_REPONSES);
  const count_gdolim = val[key][0] % MAX_REPONSES;
  yeshivot.innerHTML += `<p id="${key}" onclick="func(this)">${key} (${count_ktanim}, ${count_gdolim}, ${count_ktanim+count_gdolim})</p>`;
  sum[0] += count_ktanim;
  sum[1] += count_gdolim;
  sum[2] += (count_gdolim+count_ktanim);
}
document.getElementById('all').innerHTML += `${sum[0]}, ${sum[1]}, ${sum[2]}`;

window.func = func;