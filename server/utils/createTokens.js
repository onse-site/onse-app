import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const createToken = (memberId) => {
  let token = jwt.sign({ id: memberId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

export const loginHearders = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};

export const logoutHearders = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  secure: true,
  expires: new Date(0),
};
