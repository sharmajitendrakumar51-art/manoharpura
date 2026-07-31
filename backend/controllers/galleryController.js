import Gallery from "../models/galleryModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

// Create Gallery
export const createGallery = async (req, res) => {
  try {

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Gallery title is required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    const images = [];

    for (const file of req.files) {

      const uploaded = await uploadToCloudinary(
        file.buffer,
        "gallery"
      );

      images.push({
  url: uploaded.url,
  public_id: uploaded.public_id,
});

    }

    const gallery = await Gallery.create({
      title,
      description,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Gallery Created Successfully",
      gallery,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ==========================
// Get All Gallery
// ==========================

export const getAllGallery = async (req, res) => {
  try {

    const galleries = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: galleries.length,
      galleries,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get Single Gallery
// ==========================

export const getGalleryById = async (req, res) => {
  try {

    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      gallery,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Update Gallery
// ==========================

export const updateGallery = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, description } = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    if (title) gallery.title = title;
    if (description) gallery.description = description;

    // Agar new images upload hui hain
    if (req.files && req.files.length > 0) {

//       const images = [];

//       for (const file of req.files) {

//         const uploaded = await uploadToCloudinary(
//           file.buffer,
//           "gallery"
//         );

//         images.push({
//   url: uploaded.url,
//   public_id: uploaded.public_id,
// });
//       }

     if (req.files && req.files.length > 0) {

    for (const file of req.files) {

        const uploaded = await uploadToCloudinary(
            file.buffer,
            "gallery"
        );

        gallery.images.push({
            url: uploaded.url,
            public_id: uploaded.public_id,
        });

    }

}
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      gallery,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Delete Gallery
// ==========================

export const deleteGallery = async (req, res) => {
  try {

    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    // Future me yahan Cloudinary se images bhi delete karenge

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteSingleImage = async (req, res) => {
  try {

    const { galleryId, imageId } = req.params;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    const image = gallery.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Cloudinary se delete
    await cloudinary.uploader.destroy(image.public_id);

    // MongoDB se delete
    gallery.images.pull(imageId);

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      gallery,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};