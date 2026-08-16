import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/Gallery.css";

const Gallery = () => {

  // ==========================
  // States
  // ==========================

  const [galleries, setGalleries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedGallery, setSelectedGallery] = useState(null);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [carouselIndexes, setCarouselIndexes] = useState({});

  // ==========================
  // Get All Galleries
  // ==========================

  const getGalleries = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/gallery/get-gallery"
      );

      console.log(
        "GALLERY API RESPONSE:",
        response.data
      );


      if (response.data.success) {

        setGalleries(
          response.data.galleries || []
        );

      } else {

        setError(
          response.data.message ||
          "Unable to load gallery."
        );

      }

    } catch (error) {

      console.error(
        "Gallery Fetch Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load gallery. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================
  // Load Gallery
  // ==========================

  useEffect(() => {

    getGalleries();

  }, []);


  // ==========================
  // Open Gallery
  // ==========================

  const openGallery = (gallery) => {

    setSelectedGallery(gallery);

    setSelectedImageIndex(null);

    document.body.style.overflow = "hidden";

  };


  // ==========================
  // Close Gallery
  // ==========================

  const closeGallery = () => {

    setSelectedGallery(null);

    setSelectedImageIndex(null);

    document.body.style.overflow = "auto";

  };


  // ==========================
  // Open Fullscreen Image
  // ==========================

  const openImage = (index) => {

    setSelectedImageIndex(index);

  };


  // ==========================
  // Close Fullscreen Image
  // ==========================

  const closeImage = () => {

    setSelectedImageIndex(null);

  };


  // ==========================
  // Previous Image
  // ==========================

  const previousImage = () => {

    if (
      !selectedGallery ||
      selectedImageIndex === null
    ) {
      return;
    }


    const totalImages =
      selectedGallery.images.length;


    setSelectedImageIndex(
      selectedImageIndex === 0
        ? totalImages - 1
        : selectedImageIndex - 1
    );

  };


  // ==========================
  // Next Image
  // ==========================

  const nextImage = () => {

    if (
      !selectedGallery ||
      selectedImageIndex === null
    ) {
      return;
    }


    const totalImages =
      selectedGallery.images.length;


    setSelectedImageIndex(
      selectedImageIndex === totalImages - 1
        ? 0
        : selectedImageIndex + 1
    );

  };


  // ==========================
// Keyboard Navigation
// ==========================

useEffect(() => {

  const handleKeyboard = (event) => {

    if (!selectedGallery) {
      return;
    }

    // Escape
    if (event.key === "Escape") {

      if (selectedImageIndex !== null) {

        closeImage();

      } else {

        closeGallery();

      }

    }

    // Previous Image
    if (
      selectedImageIndex !== null &&
      event.key === "ArrowLeft"
    ) {

      previousImage();

    }

    // Next Image
    if (
      selectedImageIndex !== null &&
      event.key === "ArrowRight"
    ) {

      nextImage();

    }

  };


  document.addEventListener(
    "keydown",
    handleKeyboard
  );


  return () => {

    document.removeEventListener(
      "keydown",
      handleKeyboard
    );

  };

}, [
  selectedGallery,
  selectedImageIndex
]);


// ==========================
// Auto Image Carousel
// ==========================

useEffect(() => {

  // Gallery load nahi hui
  if (!galleries.length) {
    return;
  }


  const interval = setInterval(() => {

    setCarouselIndexes((prev) => {

      const updated = { ...prev };


      galleries.forEach((gallery) => {

        const totalImages =
          gallery.images?.length || 0;


        // Agar gallery me 1 se jyada images hain
        if (totalImages > 1) {

          const currentIndex =
            prev[gallery._id] || 0;


          updated[gallery._id] =
            (currentIndex + 1) % totalImages;

        }

      });


      return updated;

    });

  }, 3000);


  // Cleanup
  return () => {

    clearInterval(interval);

  };

}, [galleries]);


// ==========================
// Format Date
// ==========================

const formatDate = (date) => {

  if (!date) {

    return "Date not available";

  }


  const parsedDate = new Date(date);


  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {

    return date;

  }


  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

};


  // ==========================
  // Loading
  // ==========================

  if (loading) {

    return (

      <div className="gallery-page">

        <section className="gallery-hero">

          <div className="gallery-container">

            <span className="gallery-eyebrow">
              Memories & Moments
            </span>

            <h1>
             Our Gallery
            </h1>

            {/* <p>
              Explore the memorable moments,
              events and activities of
              Manoharpura Mokshdham Vikas Samiti.
            </p> */}

          </div>

        </section>


        <section className="gallery-section">

          <div className="gallery-container">

            <div className="gallery-loading">

              <div className="gallery-spinner"></div>

              <p>
                Loading gallery...
              </p>

            </div>

          </div>

        </section>

      </div>

    );

  }


  // ==========================
  // Error
  // ==========================

  if (error) {

    return (

      <div className="gallery-page">

        <section className="gallery-hero">

          <div className="gallery-container">

            <span className="gallery-eyebrow">
              Our Memories
            </span>

            <h1>
              Gallery
            </h1>

            <p>
              Explore our memorable moments,
              events and activities.
            </p>

          </div>

        </section>


        <section className="gallery-section">

          <div className="gallery-container">

            <div className="gallery-error">

              <div className="gallery-error-icon">

                <i className="bi bi-exclamation-circle"></i>

              </div>

              <h3>
                Unable to Load Gallery
              </h3>

              <p>
                {error}
              </p>

              <button
                className="gallery-retry-btn"
                onClick={getGalleries}
              >

                <i className="bi bi-arrow-clockwise"></i>

                Try Again

              </button>

            </div>

          </div>

        </section>

      </div>

    );

  }


  return (

    <div className="gallery-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="gallery-hero">

        <div className="gallery-container">

          <div className="gallery-hero-content">

            <span className="gallery-eyebrow">

              <i className="bi bi-images"></i>

              Memories & Moments

            </span>


            <h1>
              Our Gallery
            </h1>


            {/* <p>
              Explore the memorable moments,
              events, celebrations and activities
              of Manoharpura Mokshdham Vikas Samiti.
            </p> */}

          </div>

        </div>

      </section>


      {/* =================================
          GALLERY SECTION
      ================================= */}

      <section className="gallery-section">

        <div className="gallery-container">

          {/* Section Heading */}

          <div className="gallery-section-heading">

            {/* <div>

              <span className="gallery-small-title">
                Memories & Moments
              </span>

              <h2>
                Explore Our Gallery
              </h2>

              <p>
                A collection of important events,
                activities and memorable moments.
              </p>

            </div> */}


            <div className="gallery-count">

              <strong>
                {galleries.length}
              </strong>

              <span>
                {galleries.length === 1
                  ? "Gallery"
                  : "Galleries"}
              </span>

            </div>

          </div>


          {/* =================================
              EMPTY
          ================================= */}

          {galleries.length === 0 ? (

            <div className="gallery-empty">

              <div className="gallery-empty-icon">

                <i className="bi bi-images"></i>

              </div>

              <h3>
                No Gallery Available
              </h3>

              <p>
                Gallery images will appear here
                when they are added.
              </p>

            </div>

          ) : (

            /* =================================
               GALLERY GRID
            ================================= */

            <div className="gallery-grid">

              {galleries.map((gallery) => {

                const currentImageIndex =
  carouselIndexes[gallery._id] || 0;

const currentImage =
  gallery.images?.[currentImageIndex]?.url;

const imageCount =
  gallery.images?.length || 0;


                return (

                  <article
                    className="gallery-card"
                    key={gallery._id}
                  >

                    {/* Image */}

                    <div className="gallery-card-image">

  {currentImage ? (

    <img
      key={currentImage}
      src={currentImage}
      alt={gallery.title || "Gallery"}
      loading="lazy"
    />

  ) : (

    <div className="gallery-no-image">

      <i className="bi bi-image"></i>

    </div>

  )}


  {/* Hover Overlay */}

  <div className="gallery-card-overlay">

    <button
      className="gallery-view-btn"
      onClick={() =>
        openGallery(gallery)
      }
    >

      <i className="bi bi-eye-fill"></i>

      View Photos

    </button>

  </div>


  {/* Image Counter */}

  {imageCount > 0 && (

    <div className="gallery-image-count">

      <i className="bi bi-images"></i>

      {imageCount}

    </div>

  )}


  {/* Carousel Dots */}

  {imageCount > 1 && (

    <div className="gallery-carousel-dots">

      {gallery.images.map((_, index) => (

        <span
          key={index}
          className={
            index === currentImageIndex
              ? "active"
              : ""
          }
        ></span>

      ))}

    </div>

  )}

</div>


                    {/* Content */}

                    <div className="gallery-card-content">

                      <div className="gallery-date">

                        <i className="bi bi-calendar3"></i>

                        {formatDate(
                          gallery.galleryDate
                        )}

                      </div>


                      <h3>
                        {gallery.title}
                      </h3>


                      {gallery.description && (

                        <p>
                          {gallery.description}
                        </p>

                      )}


                      <button
                        className="gallery-card-link"
                        onClick={() =>
                          openGallery(gallery)
                        }
                      >

                        View Gallery

                        <i className="bi bi-arrow-right"></i>

                      </button>

                    </div>

                  </article>

                );

              })}

            </div>

          )}

        </div>

      </section>


      {/* =================================
          GALLERY MODAL
      ================================= */}

      {selectedGallery && (

        <div
          className="gallery-modal"
          onClick={closeGallery}
        >

          <div
            className="gallery-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="gallery-modal-header">

              <div>

                <h2>
                  {selectedGallery.title}
                </h2>

                <p>

                  <i className="bi bi-calendar3"></i>

                  {formatDate(
                    selectedGallery.galleryDate
                  )}

                  <span className="modal-separator">
                    •
                  </span>

                  {selectedGallery.images?.length || 0}

                  {" "}
                  Photos

                </p>

              </div>


              <button
                className="gallery-modal-close"
                onClick={closeGallery}
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>


            {/* Modal Images */}

            <div className="gallery-modal-body">

              {selectedGallery.images?.length > 0 ? (

                <div className="gallery-modal-grid">

                  {selectedGallery.images.map(
                    (image, index) => (

                      <button
                        className="gallery-modal-image"
                        key={
                          image._id ||
                          image.public_id ||
                          index
                        }
                        onClick={() =>
                          openImage(index)
                        }
                      >

                        <img
                          src={image.url}
                          alt={`${selectedGallery.title} ${index + 1}`}
                          loading="lazy"
                        />

                        <span>

                          <i className="bi bi-arrows-fullscreen"></i>

                        </span>

                      </button>

                    )
                  )}

                </div>

              ) : (

                <div className="gallery-modal-empty">

                  <i className="bi bi-image"></i>

                  <p>
                    No images available.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}


      {/* =================================
          FULLSCREEN LIGHTBOX
      ================================= */}

      {selectedGallery &&
        selectedImageIndex !== null &&
        selectedGallery.images?.[selectedImageIndex] && (

          <div
            className="gallery-lightbox"
            onClick={closeImage}
          >

            {/* Close */}

            <button
              className="lightbox-close"
              onClick={closeImage}
            >

              <i className="bi bi-x-lg"></i>

            </button>


            {/* Previous */}

            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {

                e.stopPropagation();

                previousImage();

              }}
            >

              <i className="bi bi-chevron-left"></i>

            </button>


            {/* Image */}

            <div
              className="lightbox-image-wrapper"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <img
                src={
                  selectedGallery
                    .images[selectedImageIndex]
                    .url
                }
                alt={
                  selectedGallery.title
                }
              />

              <div className="lightbox-counter">

                {selectedImageIndex + 1}

                {" / "}

                {selectedGallery.images.length}

              </div>

            </div>


            {/* Next */}

            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => {

                e.stopPropagation();

                nextImage();

              }}
            >

              <i className="bi bi-chevron-right"></i>

            </button>

          </div>

        )}

    </div>

  );

};

export default Gallery;