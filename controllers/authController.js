import validator from "validator";
import { getDBConnection } from "../db/db.js";
import bcrypt from "bcrypt";

export async function registerUser(req, res) {
  let { name, username, email, password } = req.body;
  const regex = /^[a-zA-Z0-9_-]{1,20}$/;
  const db = await getDBConnection();

  if (!name || !username || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
    console.log("Fields are empty");
    return;
  }
  name = name.trim(); //we are using .trim method inorder to remove the whitespace at the beginning and at the end of the word
  username = username.trim();
  email = email.trim();
  if (!validator.isEmail(email)) {
    console.log("Invalid email");
    return res.status(400).json({ error: "Invalid email" });
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
      //after the user has been registered , we assign the user's id as userId in the session

      return res.status(201).json({ message: "User registered" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Network error" });
  }
}

export async function loginUser(req, res) {
  try {
    const db = await getDBConnection();
    const { username, password } = await req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existing = await db.get(`SELECT * FROM users WHERE username = ?`, [
      username,
    ]);
    if (!existing || !(await bcrypt.compare(password, existing.password))) {  //here exissting.password is the hassed password
      //if the user doesnot exists or the password doesnot match
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.session.userId = existing.id; //as we are selecting the id
    return res.status(200).json({ message: "Logged in" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Login failed" });
  }
}
