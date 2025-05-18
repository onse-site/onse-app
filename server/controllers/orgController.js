import { MemberModel } from "../models/Member.js";
import { OfficeModel } from "../models/Office.js";
import { PostModel } from "../models/Post.js";

export const getSGdata = async (request, response) => {
  try {
    const info = await MemberModel.findOne({ role: "SG" }).exec();
    if (!info) {
      return response.status(404).json({ message: "No SG found!" });
    }
    const posts = await PostModel.find({ author: info._id })
      .populate("author", "_id name avatar role")
      .lean();

    const { password: _, ...rest } = info._doc;
    return response.status(200).json({ info: rest, posts });
  } catch (error) {
    console.error("Error fetching data:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const getNOdata = async (request, response) => {
  try {
    const office = await OfficeModel.findOne({ name: "المكتب الوطني" }).exec();
    if (!office) {
      return response.status(404).json({ message: "No office found!" });
    }

    const members = await MemberModel.find({ office: office._id })
      .select("-password")
      .lean();

    if (!members.length) {
      return response.status(404).json({ message: "No members found!" });
    }

    const postQueries = members.map((member) =>
      PostModel.find({ author: member._id })
        .populate({
          path: "author",
          select: "_id name office role",
          populate: {
            path: "office",
            select: "name cover",
          },
        })
        .lean()
    );
    const postResults = await Promise.all(postQueries);
    const posts = postResults.flat();

    return response.status(200).json({ members, posts });
  } catch (error) {
    console.error("Error fetching data:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPOdata = async (request, response) => {
  try {
    const offices = await OfficeModel.find().exec();
    if (!offices || offices.length === 0) {
      return response.status(404).json({ message: "No offices found!" });
    }
    response.status(200).json({ offices });
  } catch (error) {
    console.error("Error fetching data:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const getPOdata = async (request, response) => {
  const { id } = request.params;

  try {
    const office = await OfficeModel.findById(id).exec();
    if (!office) {
      return response.status(404).json({ message: "No office found!" });
    }

    const members = await MemberModel.find({ office: office._id })
      .select("-password")
      .lean();

    const postQueries = members?.map((member) =>
      PostModel.find({ author: member._id })
        .populate({
          path: "author",
          select: "_id name office role",
          populate: {
            path: "office",
            select: "name cover",
          },
        })
        .lean()
    );
    const postResults = await Promise.all(postQueries);
    const posts = postResults.flat();

    return response.status(200).json({ office, members, posts });
  } catch (error) {
    console.error("Error fetching data:", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};
