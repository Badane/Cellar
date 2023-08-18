import "https://deno.land/std@0.197.0/dotenv/load.ts";
import Database from "https://deno.land/x/xdatabase/src/mod.ts";

// You must generate these credentials from Google Cloud Dashboard
import credentials from "./credentialsGoogleCloud.json" assert {type: "json"};

const database = new Database();
database.credential(credentials);
database.project(Deno.env.get("FB_PROJECT_ID"));

export default database;