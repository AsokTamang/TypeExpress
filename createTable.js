import { open } from "sqlite";
import sqlite3 from "sqlite3"; //sqlite3 is a driver which is used for creating a database table
import path from "node:path";

export async function createTable() {
  const db = await open({
    //here we are creating a database with the help of driver sqllite3 in the file called database.db
    filename: path.join("database.db"),
    driver: sqlite3.Database
  });

  //here we are creating a table called abductions
  await db.exec(`CREATE TABLE IF NOT EXISTS abductions ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL,
        details TEXT NOT NULL)`);
  await db.close();
  console.log("Table has been created");
}
createTable();
