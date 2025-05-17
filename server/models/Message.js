import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

MessageSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const MessageModel = model("Message", MessageSchema);
