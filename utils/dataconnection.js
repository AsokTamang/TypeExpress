import path from "node:path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

export function getDatabase() {
  return open({ filename: "database.db", driver: sqlite3.Database });
}
