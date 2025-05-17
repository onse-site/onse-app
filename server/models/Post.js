import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

PostSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const PostModel = model("Post", PostSchema);
