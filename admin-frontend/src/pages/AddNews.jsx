import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

const AddNews = () => {

    const navigate = useNavigate();

    // ==========================
    // States
    // ==========================

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [newsDate, setNewsDate] = useState("");

    const [status, setStatus] = useState("Published");

    const [featured, setFeatured] = useState(false);

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    // ==========================
// Image Change
// ==========================

const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

};

// ==========================
// Submit
// ==========================

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("title", title);

        formData.append("description", description);

        formData.append("newsDate", newsDate);

        formData.append("status", status);

        formData.append("featured", featured);

        formData.append("image", image);

        const res = await api.post(
            "/news/create",
            formData
        );

        if (res.data.success) {

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "News Created Successfully",
            });

            navigate("/news");

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

            <h3>Add News</h3>

        </div>

        <div className="card-body">

            <form onSubmit={handleSubmit}>

                {/* News Title */}

                <div className="mb-3">

                    <label className="form-label">

                        News Title

                    </label>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter News Title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                    />

                </div>

                {/* Description */}

                <div className="mb-3">

                    <label className="form-label">

                        Description

                    </label>

                    <textarea
                        rows="5"
                        className="form-control"
                        placeholder="Write News Description..."
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                    />

                </div>

                <div className="row">

                    {/* Date */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">

                            News Date

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={newsDate}
                            onChange={(e)=>setNewsDate(e.target.value)}
                            required
                        />

                    </div>

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

                            <option value="Published">

                                Published

                            </option>

                            <option value="Draft">

                                Draft

                            </option>

                        </select>

                    </div>

                </div>

                {/* Featured */}

                <div className="mb-3 form-check">

                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={featured}
                        onChange={(e)=>setFeatured(e.target.checked)}
                    />

                    <label className="form-check-label">

                        Featured News

                    </label>

                </div>

                {/* Upload */}

                <div className="mb-3">

                    <label className="form-label">

                        Upload News Image

                    </label>

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />

                </div>

                {/* Preview */}

                {preview && (

                    <div className="mb-4 text-center">

                        <img
                            src={preview}
                            alt=""
                            className="img-fluid rounded shadow"
                            style={{
                                maxHeight:"300px",
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
                        onClick={()=>navigate("/news")}
                    >

                        <i className="bi bi-arrow-left me-2"></i>

                        Back

                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >

                        <i className="bi bi-save me-2"></i>

                        Save News

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

);
};

export default AddNews;