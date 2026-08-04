import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/Notification.css";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const [filteredNotifications, setFilteredNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");


    // ==========================
// Get Notifications
// ==========================

const getNotifications = async () => {

    try{

        setLoading(true);

        const res = await api.get("/notification");

        if(res.data.success){

            setNotifications(res.data.notifications);

            setFilteredNotifications(res.data.notifications);

        }

    }catch(error){

        console.log(error);

        Swal.fire({

            icon:"error",

            title:"Error",

            text:
            error.response?.data?.message ||
            "Unable to fetch notifications"

        });

    }finally{

        setLoading(false);

    }

};

useEffect(()=>{

    getNotifications();

},[]);


const deleteNotification = async(id)=>{

    const result = await Swal.fire({

        title:"Delete Notification?",

        text:"You won't be able to recover it.",

        icon:"warning",

        showCancelButton:true,

        confirmButtonText:"Delete",

    });

    if(!result.isConfirmed) return;

    try{

        const res = await api.delete(

            `/notification/delete/${id}`

        );

        if(res.data.success){

            Swal.fire(

                "Deleted!",

                "Notification deleted successfully.",

                "success"

            );

            getNotifications();

        }

    }catch(error){

        Swal.fire(

            "Error",

            error.response?.data?.message ||

            "Unable to delete notification",

            "error"

        );

    }

};

const formatDate=(date)=>{

    return new Date(date).toLocaleDateString(

        "en-IN",

        {

            day:"2-digit",

            month:"short",

            year:"numeric",

        }

    );

};

return (

<div className="container-fluid py-4 notification-page">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4 notification-header">

        <div>

            <h2 className="notification-title">

                Notifications

            </h2>

        </div>

        <Link
            to="/notifications/add"
            className="btn btn-primary px-4 add-notification-btn"
        >

            + Add Notification

        </Link>

    </div>

    {/* Search */}

    <div className="card shadow-sm border-0 mb-4 search-card">

        <div className="card-body">

            <input
                type="text"
                className="form-control search-input"
                placeholder="Search Notification..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Cards */}

    {loading ? (

        <div className="text-center py-5">

            <div className="spinner-border text-primary"></div>

        </div>

    ) : filteredNotifications.length===0 ? (

        <div className="alert alert-warning text-center">

            No Notifications Found

        </div>

    ) : (

        <div className="row">

            {filteredNotifications.map((item)=>(

                <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={item._id}
                >

                    <div className="card h-100 shadow border-0 notification-card">

                        <div className="card-body">

                            {/* Top */}

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span
                                    className={`type-badge ${
                                        item.type.toLowerCase()
                                    }`}
                                >

                                    {item.type}

                                </span>

                                <span
                                    className={`status-badge ${
                                        item.status==="Active"
                                        ? "active-badge"
                                        : "inactive-badge"
                                    }`}
                                >

                                    {item.status}

                                </span>

                            </div>

                            {/* Title */}

                            <h5 className="notification-name">

                                {item.title}

                            </h5>

                            {/* Date */}

                            <p className="text-muted mb-2">

                                📅 {formatDate(item.notificationDate)}

                            </p>

                            {/* Audience */}

                            <p className="mb-2">

                                👥 {item.targetAudience}

                            </p>

                            {/* Attachment */}

                            {item.attachment?.url && (

                                <p className="mb-2 text-success">

                                    📎 Attachment Available

                                </p>

                            )}

                            {/* Message */}

                            <p
                                className="text-muted"
                                style={{
                                    minHeight:"80px"
                                }}
                            >

                                {item.message.length>120
                                ? item.message.substring(0,120)+"..."
                                : item.message}

                            </p>

                        </div>

                        {/* Footer */}

                        <div className="card-footer bg-white border-0 notification-footer">

                            <div className="d-flex justify-content-between">

                                <Link
                                    to={`/notifications/view/${item._id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >

                                    👁 View

                                </Link>

                                <Link
                                    to={`/notifications/edit/${item._id}`}
                                    className="btn btn-outline-warning btn-sm"
                                >

                                    ✏ Edit

                                </Link>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={()=>
                                        deleteNotification(item._id)
                                    }
                                >

                                    🗑 Delete

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>

);

};

export default Notifications;