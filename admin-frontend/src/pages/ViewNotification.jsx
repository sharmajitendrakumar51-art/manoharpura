import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/ViewNotification.css";

const ViewNotification = () => {

    const { id } = useParams();

    const [notification, setNotification] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================
    // Get Single Notification
    // ==========================

    const getNotification = async () => {

        try {

            setLoading(true);

            const res = await api.get(`/notification/${id}`);

            if (res.data.success) {

                setNotification(res.data.notification);

            }

        } catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text:
                    error.response?.data?.message ||
                    "Unable to fetch notification",

            });

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getNotification();

    }, []);

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div className="spinner-border text-primary"></div>

            </div>

        );

    }

    if (!notification) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">

                    Notification not found.

                </div>

            </div>

        );

    }

    return (

        <div className="container py-4 view-notification-page">

            {/* Header */}

            <div className="view-notification-header">

                <h2>

                    View Notification

                </h2>

                <Link
                    to="/notifications"
                    className="btn btn-secondary"
                >

                    ← Back

                </Link>

            </div>

            {/* Details */}

            <div className="card notification-details">

                <div className="card-body">

                    <h2 className="notification-title">

                        {notification.title}

                    </h2>

                    <hr />

                    <div className="row">

                        {/* Date */}

                        <div className="col-md-6 mb-4">

                            <div className="info-box">

                                <h6>

                                    📅 Notification Date

                                </h6>

                                <p>

                                    {new Date(
                                        notification.notificationDate
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}

                                </p>

                            </div>

                        </div>

                        {/* Type */}

                        <div className="col-md-6 mb-4">

                            <div className="info-box">

                                <h6>

                                    📢 Type

                                </h6>

                                <span
                                    className={`type-badge ${notification.type.toLowerCase()}`}
                                >

                                    {notification.type}

                                </span>

                            </div>

                        </div>

                        {/* Status */}

                        <div className="col-md-6 mb-4">

                            <div className="info-box">

                                <h6>

                                    Status

                                </h6>

                                <span
                                    className={`status-badge ${
                                        notification.status === "Active"
                                            ? "active-badge"
                                            : "inactive-badge"
                                    }`}
                                >

                                    {notification.status}

                                </span>

                            </div>

                        </div>

                        {/* Audience */}

                        <div className="col-md-6 mb-4">

                            <div className="info-box">

                                <h6>

                                    👥 Target Audience

                                </h6>

                                <p>

                                    {notification.targetAudience}

                                </p>

                            </div>

                        </div>

                    </div>

                    <hr />

                    {/* Message */}

                    <h5 className="fw-bold mb-3">

                        Message

                    </h5>

                    <p className="notification-message">

                        {notification.message}

                    </p>

                    {/* Attachment */}

                    {notification.attachment?.url && (

                        <>

                            <hr />

                            <h5 className="fw-bold mb-3">

                                Attachment

                            </h5>

                            <a

                                href={notification.attachment.url}

                                target="_blank"

                                rel="noreferrer"

                                className="btn btn-outline-primary"

                            >

                                📎 View Attachment

                            </a>

                        </>

                    )}

                </div>

            </div>

            {/* Buttons */}

            <div className="view-notification-buttons">

                <Link
                    to="/notifications"
                    className="btn btn-secondary"
                >

                    ← Back to Notifications

                </Link>

                <Link
                    to={`/notifications/edit/${notification._id}`}
                    className="btn btn-warning"
                >

                    ✏ Edit Notification

                </Link>

            </div>

        </div>

    );

};

export default ViewNotification;