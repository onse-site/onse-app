import express from "express";
import authRouter from "./authRoutes.js";
import postRouter from "./postRoutes.js";
import orgRouter from "./orgRoutes.js";
import dashboardRouter from "./dashboardRouter.js";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/post", postRouter);
api.use("/org", orgRouter);
api.use("/dashboard", dashboardRouter);

export default api;
