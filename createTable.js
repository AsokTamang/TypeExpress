import { open } from "sqlite";
import sqlite3 from "sqlite3"; //sqlite3 is a driver which is used for creating a database table
import path from "node:path";

export async function createTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    price FLOAT NOT NULL,
    image TEXT NOT NULL,
    year INTEGER,
    genre TEXT ,
    stock INTEGER  )`);

  console.log("Table has been created.");
  await db.close();
}
createTable();
