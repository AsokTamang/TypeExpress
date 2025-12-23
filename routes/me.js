import { getCurrentUser } from "../controllers/meController";
import express from 'express'

export const meRouter =express.Router();
meRouter.get('/me',meController);