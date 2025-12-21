import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "node:path";

export async function viewTable() {
  const db = await open({
    filename: path.join("database.db"),
    driver: sqlite3.Database,
  });
  try {
    const abductions = await db.all("SELECT * FROM abductions");
    console.table(abductions);
  } catch (error) {
    console.log(error);
  } finally {
    await db.close(); //closing the table
  }
}
viewTable();
