import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
//import "../assets/css/AddNotification.css";

const AddNotification = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [message, setMessage] = useState("");

    const [notificationDate, setNotificationDate] = useState("");

    const [type, setType] = useState("Info");

    const [status, setStatus] = useState("Active");

    const [targetAudience, setTargetAudience] = useState("All Members");

    const [attachment, setAttachment] = useState(null);

    const [preview, setPreview] = useState("");

    // ==========================
// Attachment Change
// ==========================

const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setAttachment(file);

    if (file.type.startsWith("image")) {

        setPreview(URL.createObjectURL(file));

    } else {

        setPreview("");

    }

};

// ==========================
// Submit
// ==========================

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("title", title);

        formData.append("message", message);

        formData.append("notificationDate", notificationDate);

        formData.append("type", type);

        formData.append("status", status);

        formData.append("targetAudience", targetAudience);

        if (attachment) {

            formData.append("attachment", attachment);

        }

        const res = await api.post(

            "/notification/create",

            formData

        );

        if (res.data.success) {

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Notification Created Successfully",

            });

            navigate("/notifications");

        }

    } catch (error) {

        console.log(error);

        Swal.fire({

            icon: "error",

            title: "Error",

            text:
                error.response?.data?.message ||
                "Something went wrong",

        });

    }

};

return (

<div className="container mt-4">

    <div className="card shadow">

        <div className="card-header bg-primary text-white">

            <h3>Add Notification</h3>

        </div>

        <div className="card-body">

            <form onSubmit={handleSubmit}>

                {/* Notification Title */}

                <div className="mb-3">

                    <label className="form-label">

                        Notification Title

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Notification Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                    />

                </div>

                {/* Message */}

                <div className="mb-3">

                    <label className="form-label">

                        Message

                    </label>

                    <textarea
                        rows="5"
                        className="form-control"
                        placeholder="Write Notification Message..."
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        required
                    />

                </div>

                <div className="row">

                    {/* Date */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Notification Date

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={notificationDate}
                            onChange={(e)=>setNotificationDate(e.target.value)}
                            required
                        />

                    </div>

                    {/* Type */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Notification Type

                        </label>

                        <select
                            className="form-select"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                        >

                            <option value="Info">ℹ️ Info</option>

                            <option value="Success">✅ Success</option>

                            <option value="Warning">⚠️ Warning</option>

                            <option value="Urgent">🚨 Urgent</option>

                        </select>

                    </div>

                </div>

                <div className="row">

                    {/* Status */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Status

                        </label>

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e)=>setStatus(e.target.value)}
                        >

                            <option value="Active">

                                Active

                            </option>

                            <option value="Inactive">

                                Inactive

                            </option>

                        </select>

                    </div>

                    {/* Audience */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            Send To

                        </label>

                        <select
                            className="form-select"
                            value={targetAudience}
                            onChange={(e)=>setTargetAudience(e.target.value)}
                        >

                            <option value="All Members">

                                All Members

                            </option>

                            <option value="Executive Committee">

                                Executive Committee

                            </option>

                        </select>

                    </div>

                </div>

                {/* Attachment */}

                <div className="mb-3">

                    <label className="form-label">

                        Attachment (Optional)

                    </label>

                    <input
                        type="file"
                        className="form-control"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />

                </div>

                {/* Image Preview */}

                {preview && (

                    <div className="mb-4 text-center">

                        <img
                            src={preview}
                            alt=""
                            className="img-fluid rounded shadow"
                            style={{
                                maxHeight:"280px",
                                objectFit:"cover"
                            }}
                        />

                    </div>

                )}

                {/* Buttons */}

                <div className="d-flex gap-2">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={()=>navigate("/notifications")}
                    >

                        <i className="bi bi-arrow-left me-2"></i>

                        Back

                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >

                        <i className="bi bi-bell-fill me-2"></i>

                        Save Notification

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

);

};

export default AddNotification;