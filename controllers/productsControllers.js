import path from "node:path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { getDatabase } from "../utils/dataconnection";

const db = await getDatabase();

export async function getProducts(req, res) {
  try {
    const { genre, search } = req.query; //extracting the genre from req query

    let query = `SELECT * FROM products `;
    let vals = [];
    if (genre) {
      query += `WHERE genre = ?`;
      vals.push(genre);
    }
    else if (search) {
      query += `WHERE (title LIKE ? OR artist LIKE ? OR genre LIKE ?)`; //if the search letter is given then we retrieve the product based on letters that are in title or genre or artist
      vals.push(`%${search}%`, `%${search}%`, `%${search}%`); //we must pass the %search% inside  the vals array 3 times as there are 3 placholders in the query
    }
    const total = await db.all(query, vals); //here we are passing the query at first then we are passing the array of values depending upon the placeholders
    res.status(200).json(total);
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
