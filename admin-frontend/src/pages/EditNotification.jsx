import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/EditNotification.css";

const EditNotification = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [message, setMessage] = useState("");

    const [notificationDate, setNotificationDate] = useState("");

    const [type, setType] = useState("Info");

    const [status, setStatus] = useState("Active");

    const [targetAudience, setTargetAudience] = useState("All Members");

    const [oldAttachment, setOldAttachment] = useState("");

    const [attachment, setAttachment] = useState(null);

    const [preview, setPreview] = useState("");

    // ==========================
// Get Notification
// ==========================

const getNotification = async () => {

    try{

        const res = await api.get(`/notification/${id}`);

        if(res.data.success){

            const data = res.data.notification;

            setTitle(data.title);

            setMessage(data.message);

            setNotificationDate(
                data.notificationDate.split("T")[0]
            );

            setType(data.type);

            setStatus(data.status);

            setTargetAudience(data.targetAudience);

            setOldAttachment(data.attachment?.url);

        }

    }catch(error){

        console.log(error);

    }

};

useEffect(()=>{

    getNotification();

},[]);

// ==========================
// Attachment Change
// ==========================

const handleFileChange=(e)=>{

    const file=e.target.files[0];

    if(!file) return;

    setAttachment(file);

    if(file.type.startsWith("image")){

        setPreview(URL.createObjectURL(file));

    }else{

        setPreview("");

    }

};

// ==========================
// Update
// ==========================

const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

        const formData=new FormData();

        formData.append("title",title);

        formData.append("message",message);

        formData.append(
            "notificationDate",
            notificationDate
        );

        formData.append("type",type);

        formData.append("status",status);

        formData.append(
            "targetAudience",
            targetAudience
        );

        if(attachment){

            formData.append(
                "attachment",
                attachment
            );

        }

        const res=await api.put(

            `/notification/update/${id}`,

            formData

        );

        if(res.data.success){

            Swal.fire(

                "Success",

                "Notification Updated Successfully",

                "success"

            );

            navigate("/notifications");

        }

    }catch(error){

        console.log(error);

        Swal.fire(

            "Error",

            error.response?.data?.message ||

            "Something went wrong",

            "error"

        );

    }

};

return (

<div className="container mt-4 edit-notification-page">

    <div className="card edit-notification-card">

        {/* Header */}

        <div className="edit-notification-header">

            <h3>Edit Notification</h3>

            <button
                className="btn btn-light"
                onClick={() => navigate("/notifications")}
            >
                ← Back
            </button>

        </div>

        {/* Body */}

        <div className="edit-notification-body">

            <form onSubmit={handleSubmit}>

                {/* Title */}

                <div className="mb-3">

                    <label className="form-label">

                        Notification Title

                    </label>

                    <input
                        type="text"
                        className="form-control"
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

                            <option value="Info">Info</option>

                            <option value="Success">Success</option>

                            <option value="Warning">Warning</option>

                            <option value="Urgent">Urgent</option>

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

                {/* Old Attachment */}

                {oldAttachment && (

                    <div className="mb-4">

                        <label className="form-label">

                            Current Attachment

                        </label>

                        <br/>

                        <img
                            src={oldAttachment}
                            alt=""
                            className="current-image"
                        />

                    </div>

                )}

                {/* Upload */}

                <div className="mb-3">

                    <label className="form-label">

                        Upload New Attachment

                    </label>

                    <input
                        type="file"
                        className="form-control"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />

                </div>

                {/* Preview */}

                {preview && (

                    <div className="mb-4">

                        <label className="form-label">

                            New Preview

                        </label>

                        <br/>

                        <img
                            src={preview}
                            alt=""
                            className="preview-image"
                        />

                    </div>

                )}

                {/* Buttons */}

                <div className="edit-notification-buttons">

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/notifications")}
                    >

                        ← Cancel

                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >

                        💾 Update Notification

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

);

};

export default EditNotification;