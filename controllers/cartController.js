import { getDBConnection } from "../db/db";

export async function getAll(req, res) {
  try {
    const db = await getDBConnection();
    const items = await db.all(
      //the default join is full join
      `SELECT ci.id AS cartItemId , ci.quantity , p.title , p.artist , p.price  FROM cart_items ci JOIN products p ON p.id = ci.product_id WHERE ci.user_id = ?`,
      [req.session.userId]
    ); //here we are selecting the products from the cart items whose user product_id matches with the id of product and the user_id of ci also matches with the current user id
    return res.status(200).json({ items: items }); //as the db.all returns an array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function addToCart(req, res) {
  try {
    const db = await getDBConnection();
    const currentuser = req.session.userId; //here we are extracting the current loggedin user's id
    let { productId } = await req.body; //the product id has been passed from UI which is string format so we must convert it into number
    productId = Number(productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product id" });
    } else {
      const existingProd = await db.get(
        `SELECT * FROM cart_items WHERE product_id = ? AND user_id = ?`,
        [productId, currentuser]
      ); //this is always in object format
      if (!existingProd) {
        //if this item is not in the cart item of this current user then we insert this item
        await db.exec(
          `INSERT INTO cart_items (user_id ,product_id) 
        VALUES (${currentuser} , ${productId})`
        ); //if this item has not been added in the cart of the user then we add it
        return res.status(200).json({ message: "Added to cart" });
      }
      //if this item is already in the cart, we just increase the quantity
      await db.run(
        `UPDATE cart_items
        SET quantity = quantity + 1
        WHERE product_id = ? AND user_id = ?`,
        [productId, currentuser]
      );
      return res.status(200).json({ message: "Added to cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCartCount(req, res) {
  try {
    const currentuser = req.session.userId;
    const db = await getDBConnection();
    const count = await db.get(
      `SELECT SUM(quantity) AS total FROM cart_items WHERE user_id = ?`,
      [currentuser]
    ); //here we are counting the number of products inside the cart of current user by the sum of quantity column's data of this current user
    if (count.total > 0) {
      return res.status(200).json({ totalItems: count.total });
    }
    return res.status(200).json({ totalItems: 0 });
  } catch (error) {
    return res.status(500).json({ error: "Network Error" });
  }
}

export async function deleteItem(req, res) {
  //deleting the item based on the product id
  try {
    const db = await getDBConnection();
    const { itemId } = await req.params; //extracting the itemId through the params
    await db.run(
      `DELETE * FROM cart_items WHERE product_id = ? AND user_id = ?`,
      [itemId, req.session.userId]
    ); //deleting the item from cart based on product id
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteAll(req, res) {
  //deleting the item based on the product id
  try {
    const db = await getDBConnection();
    await db.run(`DELETE * FROM cart_items WHERE AND user_id = ?`, [
      req.session.userId,
    ]); //deleting the item from cart based on product id
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
