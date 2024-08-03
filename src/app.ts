import express from "express";
import dotenv from "dotenv";
import AuthRotes from "../src/Routes/AuthRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", AuthRotes);

export default app;
