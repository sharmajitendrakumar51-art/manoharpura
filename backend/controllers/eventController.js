import Event from "../models/eventModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";


// ===============================
// Create Event
// ===============================

export const createEvent = async (req, res) => {
    try {

        const {
            title,
            description,
            dateFrom,
            dateTo,
            timeFrom,
            timeTo,
            location,
            category,
            status,
            featured,
        } = req.body;


        console.log("BODY DATA");
console.log({
  title,
  description,
  dateFrom,
  dateTo,
  timeFrom,
  timeTo,
  location,
  category,
  status,
  featured,
});


console.log("BODY :", req.body);
console.log("FILES :", req.files);

        // Validation
        if (
            !title ||
            !description ||
             !dateFrom ||
            !dateTo ||
             !timeFrom ||
            !timeTo ||
            !location
        ) {

           console.log("Validation Failed");

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Cover Image
        if (!req.files?.coverImage) {
            return res.status(400).json({
                success: false,
                message: "Cover image is required",
            });
        }

        const coverUpload = await uploadToCloudinary(
            req.files.coverImage[0].buffer,
            "events"
        );

        // Gallery Images
        const galleryImages = [];

        if (req.files.galleryImages) {

            for (const file of req.files.galleryImages) {

                const uploaded = await uploadToCloudinary(
                    file.buffer,
                    "events"
                );

                galleryImages.push({
                    url: uploaded.url,
                    public_id: uploaded.public_id,
                });

            }

        }

        const event = await Event.create({

    title,
    description,

    coverImage: {
        url: coverUpload.url,
        public_id: coverUpload.public_id,
    },

    galleryImages,

    dateFrom,
    dateTo,

    timeFrom,
    timeTo,

    location,
    category,
    status,
    featured,

});

        res.status(201).json({
            success: true,
            message: "Event Created Successfully",
            event,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



// ===============================
// Get All Events
// ===============================

export const getAllEvents = async (req, res) => {

    try {

        const events = await Event.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: events.length,
            events,
        });

    } catch (error) {

        console.log("Error :", error);

console.log("Response :", error.response);

console.log("Data :", error.response?.data);

console.log("Message :", error.response?.data?.message);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};




// ===============================
// Get Single Event
// ===============================

export const getEventById = async (req, res) => {

    try {

        const event = await Event.findById(req.params.id);

        if (!event) {

            return res.status(404).json({
                success: false,
                message: "Event not found",
            });

        }

        res.status(200).json({
            success: true,
            event,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};




// ===============================
// Update Event
// ===============================

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const {
      title,
      description,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      location,
      category,
      status,
      featured,
    } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
     if (dateFrom) event.dateFrom = dateFrom;
    if (dateTo) event.dateTo = dateTo; 
    if (timeFrom) event.timeFrom = timeFrom;
   if (timeTo) event.timeTo = timeTo;
    if (location) event.location = location;
    if (category) event.category = category;
    if (status) event.status = status;

    if (featured !== undefined) {
      event.featured = featured;
    }

    // Cover Image Update
    if (req.files?.coverImage) {
      const uploaded = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "events"
      );

      event.coverImage = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };
    }

    // Add New Gallery Images
    if (req.files?.galleryImages) {
      for (const file of req.files.galleryImages) {
        const uploaded = await uploadToCloudinary(
          file.buffer,
          "events"
        );

        event.galleryImages.push({
          url: uploaded.url,
          public_id: uploaded.public_id,
        });
      }
    }

    await event.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ===============================
// Delete Event
// ===============================

export const deleteEvent = async (req, res) => {
  try {

    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};