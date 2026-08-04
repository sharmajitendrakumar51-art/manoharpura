import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Swal from "sweetalert2";
import "../assets/css/Gallery.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Gallery = () => {

    const [galleries, setGalleries] = useState([]);

    // ==========================
    // Get Gallery
    // ==========================

    const getGallery = async () => {

        try {

            const res = await api.get("/gallery/get-gallery");

            if (res.data.success) {

                setGalleries(res.data.galleries);

            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getGallery();

    }, []);

    // ==========================
    // Delete Gallery
    // ==========================

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Gallery?",

            text: "You won't be able to recover it.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

        });

        if (!result.isConfirmed) return;

        try {

            const res = await api.delete(`/gallery/delete/${id}`);

            if (res.data.success) {

                Swal.fire(
                    "Deleted!",
                    "Gallery deleted successfully.",
                    "success"
                );

                getGallery();

            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container-fluid mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Gallery</h2>

                <Link
                    to="/gallery/add"
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Gallery
                </Link>

            </div>

            <div className="row">

                {galleries.map((gallery) => (

                    <div
                        className="col-lg-4 col-md-6 mb-4"
                        key={gallery._id}
                    >

                        <div className="card shadow h-100">

                            <div
  id={`galleryCarousel${gallery._id}`}
  className="carousel slide"
  data-bs-ride="carousel"
  data-bs-interval="2500"
>

  <div className="carousel-inner">

    {gallery.images.map((image, index) => (

      <div
        key={index}
        className={`carousel-item ${index === 0 ? "active" : ""}`}
      >
<Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
    }}
    loop={true}
    pagination={{ clickable: true }}
>

    {gallery.images.map((image, index) => (

        <SwiperSlide key={index}>

            <img
                src={image.url}
                alt=""
                style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                }}
            />

        </SwiperSlide>

    ))}

</Swiper>

      </div>

    ))}

  </div>
  
</div>

                            <div className="card-body">

                               <h4>
    {gallery.title}
</h4>

<p className="gallery-date">

    <i className="bi bi-calendar-event-fill me-2"></i>

    {gallery.galleryDate
        ? new Date(gallery.galleryDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "No Date"}

</p>

<p>
    {gallery.description}
</p>

                            </div>

                            <div className="card-footer d-flex justify-content-between">

                                <Link
                                    to={`/gallery/view/${gallery._id}`}
                                    className="btn btn-info btn-sm"
                                >
                                    <i className="bi bi-eye"></i>
                                </Link>

                                <Link
                                    to={`/gallery/edit/${gallery._id}`}
                                    className="btn btn-warning btn-sm"
                                >
                                    <i className="bi bi-pencil"></i>
                                </Link>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(gallery._id)
                                    }
                                >
                                    <i className="bi bi-trash"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Gallery;