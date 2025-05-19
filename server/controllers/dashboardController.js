import { MemberModel } from "../models/Member.js";
import { PostModel } from "../models/Post.js";
import { OfficeModel } from "../models/Office.js";
import { MessageModel } from "../models/Message.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { createToken } from "../utils/createTokens.js";
import { loginHearders } from "../utils/createTokens.js";
import { logoutHearders } from "../utils/createTokens.js";

export const getSatatistics = async (req, res) => {
  try {
    const totalMembers = await MemberModel.countDocuments();
    const totalPosts = await PostModel.countDocuments();

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const newMembers = await MemberModel.countDocuments({
      createdAt: { $gte: lastMonth },
    });
    const newPosts = await PostModel.countDocuments({
      createdAt: { $gte: lastMonth },
    });
    const memberGrowthRate = ((newMembers / totalMembers) * 100).toFixed(2);
    const postGrowthRate = ((newPosts / totalPosts) * 100).toFixed(2);

    res.status(200).json({
      totalMembers,
      totalPosts,
      memberGrowthRate,
      postGrowthRate,
      message: "Statistics fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await MemberModel.find().populate("office");
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
};

export const getAllOffices = (req, res) => {
  OfficeModel.find()
    .then((offices) => {
      res.status(200).json({ offices });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching offices", error });
    });
};

export const getAllMessages = (req, res) => {
  // Assuming you have a MessageModel to fetch messages
  MessageModel.find()
    .then((messages) => {
      res
        .status(200)
        .json({ messages, message: "Messages fetched successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error fetching messages", error });
    });
};

export const addMember = async (request, response) => {
  try {
    const { email, password, name, phone, officeId, role, bio, description } =
      request.body;

    if (!email || !password || !name || !officeId) {
      return response
        .status(400)
        .json({ message: "Credentials are required!" });
    }

    const existingMember = await MemberModel.findOne({ email: email }).exec();
    if (existingMember) {
      return response
        .status(409)
        .json({ message: "Member with this email already exists!" });
    }

    const officeExists = await OfficeModel.findById(officeId).exec();
    if (!officeExists) {
      return response.status(404).json({ message: "Office not found!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let avatar = null;
    if (request.file && request.file.path) {
      avatar = process.env.BACKEND_URL + request.file.path.replace(/\\/g, "/");
    }

    const newMember = new MemberModel({
      email,
      password: hashedPassword,
      name,
      phone,
      office: officeId,
      avatar,
      role,
      bio,
      about: description,
    });
    await newMember.save();

    const { password: _, ...rest } = newMember._doc;
    return response
      .status(201)
      .json({ message: "Member added successfully!", member: rest });
  } catch (error) {
    console.error("addMember error:", error);
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const addOffice = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name and email are required!" });
    }

    let avatar;
    if (req.file && res.file?.path) {
      avatar = process.env.BACKEND_URL + request.file.path.replace(/\\/g, "/");
    }

    const existingOffice = await OfficeModel.findOne({ email: email }).exec();
    if (existingOffice) {
      return res
        .status(409)
        .json({ message: "Office with this email already exists!" });
    }

    const newOffice = new OfficeModel({
      name,
      email,
      phone,
      cover: avatar,
    });

    await newOffice.save();
    res
      .status(201)
      .json({ message: "Office added successfully!", office: newOffice });
  } catch (error) {
    console.error("addOffice error:", error);
    res.status(500).json({ message: "Error adding office", error });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid member ID" });
    }

    const deletedMember = await MemberModel.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
};

export const deleteOffice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid office ID" });
    }

    const deletedOffice = await OfficeModel.findByIdAndDelete(id);

    if (!deletedOffice) {
      return res.status(404).json({ message: "Office not found" });
    }

    res.status(200).json({ message: "Office deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting office", error });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }

    const deletedMessage = await MessageModel.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message", error });
  }
};
