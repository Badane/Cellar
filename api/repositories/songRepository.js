import Song from "../models/song.ts";
import Repository from "./coreRepository.ts"

const collection = "Songs";

const repo = new Repository(collection);

const song = new Song();
song.title = "test";
song.year = 2000;
song.artist = "l'artiste";
await repo.create(song);

const data = await repo.getAll();
console.log(data);