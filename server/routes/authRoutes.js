import express from "express";
import { authenticate, authorize } from "../middlewares/auth.js";
import {
  addMember,
  login,
  session,
  logout,
  deleteMember,
  updateProfile,
  saveMessage,
} from "../controllers/authController.js";
import upload from "../middlewares/fileUpload.js";

const authRouter = express.Router();

authRouter.post(
  "/add",
  upload.single("avatar"),
  authenticate,
  authorize,
  addMember
);
authRouter.post("/login", login);
authRouter.get("/session", authenticate, session);
authRouter.put(
  "/update/:id",
  upload.single("avatar"),
  authenticate,
  updateProfile
);
authRouter.post("/logout", authenticate, logout);
authRouter.delete("/:id", authenticate, authorize, deleteMember);

authRouter.post("/contact", saveMessage);

export default authRouter;
