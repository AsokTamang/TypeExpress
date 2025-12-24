import express from "express";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";
import session from "express-session";
import dotenv from 'dotenv'
import { meRouter } from "./routes/me.js";
import { cartRouter } from "./routes/cart.js";

dotenv.config();  //we can only access the credentials from .env after dotenv.config()
const app = express();
const secret = process.env.SECRET;
console.log(secret)
app.use(express.static("public")); //here we are using the built-in middleware of express in our app
app.use("/api/products", productsRouter);
app.use(express.json()); //here express.json() middleware is used for converting any req body into json
app.use(
  session({
    secret,  //this is the secret key for assigning the session
    resave: false,   //resave means we are not saving the session to store in every request
    saveUninitialized: false,
    cookie: {
      httpOnly: true,   //here we are using httponly to true so that cookie cannot be accessed via javascript which prevents from hacking of data
      secure: false,      //as we are in dev mode , we are setting secure or https to false
      sameSite: 'lax',
    },
  })
);

app.use('/api/auth',meRouter);
app.use("/api/auth", authRouter); // /api/auth gonna be the default route for our authentication
app.use("/api/cart",cartRouter);
const PORT = 8000;
app
  .listen(PORT, () =>
    console.log(`server running at port: http://localhost:${PORT}`)
  )
  .on("error", (err) => console.log(`Server failed to start due to ${err}`));
