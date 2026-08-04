import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

const AddGallery = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [galleryDate, setGalleryDate] = useState("");

    // ==========================
    // Image Change
    // ==========================

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        setImages(files);

        const previewImages = files.map((file) =>
            URL.createObjectURL(file)
        );

        setPreview(previewImages);

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

            formData.append("galleryDate", galleryDate);

            images.forEach((image) => {
                formData.append("images", image);
            });

console.log("Gallery Date:", galleryDate);

for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

            const res = await api.post(
                "/gallery/create",
                formData
            );

            if (res.data.success) {

                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Gallery Created Successfully",
                });

                navigate("/gallery");

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

                    <h3>Add Gallery</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        {/* Gallery Name */}

                        <div className="mb-3">

                            <label className="form-label">

                                Gallery Name

                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                            />

                        </div>

                        {/* Description */}

                        <div className="mb-3">

                            <label className="form-label">

                                Description

                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            ></textarea>

                        </div>

                        {/* Gallery Date */}

<div className="mb-3">

    <label className="form-label">
         Date
    </label>

    <input
        type="date"
        className="form-control"
        value={galleryDate}
        onChange={(e) => setGalleryDate(e.target.value)}
        required
    />

</div>

                        {/* Images */}

                        <div className="mb-3">

                            <label className="form-label">

                                Upload Images

                            </label>

                            <input
                                type="file"
                                className="form-control"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />

                        </div>

                        {/* Preview */}

                        {preview.length > 0 && (

                            <div className="row mb-3">

                                {preview.map((img, index) => (

                                    <div
                                        className="col-md-3 mb-3"
                                        key={index}
                                    >

                                        <img
                                            src={img}
                                            alt=""
                                            className="img-fluid rounded shadow"
                                            style={{
                                                height: "180px",
                                                width: "100%",
                                                objectFit: "cover",
                                            }}
                                        />

                                    </div>

                                ))}

                            </div>

                        )}

                       <div className="d-flex gap-2">

    <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate("/gallery")}
    >
        <i className="bi bi-arrow-left me-2"></i>
        Back
    </button>

    <button
        className="btn btn-primary"
        type="submit"
    >
        <i className="bi bi-upload me-2"></i>
        Save Gallery
    </button>

</div>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default AddGallery;