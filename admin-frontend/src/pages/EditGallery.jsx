import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

const EditGallery = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [galleryDate, setGalleryDate] = useState("");

    const [oldImages, setOldImages] = useState([]);

    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);

    // ======================
    // Get Gallery
    // ======================

    const getGallery = async () => {

        try {

            const res = await api.get(`/gallery/${id}`);

            if (res.data.success) {

                const gallery = res.data.gallery;

                setTitle(gallery.title);
                setDescription(gallery.description);
                setGalleryDate( gallery.galleryDate
                 ? gallery.galleryDate.split("T")[0] : "");
                setOldImages(gallery.images);

            }

        } catch (error) {

            console.log(error);

        }

    };

    const deleteImage = async (imageId) => {

    try {

        const res = await api.delete(
            `/gallery/delete-image/${id}/${imageId}`
        );

        if (res.data.success) {

            Swal.fire(
                "Deleted!",
                "Image deleted successfully",
                "success"
            );

            getGallery();

        }

    } catch (error) {

        console.log(error);

        Swal.fire(
            "Error",
            "Failed to delete image",
            "error"
        );

    }

};

    useEffect(() => {

        getGallery();

    }, []);

    // ======================
    // Image Change
    // ======================

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files);

        setImages(files);

        const previewImages = files.map(file =>
            URL.createObjectURL(file)
        );

        setPreview(previewImages);

    };

    // ======================
    // Update
    // ======================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);

            formData.append("description", description);

            formData.append("galleryDate", galleryDate);

            images.forEach(image => {

                formData.append("images", image);

            });

            const res = await api.put(
                `/gallery/update/${id}`,
                formData
            );

            if (res.data.success) {

                Swal.fire(
                    "Success",
                    "Gallery Updated Successfully",
                    "success"
                );

                navigate("/gallery");

            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Something went wrong",
                "error"
            );

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h3>Edit Gallery</h3>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/gallery")}
                    >
                        ← Back
                    </button>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Gallery Name</label>

                            <input
                                className="form-control"
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Description</label>

                            <textarea
                                className="form-control"
                                rows="3"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            />

                        </div>

                        <div className="mb-3">

    <label>Gallery Date</label>

    <input
        type="date"
        className="form-control"
        value={galleryDate}
        onChange={(e) =>
            setGalleryDate(e.target.value)
        }
    />

</div>

                        <h5 className="mb-3">

                            Existing Images

                        </h5>

                    <div className="row">

    {oldImages.map((img, index) => (

        <div
            className="col-md-3 mb-3"
            key={index}
        >

            <div className="position-relative">

                <img
                    src={img.url}
                    className="img-fluid rounded shadow"
                    style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover"
                    }}
                />
<button
    type="button"
    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
    onClick={() => deleteImage(img._id)}
>
    <i className="bi bi-x"></i>
</button>
            </div>

        </div>

    ))}

</div>

                        <hr/>

                        <div className="mb-3">

                            <label>

                                Upload New Images

                            </label>

                            <input
                                type="file"
                                className="form-control"
                                multiple
                                onChange={handleImageChange}
                            />

                        </div>

                        {preview.length>0 &&

                            <div className="row">

                                {preview.map((img,index)=>(

                                    <div
                                        className="col-md-3 mb-3"
                                        key={index}
                                    >

                                        <img
                                            src={img}
                                            className="img-fluid rounded shadow"
                                            style={{
                                                height:"180px",
                                                width:"100%",
                                                objectFit:"cover"
                                            }}
                                        />

                                    </div>

                                ))}

                            </div>

                        }

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >

                            Save Changes

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditGallery;