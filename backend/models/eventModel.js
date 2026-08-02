import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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

    coverImage: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    galleryImages: [
      {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
    ],

   dateFrom: {
  type: Date,
  required: true,
},

dateTo: {
  type: Date,
  required: true,
},

timeFrom: {
  type: String,
  required: true,
},

timeTo: {
  type: String,
  required: true,
},
    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Religious",
        "Meeting",
        "Festival",
        "Construction",
        "Social",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Completed",
      ],
      default: "Upcoming",
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

export default mongoose.model("Event", eventSchema);