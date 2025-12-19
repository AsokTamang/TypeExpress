import express from "express";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.js";
import cors from "cors";
//cross-origin resource sharing, this means allowing resources or datas to be shared in different domain, protocal(http or https) and PORT
const PORT = 8000;
const app: Express = express();
app.use(cors());
app.get("/", (req: Request, res: Response): void => {
  //declaring the type for both req and res
  res.json(pets);
});

app.use((req: Request, res: Response):void => {res.status(404).json("Not Found")}); //using a middleware

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
