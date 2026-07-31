import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";

const ViewGallery = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [gallery, setGallery] = useState(null);

    // ==========================
    // Get Single Gallery
    // ==========================

    const getGallery = async () => {

        try {

            const res = await api.get(`/gallery/${id}`);

            if (res.data.success) {

                setGallery(res.data.gallery);

            }

        } catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Gallery not found",
                "error"
            );

        }

    };

    useEffect(() => {

        getGallery();

    }, []);

    if (!gallery) {

        return (
            <div className="container mt-5">
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid mt-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>View Gallery</h2>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/gallery")}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                </button>

            </div>

            {/* Details */}

            <div className="card shadow border-0">

                <div className="card-body">

                    <h3>{gallery.title}</h3>

                    <p className="text-muted">

                        {gallery.description}

                    </p>

                    <div className="d-flex justify-content-between mb-4">

                        <span>

                            📷 {gallery.images.length} Photos

                        </span>

                        <span>

                            📅{" "}

                            {new Date(
                                gallery.createdAt
                            ).toLocaleDateString()}

                        </span>

                    </div>

                    <div className="row">

                        {gallery.images.map((image, index) => (

                            <div
                                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                                key={index}
                            >

                                <img
                                    src={image.url}
                                    alt=""
                                    className="img-fluid rounded shadow"
                                    style={{
                                        width: "100%",
                                        height: "220px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                    }}
                                />

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewGallery;