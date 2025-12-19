import express from "express";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.js";
import cors from "cors";
import type { Pet } from "./data/pets.js";
//cross-origin resource sharing, this means allowing resources or datas to be shared in different domain, protocal(http or https) and PORT
const PORT = 3000;
const app: Express = express();
app.use(cors());
app.get("/", (req: Request, res: Response<Pet[]>): void => {
  //as the pets is an array of objects which are of type Pet
  //declaring the type for both req and res
  res.json(pets);
});

app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "Not Found" });
}); //using a middleware
//here we are using a generic type for response having a json object with message property and a string type as value

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
