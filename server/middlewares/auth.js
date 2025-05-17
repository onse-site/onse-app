import jwt from "jsonwebtoken";
import { MemberModel } from "../models/Member.js";

export const authenticate = async (request, response, next) => {
  const token = request.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const memberId = decoded.id;
      request.member = await MemberModel.findById(memberId)
        .populate("office")
        .exec();
      next();
    } catch (error) {
      console.log("authenticate error:", error.message);
      response.status(401).json({ message: "token faild!" });
    }
  } else {
    response.status(401).json({ message: "member not authenticated!" });
  }
};

export const authorize = async (request, response, next) => {
  const token = request.cookies.jwt || undefined;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const memberId = decoded.id;
      const member = await MemberModel.findById(memberId);
      member.role === "OP"
        ? next()
        : member.role === "AD"
        ? next()
        : response.status(401).json({ message: "Unauthorized member!" });
    } catch (error) {
      console.log("authorize error:", error);
      response.status(401).json({ message: "Unauthorize member!" });
    }
  } else {
    console.log("authorize error: token Not Found!");
    response.status(401).json({ message: "member Not Authorized!" });
  }
};
