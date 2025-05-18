import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import upload from "../middlewares/fileUpload.js";
import { authenticate } from "../middlewares/auth.js";

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), authenticate, createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", upload.single("image"), authenticate, updatePost);
postRouter.delete("/:id", authenticate, deletePost);

export default postRouter;
