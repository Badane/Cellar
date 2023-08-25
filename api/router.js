import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as firestore from "https://cdn.skypack.dev/firebase@10.1.0/firestore";

import "./firebaseConfig.js"
import data from "./data.json" assert {type: "json"};
import Song from "./models/song.ts"

const router = new Router();


router.get("/", (context) => {
  context.response.body = "Welcome to API";
});

/**
 * SONGS
 */
// get all songs
router.get("/songs", async (context) => {
  // const querySnapshot = await firestore.getDocs(firestore.collection(db,"Songs"));
  // console.log(querySnapshot.docs[0].data());
  // context.response.body = querySnapshot.docs.map((doc) => doc.data());
  // context.response.type = "json";

  const song = new Song();
  song.title = "new title";
  song.artist = "the artist";
  song.year = 2010;
  await songRepository.create(song);
  
  const songs = await songRepository.find();
  context.response.body = songs;
  context.response.type = "json";

});

// Get info from a specific song
router.get("/songs/:title", async (context) => {
  // const { title } = context.params;
  // const querySnapshot = await db.collection("songs").where("title", "==", title).get();
  // const song = querySnapshot.docs.map((doc) => doc.data())[0];
  
  // if (!song) {
  //   context.response.status = 404;
  //   context.response.body = `The song titled "${context.params.title}" was not found.`;
  //   context.response.type = "text";
  // } else {
  //   context.response.body = querySnapshot.docs.map((doc) => doc.data())[0];
  //   context.response.type = "json";
  // }
});

// Removes any songs with the same title and adds the new song
router.post("/songs", async (ctx) => {
  // const body = ctx.request.body();
  // if (body.type !== "json") {
  //   ctx.throw(Status.BadRequest, "Must be a JSON document");
  // }
  // const song = await body.value;
  // if (!isSong(song)) {
  //   ctx.throw(Status.BadRequest, "Payload was not well formed");
  // }
  // const querySnapshot = await db
  //   .collection("songs")
  //   .where("title", "==", song.title)
  //   .get();
  // await Promise.all(querySnapshot.docs.map((doc) => doc.ref.delete()));
  // const songsRef = db.collection("songs");
  // await songsRef.add(song);
  // ctx.response.status = Status.NoContent;
});

function isSong(value) {
  return typeof value === "object" && value !== null && "title" in value;
}

/**
 * DINOS
 */
router.get("/api/dinos", (context) => {
  context.response.body = data;
});

router.get("/api/:dino", (context) => {
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

export default router;