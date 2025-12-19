import express from "express";
import type { Express, Request, Response } from "express";
import { pets } from "./data/pets.js";
import cors from "cors";
import type { Pet } from "./data/pets.js";
//cross-origin resource sharing, this means allowing resources or datas to be shared in different domain, protocal(http or https) and PORT
const PORT = 3000;
const app: Express = express();
app.use(cors());

app.get(
  "/",
  (
    req: Request<{ species: string }>,
    res: Response<Pet[] | { message: string }>
  ): void => {
    const { species } = req.query;
    if (species) {
      const datas: Pet[] = pets.filter(
        (pet) => pet.species.toLowerCase() === String(species).toLowerCase()
      ); //as the filter returns an array
      if (datas) {
        res.json(datas);
      }
    } 
    
    
    else {
      res.status(404).json({ message: "No species provided!" });
    }
  }
);

app.get(
  "/:id",
  (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>
  ): void => {
    //as this function is not returning anything we must use void type
    //here as we are sending the response in json which is of type Pet
    const { id } = req.params; //here we are getting the id from the req params
    const pet: Pet | undefined = pets.find(
      (pet: Pet): boolean => pet.id === Number(id)
    ); //and as the id is string type initially , we must convert it into number
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Not found!" });
    }
  }
);

app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "Not Found" });
}); //using a middleware
//here we are using a generic type for response having a json object with message property and a string type as value

app.listen(PORT, (): void => {
  console.log("Listening on port: ", PORT);
});
