import { getDatabase } from "./db/db.js";

export async function createUserTable() {
  const db = await getDatabase();
  await db.exec(`CREATE TABLE IF NOT EXISTS users 
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
}
createUserTable();
