import express from "express";
import { productsRouter } from "./routes/products.js";
import { authRouter } from "./routes/auth.js";

const app = express();
app.use(express.static("public")); //here we are using the built-in middleware of express in our app
app.use("/api/products", productsRouter);
app.use(express.json())  //here express.json() middleware is used for converting any req body into json
app.use('/api/auth',authRouter)  // /api/auth gonna be the default route for our authentication
const PORT = 8000;
app
  .listen(PORT, () =>
    console.log(`server running at port: http://localhost:${PORT}`)
  )
  .on("error", (err) => console.log(`Server failed to start due to ${err}`));
