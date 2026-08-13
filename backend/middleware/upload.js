import multer from "multer";

// Store files in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (req, file, cb) => {

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP files are allowed."
        ),
        false
      );

    }
  },
});

export default upload;