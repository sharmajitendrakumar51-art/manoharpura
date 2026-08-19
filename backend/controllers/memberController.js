import Member from "../models/Member.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const addMember = async (req, res) => {
  try {

    console.log("========== ADD MEMBER API ==========");

    console.log("Body:", req.body);

    console.log("Files:", req.files);



    // ==========================

    // Form Data

    // ==========================

   const {

  title,

  fullName,

  fatherName,

  nickName,

  gender,

  dob,

  caste,

  category,

  maritalStatus,

  occupation,



  mobile,

  whatsapp,

  email,

  aadhaar,

  pan,

  janAadhaar,



  permanentAddress,

  correspondenceAddress,



  membershipType,

  isExecutiveCommittee,

  designation,

  validFrom,

  validTo,

} = req.body;

    // ==========================

    // Files

    // ==========================



    const profilePhotoFile = req.files?.profilePhoto?.[0];

    const aadhaarFrontFile = req.files?.aadhaarFront?.[0];

    const aadhaarBackFile = req.files?.aadhaarBack?.[0];

    const janAadhaarCardFile = req.files?.janAadhaarCard?.[0];

    const panCardFile = req.files?.panCard?.[0];



    // ==========================

    // Upload Images

    // ==========================



    const profilePhoto = profilePhotoFile

      ? await uploadToCloudinary(

          profilePhotoFile.buffer,

          "members/profilePhoto"

        )

      : null;
      console.log("PROFILE PHOTO:", profilePhoto);



    const aadhaarFront = aadhaarFrontFile

      ? await uploadToCloudinary(

          aadhaarFrontFile.buffer,

          "members/aadhaar"

        )

      : null;



    const aadhaarBack = aadhaarBackFile

      ? await uploadToCloudinary(

          aadhaarBackFile.buffer,

          "members/aadhaar"

        )

      : null;



    const janAadhaarCard = janAadhaarCardFile

      ? await uploadToCloudinary(

          janAadhaarCardFile.buffer,

          "members/janAadhaar"

        )

      : null;



    const panCard = panCardFile

      ? await uploadToCloudinary(

          panCardFile.buffer,

          "members/panCard"

        )

      : null;





// ==========================

// Generate Membership Number

// ==========================



const lastMember = await Member.findOne().sort({ createdAt: -1 });



let membershipNo = "MMVS001";



if (lastMember && lastMember.membershipNo) {

  const lastNumber = parseInt(

    lastMember.membershipNo.replace("MMVS", ""),

    10

  );



  membershipNo = `MMVS${String(lastNumber + 1).padStart(3, "0")}`;

}



console.log("Generated Membership No:", membershipNo);



// ==========================

// Save Member

// ==========================



const member = await Member.create({

  title,

  fullName,

  fatherName,

  nickName,

  gender,

  dob,

  caste,

  category,

  maritalStatus,

  occupation,



  mobile,

  whatsapp,

  email,

  aadhaar,

  pan,

  janAadhaar,



  permanentAddress,

  correspondenceAddress,



  membershipType,

  isExecutiveCommittee:

    isExecutiveCommittee === "true" || isExecutiveCommittee === true,



  designation,



  

  membershipNo,



  validFrom,

  validTo,



  profilePhoto,

  aadhaarFront,

  aadhaarBack,

  janAadhaarCard,

  panCard,

});





    return res.status(201).json({

      success: true,

      message: "Member Added Successfully",

      member,

    });

    return res.status(201).json({
      success: true,
      message: "Member Added Successfully",
      member,
    });

  } catch (error) {

    console.log("========== ADD MEMBER ERROR ==========");
    console.log(error);
    console.log(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });

  }
};

export const getInactiveMembers = async (req, res) => {
  try {

    const members = await Member.find({
      status: "Inactive",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      members,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get All Members
// ==========================
export const getMembers = async (req, res) => {
  try {

    const members = await Member.find({
      status: "Active",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch members",
    });

  }
};

// ==========================
// Get Single Member
// ==========================
export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });

  } catch (error) {
    console.error("Get Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch member",
      error: error.message,
    });
  }
};

// ==========================
// Get Member By Email
// ==========================

export const getMemberByEmail = async (req, res) => {

    try {

        const { email } = req.params;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required",
            });

        }

        const member = await Member.findOne({
            email: email.toLowerCase().trim(),
        });

        if (!member) {

            return res.status(404).json({
                success: false,
                message: "Member profile not found",
            });

        }

        return res.status(200).json({

            success: true,

            member,

        });

    } catch (error) {

        console.error(
            "GET MEMBER BY EMAIL ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

            error: error.message,

        });

    }

};

