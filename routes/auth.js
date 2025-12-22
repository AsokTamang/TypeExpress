import { register } from "../controllers/authController";
import express from 'express'

export const authRouter = express.Router();
authRouter.put('/register',register);