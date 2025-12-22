import validator from "validator";
export async function registerUser(req, res) {
  let { name, username, email, password } = req.body;
  const regex = /^[a-zA-Z0-9_-]{1,20}$/;

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
  if (!regex.test(username)) {    //here we are using the .test method on regex so that the username must consists of these characters inside the regex only
    res.status(400).json({ error: "Invalid username" });
    console.log("Invalid username");
    return;
  }
}
