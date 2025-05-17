import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  addMember,
  login,
  session,
  logout,
  deleteMember,
  updateProfile,
} from "../controllers/authController.js";
import upload from "../middlewares/fileUpload.js";

const authRouter = express.Router();

authRouter.post("/add", upload.single("avatar"), addMember);
authRouter.post("/login", login);
authRouter.get("/session", authenticate, session);
authRouter.put("/update/:id", upload.single("avatar"), updateProfile);
authRouter.post("/logout", authenticate, logout);
authRouter.delete("/:id", deleteMember);

export default authRouter;
