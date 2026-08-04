import Notification from "../models/notificationModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

// ===============================
// Create Notification
// ===============================

export const createNotification = async (req, res) => {

    try {

        const {

            title,
            message,
            notificationDate,
            type,
            status,
            targetAudience,

        } = req.body;

        // Validation

        if (

            !title ||
            !message ||
            !notificationDate

        ) {

            return res.status(400).json({

                success: false,
                message: "Please fill all required fields",

            });

        }

        let attachment = {

            url: "",
            public_id: "",

        };

        // Attachment Upload

        if (req.file) {

            const uploaded = await uploadToCloudinary(

                req.file.buffer,
                "notifications"

            );

            attachment = {

                url: uploaded.url,
                public_id: uploaded.public_id,

            };

        }

        const notification = await Notification.create({

            title,
            message,
            notificationDate,
            type,
            status,
            targetAudience,
            attachment,

        });

        res.status(201).json({

            success: true,
            message: "Notification Created Successfully",
            notification,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};



// ===============================
// Get All Notifications
// ===============================

export const getAllNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find().sort({

            createdAt: -1,

        });

        res.status(200).json({

            success: true,
            count: notifications.length,
            notifications,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};



// ===============================
// Get Single Notification
// ===============================

export const getNotificationById = async (req, res) => {

    try {

        const notification = await Notification.findById(

            req.params.id

        );

        if (!notification) {

            return res.status(404).json({

                success: false,
                message: "Notification not found",

            });

        }

        res.status(200).json({

            success: true,
            notification,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};



// ===============================
// Update Notification
// ===============================

export const updateNotification = async (req, res) => {

    try {

        const { id } = req.params;

        const notification = await Notification.findById(id);

        if (!notification) {

            return res.status(404).json({

                success: false,
                message: "Notification not found",

            });

        }

        const {

            title,
            message,
            notificationDate,
            type,
            status,
            targetAudience,

        } = req.body;

        if (title) notification.title = title;

        if (message) notification.message = message;

        if (notificationDate)
            notification.notificationDate = notificationDate;

        if (type) notification.type = type;

        if (status) notification.status = status;

        if (targetAudience)
            notification.targetAudience = targetAudience;

        // Attachment Update

        if (req.file) {

            const uploaded = await uploadToCloudinary(

                req.file.buffer,
                "notifications"

            );

            notification.attachment = {

                url: uploaded.url,
                public_id: uploaded.public_id,

            };

        }

        await notification.save();

        res.status(200).json({

            success: true,
            message: "Notification Updated Successfully",
            notification,

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};



// ===============================
// Delete Notification
// ===============================

export const deleteNotification = async (req, res) => {

    try {

        const { id } = req.params;

        const notification = await Notification.findById(id);

        if (!notification) {

            return res.status(404).json({

                success: false,
                message: "Notification not found",

            });

        }

        await Notification.findByIdAndDelete(id);

        res.status(200).json({

            success: true,
            message: "Notification Deleted Successfully",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};