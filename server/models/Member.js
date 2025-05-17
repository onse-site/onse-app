import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://i.pinimg.com/564x/3d/26/02/3d2602e1b11f161f7366c70b06fab7ed.jpg",
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    office: {
      type: Schema.Types.ObjectId,
      ref: "Office",
    },
    role: {
      type: String,
      required: true,
      default: "OM",
    },
    about: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

MemberSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const MemberModel = model("Member", MemberSchema);

/* roles=["US","OM","OP","SG","AD"] */
/**
 * US : User
 * OM : Office Member
 * OP : Office Prisident
 * SG : Secritary General
 * AD : Admin
 */
