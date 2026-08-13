import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    // ==========================
    // Small Heading
    // ==========================
    smallHeading: {
      type: String,
      trim: true,
      default: "",
    },

    // ==========================
    // Main Title
    // ==========================
    title: {
      type: String,
    // required: true,
      trim: true,
      default: "",
    },

    // ==========================
    // Description
    // ==========================
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // ==========================
    // Hero Image
    // ==========================
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

    // ==========================
    // Display Order
    // ==========================
    order: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Status
    // ==========================
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Hero", heroSchema);