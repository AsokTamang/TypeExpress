import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { vinyl } from "./data.js";

export async function seedTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });

  try {
    await db.exec("BEGIN TRANSACTION"); //as we cannot do exec for the insertion of multiple datas in a database so we are using BEGIN TRANSACTION on exec
    //but db.run is used for the insertion of multiple datas in a database
    for (const { title, artist, price, image, year, genre, stock } of vinyl) {
      await db.run(
        "INSERT INTO products (title,artist,price,image,year,genre,stock) VALUES (?,?,?,?,?,?,?)",
        [title, artist, price, image, year, genre, stock]
      );
    }
    await db.exec("COMMIT");
    console.log("Successfully inserted into DB");
  } catch (error) {
    await db.exec("ROLLBACK"); //here if we find any error then we just rollback which means we stop the insertion
  } finally {
    await db.close();
    console.log("INSERTION FINISHED");
  }
}
seedTable();
