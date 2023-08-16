import "https://deno.land/x/xhr@0.1.1/mod.ts";
import { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
import "https://deno.land/std@0.197.0/dotenv/load.ts";

// import * as firebase from "https://cdn.skypack.dev/firebase@10.1.0/app";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js"
// import "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js"
import * as firestore from"https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js"
// import "https://cdn.skypack.dev/firebase@10.1.0/auth";
// import "https://cdn.skypack.dev/firebase@10.1.0/firestore";


installGlobals();

const firebaseConfig = {
  apiKey: Deno.env.get("FB_API_KEY"),
  authDomain: Deno.env.get("FB_AUTH_DOMAIN"),
  projectId: Deno.env.get("FB_PROJECT_ID"),
  storageBucket: Deno.env.get("FB_STORAGE_BUCKET"),
  messagingSenderId: Deno.env.get("FB_MESSAGING_SENDER_ID"),
  appId: Deno.env.get("FB_APP_ID")
};

const firebaseApp = initializeApp(firebaseConfig);
// const auth = firebase.auth(firebaseApp);
const db = firestore.getFirestore(firebaseApp);
console.log(db);
// const users = new Map();
const querySnapshot = await db.collection("songs").get();

export {
  db
}
