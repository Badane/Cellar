import { Application, Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { virtualStorage } from "https://deno.land/x/virtualstorage@0.1.0/middleware.ts";

import data from "./data.json" assert {
  type: "json"
};

// Not used anymore. 
// Usefull to test <Suspense>
// async function wait(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, ms);
//   });
// }

const router = new Router();
router.get("/", (context) => {
  context.response.body = "Welcome to API";
});

router.get("/songs", async (context) => {
  // Get all songs

  const querySnapshot = await db.collection("songs").get();
  context.response.body = querySnapshot.docs.map((doc) => doc.data());
  context.response.type = "json";
}).get("/songs/:title", async (context) => {
  // Get info from a specific song

  const { title } = context.params;
  const querySnapshot = await db.collection("songs").where("title", "==", title).get();
  const song = querySnapshot.docs.map((doc) => doc.data())[0];
  
  if (!song) {
    context.response.status = 404;
    context.response.body = `The song titled "${context.params.title}" was not found.`;
    context.response.type = "text";
  } else {
    context.response.body = querySnapshot.docs.map((doc) => doc.data())[0];
    context.response.type = "json";
  }
}).post("/songs", async (ctx) => {
  // Removes any songs with the same title and adds the new song
  
  const body = ctx.request.body();
  if (body.type !== "json") {
    ctx.throw(Status.BadRequest, "Must be a JSON document");
  }
  const song = await body.value;
  if (!isSong(song)) {
    ctx.throw(Status.BadRequest, "Payload was not well formed");
  }
  const querySnapshot = await db
    .collection("songs")
    .where("title", "==", song.title)
    .get();
  await Promise.all(querySnapshot.docs.map((doc) => doc.ref.delete()));
  const songsRef = db.collection("songs");
  await songsRef.add(song);
  ctx.response.status = Status.NoContent;
});

function isSong(value) {
  return typeof value === "object" && value !== null && "title" in value;
}

// Dinos
router.get("/api/dinos", (context) => {
  context.response.body = data;
}).get("/api/:dino", (context) => {
  if (context?.params?.dino) {
    const dataFiltered = data.filter((item) => {
      item["name"].toLowerCase() === context.params.dino.toLowerCase()
    })
    if (dataFiltered.length > 0) {
      context.response.body = dataFiltered;
    } else {
      context.response.body = "No dino";
    }
  }
});

const app = new Application();
app.use(oakCors()); //Enable CORS
app.use(virtualStorage());

app.use(async (ctx, next) => {
  const signedInUid = ctx.cookies.get("LOGGED_IN_UID");
  const signedInUser = signedInUid != null ? users.get(signedInUid) : undefined;
  if (!signedInUid || !signedInUser || !auth.currentUser) {
    const creds = await auth.signInWithEmailAndPassword(
      Deno.env.get("FIREBASE_USERNAME"),
      Deno.env.get("FIREBASE_PASSWORD"),
    );
    const { user } = creds;
    if (user) {
      users.set(user.uid, user);
      ctx.cookies.set("LOGGED_IN_UID", user.uid);
    } else if (signedInUser && signedInUid.uid !== auth.currentUser?.uid) {
      await auth.updateCurrentUser(signedInUser);
    }
  }
  return next();
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });