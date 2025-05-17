import express from "express";
import authRouter from "./authRoutes.js";
import postRouter from "./postRoutes.js";
import orgRouter from "./orgRoutes.js";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/post", postRouter);
api.use("/org", orgRouter);

export default api;
