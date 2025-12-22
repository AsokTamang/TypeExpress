import path from "node:path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getDatabase } from "../utils/dataconnection";

export async function getProducts(req, res) {}

export async function getGenres(req, res) {
  const db =await getDatabase();
  try {
    const genres = await db.all("SELECT DISTINCT genre FROM products"); //here we are using distinct inorder to avoid duplicate genres
    const final = genres.map((genre) => Object.values(genre).toString()); //here we are converting the values of each object into string and storing as an array here in var final
    res.status(200).json(final);
    console.log(final);
  } catch (error) {
    res
      .status(500)
      .json({ message: "couldnot retrieved the data", data: null });
    console.log(error);
  }
}
