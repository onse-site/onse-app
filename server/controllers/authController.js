import bcrypt from "bcrypt";
import { MemberModel } from "../models/Member.js";
import { OfficeModel } from "../models/Office.js";
import {
  createToken,
  loginHearders,
  logoutHearders,
} from "../utils/createTokens.js";
import mongoose from "mongoose";

export const addMember = async (request, response) => {
  try {
    const { email, password, name, phone, officeId, role, avatar } =
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

    const newMember = new MemberModel({
      email,
      password: hashedPassword,
      name,
      phone,
      office: officeId,
      avatar,
      role,
    });
    await newMember.save();

    return response
      .status(201)
      .json({ message: "Member added successfully!", member: newMember });
  } catch (error) {
    console.error("addMember error:", error);
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password, remember } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "email and password are required!" });
    }

    const member = await MemberModel.findOne({ email: email })
      .populate("office")
      .exec();
    if (!member) {
      return response.status(400).json({ message: "user not found!" });
    }
    const validPass = await bcrypt.compare(password, member.password);
    if (validPass) {
      const token = createToken(member.id);
      remember
        ? response
            .status(201)
            .cookie("jwt", token, loginHearders)
            .json({ message: "welcome " + member.name + "!", member })
        : response
            .status(201)
            .cookie("jwt", token, { httpOnly: true })
            .json({ message: "welcome " + member.name + "!", member });
    } else {
      return response.status(400).json({ message: "invalide password!" });
    }
  } catch (error) {
    console.error("login error:", error);
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const session = async (request, response) => {
  try {
    const member = request.member;
    if (!member) {
      return response.status(401).json({ message: "unauthenticate" });
    }
    const { password, ...rest } = member._doc;
    return response.status(200).json({ member: rest });
  } catch (error) {
    console.error("session error:", error);
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const logout = async (request, response) => {
  try {
    return response
      .status(200)
      .cookie("jwt", "", logoutHearders)
      .json({ message: "You have been successfully logged out." });
  } catch (error) {
    console.error("logout error :", error.message);
    response.status(500).json({
      status: "error",
      message: "Something went wrong during logout.",
    });
  }
};

export const updateProfile = async (request, response) => {
  const { id } = request.params;
  const { name, email, password, confirmPassword, about, bio, phone } =
    request.body;

  if (!id) {
    return response.status(400).json({ message: "Member id is required!" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid member ID format." });
  }
  if (password && password !== confirmPassword) {
    return response.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const updateFields = {};

    if (name && name.trim() !== "") {
      updateFields.name = name;
    }
    if (email && email.trim() !== "") {
      updateFields.email = email;
    }
    if (about && about.trim() !== "") {
      updateFields.about = about;
    }
    if (bio && bio.trim() !== "") {
      updateFields.bio = bio;
    }
    if (phone && phone.trim() !== "") {
      updateFields.phone = phone;
    }

    if (request.file && request.file.path) {
      updateFields.avatar =
        process.env.BACKEND_URL + request.file.path.replace(/\\/g, "/");
    }

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    if (Object.keys(updateFields).length === 0) {
      return response.status(400).json({ message: "No fields to update." });
    }

    const updatedMember = await MemberModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).exec();

    if (!updatedMember) {
      return response.status(404).json({ message: "Member not found!" });
    }
    const { password: _, ...rest } = updatedMember._doc;
    return response
      .status(200)
      .json({ message: "Profile updated successfully!", member: rest });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const deleteMember = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ message: "Member id is required!" });
    }

    const deletedMember = await MemberModel.findByIdAndDelete(id).exec();

    if (!deletedMember) {
      return response.status(404).json({ message: "Member not found!" });
    }

    return response
      .status(200)
      .json({ message: "Member deleted successfully!", member: deletedMember });
  } catch (error) {
    console.error("deleteMember error:", error);
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
