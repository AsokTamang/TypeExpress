import express from "express";
import type { Router } from "express";
import { getPets, getPetById } from "../controllers/pets.controllers.js";
import {
  validateNumericId,
  pleaseAuth,
} from "../middleware/pets.middleware.js";

export const petRouter: Router = express.Router(); //here we are making a pet router

petRouter.get("/", getPets);

petRouter.get("/:id", pleaseAuth,validateNumericId, getPetById); //here validateNumericId is a middleware
