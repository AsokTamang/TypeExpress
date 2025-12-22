import validator from "validator";
import { getDBConnection } from "../db/db.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'

dotenv.config();   
export async function registerUser(req, res) {
  let { name, username, email, password } = req.body;
  const regex = /^[a-zA-Z0-9_-]{1,20}$/;
  const db = await getDBConnection();

  if (!name || !username || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
    console.log("Fields are empty");
    return;
  }
  name = name.trim();
  username = username.trim();
  email = email.trim();
  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Invalid email" });
    console.log("Invalid email");
    return;
  }
  if (!regex.test(username)) {
    //here we are using the .test method on regex so that the username must consists of these characters inside the regex only
    res.status(400).json({ error: "Invalid username" });
    console.log("Invalid username");
    return;
  }
  try {
    const condition = await db.get(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );
    if (condition !== undefined) {
      return res
        .status(409)
        .json({ error: "Email or username already in use." });
    } else {
      //as we are inserting single data into database, we are using db.run() here
      const hasedPW = await bcrypt.hash(password, 10); //here we are using brypt inorder to hash the password using costfactor of 10 passed from UI
      const result = await db.run(
        `INSERT INTO users (name,email,username,password)  
        VALUES(?,?,?,?)`,
        [name, email, username, hasedPW]
      );
      req.session.userId = result.lastID; //this lastID is provided by sqlite3 or any sql which is the id of the users i.e primary key in nature

      return res.status(201).json({ message: "User registered" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Network error" });
  }
}
