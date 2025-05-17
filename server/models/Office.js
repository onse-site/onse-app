import mongoose from "mongoose";
const { Schema, model } = mongoose;

const OfficeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: false,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2FONSE21%2F&psig=AOvVaw2LRipCX1RCKv0RNKM6CP8X&ust=1747409954286000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKDl59PnpY0DFQAAAAAdAAAAABAE",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

OfficeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const OfficeModel = model("Office", OfficeSchema);

/* OfficeModel.findById(officeId)
  .populate('members')
  .then(office => {
    console.log(office);
  })
  .catch(err => {
    console.error(err);
  }); */
