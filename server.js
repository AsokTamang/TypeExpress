import express from "express";
import { productsRouter } from "./routes/product.js";

const app = express();
app.use(express.static("public")); //here we are using the built-in middleware of express in our app
app.use("/api/products", productsRouter);
const PORT = 8000;
app
  .listen(PORT, () =>
    console.log(`server running at port: http://localhost:${PORT}`)
  )
  .on("error", (err) => console.log(`Server failed to start due to ${err}`));
