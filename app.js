import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./config/connectdb.js";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

//CORS POLICY
app.use(cors());

// Database Connection
connectdb(DATABASE_URL);

//JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
