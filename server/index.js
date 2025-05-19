import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes/api.js";
import DB_Connection from "./config/DB_Connection.js";
import CorsOptins from "./config/CORS_Config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();
DB_Connection();

app.use(cors(CorsOptions));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRoutes);
app.get("*any", (request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

mongoose.connection.once("open", async () => {
  console.log("DATABASE Connected!");
  app.listen(PORT, HOST, () => {
    console.log(`Server up and run on port ${PORT}`);
  });
});
