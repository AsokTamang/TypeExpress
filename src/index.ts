import express from "express";
import type { Express,Request,Response } from "express";
import { pets } from "./data/pets.js";

const PORT = 8000;
const app: Express = express();

app.get("/", (req:Request, res:Response) => {  //declaring the type for both req and res
  res.json(pets);
});

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
