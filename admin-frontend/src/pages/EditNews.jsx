import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/EditNews.css";


const EditNews = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [newsDate, setNewsDate] = useState("");

    const [status, setStatus] = useState("Published");

    const [featured, setFeatured] = useState(false);

    const [oldImage, setOldImage] = useState("");

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    // ==========================
// Get News
// ==========================

const getNews = async () => {

    try{

        const res = await api.get(`/news/${id}`);

        if(res.data.success){

            const news = res.data.news;

            setTitle(news.title);

            setDescription(news.description);

            setNewsDate(
                news.newsDate.split("T")[0]
            );

            setStatus(news.status);

            setFeatured(news.featured);

            setOldImage(news.image.url);

        }

    }catch(error){

        console.log(error);

    }

};

useEffect(()=>{

    getNews();

},[]);

// ==========================
// Image Change
// ==========================

const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );

    }

};

// ==========================
// Update News
// ==========================

const handleSubmit = async (e) => {

    e.preventDefault();

    try{

        const formData = new FormData();

        formData.append("title",title);

        formData.append("description",description);

        formData.append("newsDate",newsDate);

        formData.append("status",status);

        formData.append("featured",featured);

        if(image){

            formData.append("image",image);

        }

        const res = await api.put(

            `/news/update/${id}`,

            formData

        );

        if(res.data.success){

            Swal.fire({

                icon:"success",

                title:"Success",

                text:"News Updated Successfully"

            });

            navigate("/news");

        }

    }catch(error){

        console.log(error);

        Swal.fire({

            icon:"error",

            title:"Error",

            text:
            error.response?.data?.message ||
            "Something went wrong"

        });

    }

};

return (

<div className="container mt-4">

    <div className="card shadow">

        <div className="card-header d-flex justify-content-between align-items-center">

            <h3>Edit News</h3>

            <button
                className="btn btn-secondary"
                onClick={() => navigate("/news")}
            >
                ← Back
            </button>

        </div>

        <div className="card-body">

            <form onSubmit={handleSubmit}>

                {/* Title */}

                <div className="mb-3">

                    <label className="form-label">

                        News Title

                    </label>

                    <input
                        type="text"
                        className="form-control"
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
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        required
                    />

                </div>

                {/* Date */}

                <div className="mb-3">

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

                <div className="mb-3">

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

                {/* Featured */}

                <div className="form-check form-switch mb-4">

                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={featured}
                        onChange={(e)=>setFeatured(e.target.checked)}
                    />

                    <label className="form-check-label">

                        Featured News

                    </label>

                </div>

                {/* Current Image */}

                <div className="mb-4">

                    <label className="form-label">

                        Current Image

                    </label>

                    <br />

                    <img
                        src={oldImage}
                        alt=""
                        className="img-thumbnail"
                        style={{
                            width:"260px",
                            height:"180px",
                            objectFit:"cover"
                        }}
                    />

                </div>

                {/* Upload New Image */}

                <div className="mb-3">

                    <label className="form-label">

                        Upload New Image

                    </label>

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                </div>

                {/* Preview */}

                {preview && (

                    <div className="mb-4">

                        <label className="form-label">

                            Preview

                        </label>

                        <br />

                        <img
                            src={preview}
                            alt=""
                            className="img-thumbnail"
                            style={{
                                width:"260px",
                                height:"180px",
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

                        <i className="bi bi-check-circle me-2"></i>

                        Update News

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

);

};

export default EditNews;