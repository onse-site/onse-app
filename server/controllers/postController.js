import { MemberModel } from "../models/Member.js";
import { PostModel } from "../models/Post.js";
import mongoose from "mongoose";

export const createPost = async (request, response) => {
  try {
    const { title, content, type, author, publishedAt } = request.body;

    if (!mongoose.Types.ObjectId.isValid(author)) {
      return response
        .status(400)
        .json({ message: "Invalid author ID format." });
    }

    if (!title || !content || !type) {
      return response
        .status(400)
        .json({ message: "Title, content, and type are required." });
    }
    const authorExists = await MemberModel.findById(author);
    if (!authorExists) {
      return response.status(404).json({
        message: "Author not found. Please provide a valid author ID.",
      });
    }

    const imageUrl =
      request.file && request.file.path
        ? process.env.BACKEND_URL + request.file.path.replace(/\\/g, "/")
        : null;

    const newPost = new PostModel({
      title,
      content,
      image: imageUrl,
      type,
      author,
      publishedAt: publishedAt || new Date(),
    });

    const savedPost = await newPost.save();
    await savedPost.populate("author", "name officeName");

    return response
      .status(201)
      .json({ message: "post saved", post: savedPost });
  } catch (error) {
    console.error("Error in createPost:", error);
    return response
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    const posts = await PostModel.find()
      .populate({
        path: "author",
        select: "name office",
        populate: {
          path: "office",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });
    response.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    response
      .status(500)
      .json({ message: "Server error while fetching posts." });
  }
};

export const getPostById = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid  ID format." });
    }
    const post = await PostModel.findById(id);
    return post
      ? response.status(200).json(post)
      : response.status(404).json({ message: "Post not found." });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return response
      .status(500)
      .json({ message: "Server error while fetching post." });
  }
};

export const updatePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, content, type } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid post ID format." });
    }

    const postToUpdate = await PostModel.findById(id);

    let imageToSet;
    if (request.file && request.file.path) {
      imageToSet =
        process.env.BACKEND_URL + request.file.path.replace(/\\/g, "/");
    } else {
      imageToSet = postToUpdate.image;
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { title, content, type, image: imageToSet },
      {
        new: true,
        runValidators: true,
      }
    ).populate("author");

    if (!updatedPost) {
      return response.status(404).json({ message: "Post not found." });
    }

    response.status(200).json(updatedPost);
  } catch (error) {
    if (error.name === "ValidationError") {
      return response
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    console.error("Error updating post:", error);
    response.status(500).json({ message: "Server error while updating post." });
  }
};

export const getPostByAuthor = async (request, response) => {
  return response.status(200).json({ message: "getPostByAuthor" });
};

export const deletePost = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid post ID format." });
    }

    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return response.status(404).json({ message: "Post not found." });
    }

    response
      .status(200)
      .json({ message: "Post deleted successfully.", id: deletedPost.id });
  } catch (error) {
    console.error("Error deleting post:", error);
    response.status(500).json({ message: "Server error while deleting post." });
  }
};
