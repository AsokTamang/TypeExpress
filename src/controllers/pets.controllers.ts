import { type Pet } from "../data/pets.js";
import type { Request, Response } from "express";
import { pets } from "../data/pets.js";
type reqeurytype = {
  species?: string;
  adopted?: "true" | "false"; //here the adopted in the query must be either true or false
  minAge?: number;
  maxAge?: number;
};
export const getPets= (
  req: Request<{}, unknown, {}, Partial<reqeurytype>>, //here the generic type of the req in express is <params,resbody,reqbody,query> and as the query type is partial of reqeurytype
  //and as the species might or might not be given in url , we are making the species optional
  res: Response<Pet[] | { message: string }>
): void => {
  const { species, adopted, minAge, maxAge } = req.query;

  let filteredPets: Pet[] = pets;

  if (minAge) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.age >= Number(minAge)
    );
  }
  if (maxAge) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.age <= Number(maxAge)
    );
  }

  if (species) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.species.toLowerCase() === species.toLowerCase()
    );
  }
  if (adopted) {
    filteredPets = filteredPets.filter(
      (pet: Pet): boolean => pet.adopted === JSON.parse(adopted.toLowerCase()) //JSON.parse only works on the lower case of adopted
    );
  }
  res.json(filteredPets);
};

export const getPetById = (
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
};
