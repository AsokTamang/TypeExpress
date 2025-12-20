import express, { type Express } from "express";

const PORT = 8000;
const app: Express = express();
//here we are using the builint middleware of express
app.use(express.static("public"));
app
  .listen(PORT, () => console.log(`Server running at port ${PORT}`))
  .on("error", (err) => console.log("Server failed to start", err));
