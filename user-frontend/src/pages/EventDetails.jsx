import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../assets/css/EventDetails.css";

const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);


  // =====================================================
  // GET EVENT DETAILS
  // =====================================================

  const getEventDetails = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await api.get(`/event/${id}`);

      console.log("EVENT DETAILS RESPONSE:", res.data);

      if (res.data.success) {

        setEvent(res.data.event);

      } else {

        setError(
          res.data.message ||
          "Event not found."
        );

      }

    } catch (error) {

      console.error("EVENT DETAILS ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load event details."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getEventDetails();

  }, [id]);


  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
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


  // =====================================================
  // TIME FORMAT
  // =====================================================

  const formatTime = (time) => {

    if (!time) {
      return "";
    }

    const [hours, minutes] = time.split(":");

    let hour = parseInt(hours, 10);

    const minute = minutes || "00";

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;

    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute} ${period}`;

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="event-details-state">

        <div className="event-details-loader"></div>

        <p>
          Loading event details...
        </p>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error || !event) {

    return (

      <div className="event-details-state">

        <i className="bi bi-calendar-x"></i>

        <h3>
          Event Not Found
        </h3>

        <p>
          {error || "This event is not available."}
        </p>

        <button
          onClick={() => navigate("/event")}
        >
          <i className="bi bi-arrow-left"></i>

          Back to Events

        </button>

      </div>

    );

  }


  return (

    <main className="event-details-page">


      <div className="event-details-container">


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          className="event-back-btn"
          onClick={() => navigate("/events")}
        >

          <i className="bi bi-arrow-left"></i>

          Back to Events

        </button>


        {/* =================================================
            EVENT MAIN CARD
        ================================================= */}

        <article className="event-details-card">


          {/* =================================================
              COVER IMAGE
          ================================================= */}

          <div className="event-details-cover">

            <img
              src={event.coverImage?.url}
              alt={event.title}
            />


            {/* FEATURED BADGE */}

            {event.featured === true && (

              <span className="event-featured-badge">

                <i className="bi bi-star-fill"></i>

                Featured

              </span>

            )}

          </div>


          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="event-details-content">


            {/* STATUS */}

            <div className="event-details-top">


              <span
                className={
                  event.status === "Upcoming"
                    ? "event-status upcoming"
                    : "event-status completed"
                }
              >

                <i
                  className={
                    event.status === "Upcoming"
                      ? "bi bi-clock-fill"
                      : "bi bi-check-circle-fill"
                  }
                ></i>

                {event.status}

              </span>

            </div>


            {/* TITLE */}

            <h1>
              {event.title}
            </h1>


            {/* =================================================
                EVENT INFORMATION
            ================================================= */}

            <div className="event-info-grid">


              {/* DATE */}

              <div className="event-info-item">

                <div className="event-info-icon">

                  <i className="bi bi-calendar3"></i>

                </div>

                <div>

                  <span>
                    Date
                  </span>

                  <strong>

                    {formatDate(event.dateFrom)}

                    {event.dateTo &&
                      event.dateTo !== event.dateFrom &&
                      ` - ${formatDate(event.dateTo)}`
                    }

                  </strong>

                </div>

              </div>


              {/* TIME */}

              <div className="event-info-item">

                <div className="event-info-icon">

                  <i className="bi bi-clock"></i>

                </div>

                <div>

                  <span>
                    Time
                  </span>

                  <strong>

                    {formatTime(event.timeFrom)}

                    {" - "}

                    {formatTime(event.timeTo)}

                  </strong>

                </div>

              </div>


              {/* LOCATION */}

              <div className="event-info-item">

                <div className="event-info-icon">

                  <i className="bi bi-geo-alt-fill"></i>

                </div>

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {event.location}
                  </strong>

                </div>

              </div>


            </div>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="event-description">

              <div className="event-section-title">

                <i className="bi bi-info-circle-fill"></i>

                <h2>
                  About This Event
                </h2>

              </div>


              {event.description
                ?.split("\n")
                .map((paragraph, index) => (

                  <p key={index}>
                    {paragraph}
                  </p>

                ))
              }

            </div>


            {/* =================================================
                GALLERY
            ================================================= */}

            {event.galleryImages?.length > 0 && (

              <div className="event-gallery">


                <div className="event-section-title">

                  <i className="bi bi-images"></i>

                  <h2>
                    Event Gallery
                  </h2>

                </div>


                <div className="event-gallery-grid">

                  {event.galleryImages.map(
                    (image, index) => (

                      <div
                        className="event-gallery-item"
                        key={
                          image._id || index
                        }
                        onClick={() =>
                          setSelectedImage(
                            image.url
                          )
                        }
                      >

                        <img
                          src={image.url}
                          alt={`${event.title} ${index + 1}`}
                          loading="lazy"
                        />

                        <div className="event-gallery-overlay">

                          <i className="bi bi-zoom-in"></i>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </article>

      </div>


      {/* =================================================
          IMAGE LIGHTBOX
      ================================================= */}

      {selectedImage && (

        <div
          className="event-lightbox"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            className="event-lightbox-close"
            onClick={() =>
              setSelectedImage(null)
            }
          >

            <i className="bi bi-x-lg"></i>

          </button>


          <img
            src={selectedImage}
            alt="Event"
            onClick={(e) =>
              e.stopPropagation()
            }
          />

        </div>

      )}

    </main>

  );

};

export default EventDetails;