// ==========================
// Update Member
// ==========================
export const updateMember = async (req, res) => {
  try {

    console.log("=================================");
    console.log("UPDATE MEMBER API HIT");
    console.log("=================================");

    console.log("MEMBER ID:", req.params.id);

    console.log("BODY =>", req.body);

    console.log("FILES =>", req.files);


    const { id } = req.params;


    // ==========================
    // Find Member
    // ==========================

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }


    // ==========================
    // Status Conversion
    // ==========================

    if (req.body.status === "true") {
      req.body.status = "Active";
    }

    if (req.body.status === "false") {
      req.body.status = "Inactive";
    }


    // ==========================
    // Update Text Fields
    // ==========================

    Object.keys(req.body).forEach((key) => {

      // Don't overwrite files
      if (
        key === "profilePhoto" ||
        key === "aadhaarFront" ||
        key === "aadhaarBack" ||
        key === "janAadhaarCard" ||
        key === "panCard"
      ) {
        return;
      }


      // Convert null/empty values
      if (
        req.body[key] === "null" ||
        req.body[key] === "" ||
        req.body[key] === undefined
      ) {

        member[key] = null;

      } else {

        member[key] = req.body[key];

      }

    });


    // ==========================
    // Upload Image Helper
    // ==========================

    const uploadImage = async (fieldName, folder) => {

      // Check file
      if (!req.files?.[fieldName]?.[0]) {
        console.log(`No new ${fieldName} selected`);
        return;
      }


      const file = req.files[fieldName][0];


      console.log(`Uploading ${fieldName}:`);

      console.log({
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });


      // ==========================
      // Upload To Cloudinary
      // ==========================

      const result = await uploadToCloudinary(
        file.buffer,
        folder
      );


      console.log(
        `${fieldName} Cloudinary URL:`,
        result.secure_url
      );


      console.log(
        `${fieldName} Cloudinary ID:`,
        result.public_id
      );


      // ==========================
      // Replace Old Image
      // ==========================

     member[fieldName] = {
  url: result.url,
  public_id: result.public_id,
};

    };


    // ==========================
    // Upload New Images
    // ==========================

    await uploadImage(
      "profilePhoto",
      "members/profilePhoto"
    );


    await uploadImage(
      "aadhaarFront",
      "members/aadhaar"
    );


    await uploadImage(
      "aadhaarBack",
      "members/aadhaar"
    );


    await uploadImage(
      "janAadhaarCard",
      "members/janAadhaar"
    );


    await uploadImage(
      "panCard",
      "members/panCard"
    );


    // ==========================
    // Save Member
    // ==========================

    await member.save();


    console.log(
      "UPDATED PROFILE PHOTO =>",
      member.profilePhoto
    );


    // ==========================
    // Response
    // ==========================

    return res.status(200).json({

      success: true,

      message: "Member updated successfully",

      member,

    });


  } catch (error) {

    console.error(
      "Update Member Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message: "Failed to update member",

      error: error.message,

    });

  }
};
// ==========================
// Delete Member
// ==========================
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    await Member.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });

  } catch (error) {
    console.error("Delete Member Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete member",
      error: error.message,
    });
  }
};


export const updateMemberStatus = async (req, res) => {
  try {

    const { id } = req.params;

    const { status, inactiveRemark } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.status = status;

    if (status === "Inactive") {

      member.inactiveRemark = inactiveRemark;

      member.inactiveDate = new Date();

    } else {

      member.inactiveRemark = "";

      member.inactiveDate = null;

    }

    await member.save();

    res.status(200).json({
      success: true,
      message: "Member status updated successfully",
      member,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });

  }
};

// ==========================
// getDashboardCounts
// ==========================
export const getDashboardCounts = async (req, res) => {
  try {

    const totalMembers = await Member.countDocuments();

    const activeMembers = await Member.countDocuments({
      status: "Active",
    });

    const inactiveMembers = await Member.countDocuments({
      status: "Inactive",
    });

    const executiveMembers = await Member.countDocuments({
      isExecutiveCommittee: true,
    });

    res.status(200).json({
      success: true,
      totalMembers,
      activeMembers,
      inactiveMembers,
      executiveMembers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================
// getRecentMembers 
// ==========================
export const getRecentMembers = async (req, res) => {
  try {

    const members = await Member.find({
      status: "Active",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      members,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};