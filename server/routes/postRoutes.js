import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostByAuthor,
} from "../controllers/postController.js";

import upload from "../middlewares/fileUpload.js";

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostById);
postRouter.put("/:id", upload.single("image"), updatePost);
postRouter.get("/:author", getPostByAuthor);
postRouter.delete("/:id", deletePost);

export default postRouter;
