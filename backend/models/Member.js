import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    // ==========================
    // Personal Information
    // ==========================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
  type: String,
  required: true,
  trim: true,
},

    nickName: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    dob: {
  type: Date,
  required: true,
},

 category: {
    type: String,
    enum: ["General","EWS","SC","ST","OBC","MBC"]
},
    occupation: {
      type: String,
      trim: true,
    },

    caste: {
      type: String,
      trim: true,
    },
    maritalStatus: {
  type: String,
  enum: ["Married", "Unmarried", "Other"],
},

    // ==========================
    // Contact Information
    // ==========================

    mobile: {
  type: String,
  required: true,
  unique: true,
  trim: true,
},


   whatsapp: {
  type: String,
  trim: true,
},

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    aadhaar: {
  type: String,
  trim: true,
},

    pan: {
  type: String,
  trim: true,
},

    janAadhaar: {
      type: String,
      trim: true,
    },

    // ==========================
    // Address
    // ==========================

    permanentAddress: {
      type: String,
      required: true,
    },

    correspondenceAddress: {
      type: String,
    },

    // ==========================
    // Membership Information
    // ==========================

    membershipType: {
      type: String,
      required: true,
    },

   isExecutiveCommittee: {
  type: Boolean,
  default: false,
},

    designation: {
  type: String,
  enum: [
    "Patron",
    "President",
    "Vice President",
    "Secretary",
    "Joint Secretary",
    "Treasurer",
    "Co Treasurer",
    "Organisation Secretary",
    "Public Relation Officer",
    "Executive Member",
  ],
},

    membershipNo: {
  type: String,
  unique: true,
},

    validFrom: {
      type: Date,
    },

    validTo: {
      type: Date,
    },

    // ==========================
    // Documents
    // ==========================

    profilePhoto: {
      url: String,
      public_id: String,
    },

    aadhaarFront: {
      url: String,
      public_id: String,
    },

    aadhaarBack: {
      url: String,
      public_id: String,
    },

    janAadhaarCard: {
  url: String,
  public_id: String,
},

panCard: {
  url: String,
  public_id: String,
},

    status: {
  type: String,
  enum: ["Active", "Inactive"],
  default: "Active",
},
inactiveRemark: {
  type: String,
  default: "",
  trim: true,
},

inactiveDate: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }

);
// JSON Response Settings
memberSchema.set("toJSON", {
  virtuals: true,
});

// Search Index
memberSchema.index({
  fullName: "text",
  mobile: "text",
});

const Member = mongoose.model("Member", memberSchema);

export default Member;