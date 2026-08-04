import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    newsDate: {
      type: Date,
      required: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Search Index
newsSchema.index({
  title: "text",
  description: "text",
});

export default mongoose.model("News", newsSchema);