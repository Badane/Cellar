import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import router from "./router.js"

// Not used anymore. 
// Usefull to test <Suspense>
// async function wait(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, ms);
//   });
// }


const app = new Application();
app.use(oakCors()); //Enable CORS
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });