import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
    
      galleryDate: {
    type: Date,
    required: true,
  },

    images: [
      {
        url: {
          type: String,
          required: true,
        },


        public_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Gallery", gallerySchema);