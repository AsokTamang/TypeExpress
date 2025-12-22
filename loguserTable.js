import { getDatabase } from "./db/db.js";

export async function viewTable() {
  const db = await getDatabase();
  try {
    const products = await db.all(`SELECT * FROM user`);
    const cleandata = products.map(({ id, name, username, email,password }) => ({
      id,
      name,
      username,
      email,
      password

    }));
    console.table(cleandata);
  } catch (error) {
    console.log(error);
  } finally {
    await db.close(); //closing the table
  }
}
viewTable();
