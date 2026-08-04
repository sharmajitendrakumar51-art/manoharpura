import News from "../models/newsModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";


export const createNews = async (req, res) => {
  try {
    const {
      title,
      description,
      newsDate,
      status,
      featured,
    } = req.body;

    // Validation
    if (!title || !description || !newsDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Image Required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "News image is required",
      });
    }

    const uploaded = await uploadToCloudinary(
      req.file.buffer,
      "news"
    );

    const news = await News.create({
      title,
      description,
      newsDate,

      image: {
        url: uploaded.url,
        public_id: uploaded.public_id,
      },

      status,
      featured,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully",
      news,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getAllNews = async (req, res) => {

  try {

    const news = await News.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: news.length,
      news,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const getNewsById = async (req, res) => {

  try {

    const news = await News.findById(req.params.id);

    if (!news) {

      return res.status(404).json({
        success: false,
        message: "News not found",
      });

    }

    res.status(200).json({
      success: true,
      news,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const updateNews = async (req, res) => {

  try {

    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {

      return res.status(404).json({
        success: false,
        message: "News not found",
      });

    }

    const {
      title,
      description,
      newsDate,
      status,
      featured,
    } = req.body;

    if (title) news.title = title;

    if (description) news.description = description;

    if (newsDate) news.newsDate = newsDate;

    if (status) news.status = status;

    if (featured !== undefined) {
      news.featured = featured;
    }

    // Image Update
    if (req.file) {

      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "news"
      );

      news.image = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };

    }

    await news.save();

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      news,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const deleteNews = async (req, res) => {

  try {

    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {

      return res.status(404).json({
        success: false,
        message: "News not found",
      });

    }

    await News.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "News deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};