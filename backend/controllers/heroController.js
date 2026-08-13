import Hero from "../models/heroModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

// ===============================
// Create Hero
// ===============================

export const createHero = async (req, res) => {
  try {
    const {
      smallHeading,
      title,
      description,
      order,
      status,
    } = req.body;

    console.log("HERO BODY:", req.body);
    console.log("HERO FILE:", req.file);

    // ==========================
    // Validation
    // ==========================

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // ==========================
    // Image Required
    // ==========================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hero image is required",
      });
    }

    // ==========================
    // Upload Image
    // ==========================

    const uploaded = await uploadToCloudinary(
      req.file.buffer,
      "hero"
    );

    // ==========================
    // Create Hero
    // ==========================

    const hero = await Hero.create({
      smallHeading,
      title,
      description,

      image: {
        url: uploaded.url,
        public_id: uploaded.public_id,
      },

      order: order || 0,
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Hero created successfully",
      hero,
    });

  } catch (error) {
    console.log("Create Hero Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Get All Heroes
// ===============================

export const getAllHeroes = async (req, res) => {
  try {

    const heroes = await Hero.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: heroes.length,
      heroes,
    });

  } catch (error) {

    console.log("Get Heroes Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Get Active Heroes
// ===============================

export const getActiveHeroes = async (req, res) => {
  try {

    const heroes = await Hero.find({
      status: "Active",
    }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      count: heroes.length,
      heroes,
    });

  } catch (error) {

    console.log("Get Active Heroes Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Get Single Hero
// ===============================

export const getHeroById = async (req, res) => {
  try {

    const { id } = req.params;

    const hero = await Hero.findById(id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    res.status(200).json({
      success: true,
      hero,
    });

  } catch (error) {

    console.log("Get Hero Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Update Hero
// ===============================

export const updateHero = async (req, res) => {
  try {

    const { id } = req.params;

    const hero = await Hero.findById(id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    const {
      smallHeading,
      title,
      description,
      order,
      status,
    } = req.body;

    // ==========================
    // Update Text Fields
    // ==========================

    if (smallHeading !== undefined) {
      hero.smallHeading = smallHeading;
    }

    if (title !== undefined) {
      hero.title = title;
    }

    if (description !== undefined) {
      hero.description = description;
    }

    if (order !== undefined && order !== "") {
      hero.order = Number(order);
    }

    if (status !== undefined) {
      hero.status = status;
    }

    // ==========================
    // Update Image
    // ==========================

    if (req.file) {

      // Delete old image from Cloudinary
      if (hero.image?.public_id) {

        try {
          await cloudinary.uploader.destroy(
            hero.image.public_id
          );
        } catch (cloudinaryError) {

          console.log(
            "Old Hero Image Delete Error:",
            cloudinaryError
          );

        }
      }

      // Upload new image
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "hero"
      );

      hero.image = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };
    }

    await hero.save();

    res.status(200).json({
      success: true,
      message: "Hero updated successfully",
      hero,
    });

  } catch (error) {

    console.log("Update Hero Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ===============================
// Delete Hero
// ===============================

export const deleteHero = async (req, res) => {
  try {

    const { id } = req.params;

    const hero = await Hero.findById(id);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Hero not found",
      });
    }

    // ==========================
    // Delete Image From Cloudinary
    // ==========================

    if (hero.image?.public_id) {

      try {

        await cloudinary.uploader.destroy(
          hero.image.public_id
        );

      } catch (cloudinaryError) {

        console.log(
          "Cloudinary Delete Error:",
          cloudinaryError
        );

      }
    }

    // ==========================
    // Delete From MongoDB
    // ==========================

    await Hero.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Hero deleted successfully",
    });

  } catch (error) {

    console.log("Delete Hero Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};