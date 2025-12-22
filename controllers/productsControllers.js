import path from "node:path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getDatabase } from "../utils/dataconnection";

const db = await getDatabase();

export async function getProducts(req, res) {
  try {
    const { genre } = req.query;  //extracting the genre from req query 
    let query = `SELECT * FROM products`;
    if (genre) {
      query = `SELECT * FROM products WHERE genre=?`;
      let total = await db.all(query, [genre]);
       res.status(200).json(total);
    } else {
      let total = await db.all(query);
       res.status(200).json(total);
    }

   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getGenres(req, res) {
  try {
    const genres = await db.all("SELECT DISTINCT genre FROM products"); //here we are using distinct inorder to avoid duplicate genres
    const final = genres.map((row) => row.genre); //here we are converting the values of each object into string and storing as an array here in var final
    res.status(200).json(final);
    console.log(final);
  } catch (error) {
    res
      .status(500)
      .json({ message: "couldnot retrieved the data", data: null });
    console.log(error);
  }
}
