import { petRouter } from "./routes/pets.router.js";
import express from "express";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.js";
import cors from "cors";
import type { Pet } from "./data/pets.js";
//cross-origin resource sharing, this means allowing resources or datas to be shared in different domain, protocal(http or https) and PORT
const PORT = 3000;
const app: Express = express();
app.use(cors());

app.use('/pets',petRouter)  //as we have made separate routes , we are making our app to use router and our main default url is /pets
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "Not Found" });
}); //using a middleware
//here we are using a generic type for response having a json object with message property and a string type as value

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
