import { getDBConnection } from "../db/db";
import bcrypt from "bcrypt";

export async function getCurrentUser(req, res) {
  try {
    const db = await getDBConnection();
    const name = await db.get(`SELECT name FROM users WHERE id = ?`, [
      req.session.userId,
    ]); //here we are retrieving the data of user based on his id
    if (name) {
      return res.json({ isLoggedIn: true, name });
    } else {
      return res.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error("getCurrentUser error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function loginController(req, res) {
  try {
    const { username, password } = await req.body;
    if (!username || !password) {
      return res.json({ error: "All fields are required" });
    }
    const db = await getDBConnection();
    const existing = await db.get(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, bcrypt.hash(password, 10)]
    ); //as the userpassword is inserted into database using bcrypt.hash(pw,10)  here 10 is the cost factor    );
    if (existing != undefined) {
      req.session.userId = existing.id;
      return res.json({ isLoggedIn: true, message: "Logged in" });
    }
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}
