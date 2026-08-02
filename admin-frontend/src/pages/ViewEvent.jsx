import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/ViewEvent.css";

const ViewEvent = () => {

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Get Single Event
  // ==========================

  const getEvent = async () => {
    try {

      setLoading(true);

      const response = await api.get(`/event/${id}`);

      if (response.data.success) {
        setEvent(response.data.event);
      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to fetch event",
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Event not found.
        </div>
      </div>
    );
  }

  return (

    <div className="container py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          View Event
        </h2>

        <Link
          to="/events"
          className="btn btn-secondary"
        >
          ← Back
        </Link>

      </div>

            {/* Cover Image */}

      <div className="card shadow border-0 mb-4">

        <img
          src={event.coverImage?.url}
          alt={event.title}
          className="img-fluid"
          style={{
            width: "100%",
            maxHeight: "450px",
            objectFit: "cover",
          }}
        />

      </div>

      {/* Event Details */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          {/* Title */}

          <h2 className="fw-bold mb-3">
            {event.title}
          </h2>

          {/* Description */}

          <p className="text-muted">
            {event.description}
          </p>

          <hr />

          <div className="row">

            {/* Date From */}

<div className="col-md-6 mb-3">

  <h6 className="fw-bold">
    📅 Date From
  </h6>

  <p>
    {new Date(event.dateFrom).toLocaleDateString("en-IN")}
  </p>

</div>

{/* Date To */}

<div className="col-md-6 mb-3">

  <h6 className="fw-bold">
    📅 Date To
  </h6>

  <p>
    {new Date(event.dateTo).toLocaleDateString("en-IN")}
  </p>

</div>

{/* Time From */}

<div className="col-md-6 mb-3">

  <h6 className="fw-bold">
    🕒 Time From
  </h6>

  <p>{event.timeFrom}</p>

</div>

{/* Time To */}

<div className="col-md-6 mb-3">

  <h6 className="fw-bold">
    🕒 Time To
  </h6>

  <p>{event.timeTo}</p>

</div>

            {/* Location */}

            <div className="col-md-6 mb-3">

              <h6 className="fw-bold">
                📍 Location
              </h6>

              <p>{event.location}</p>

            </div>

            {/* Category */}

            <div className="col-md-6 mb-3">

              <h6 className="fw-bold">
                🏷 Category
              </h6>

              <span className="badge bg-info fs-6">
                {event.category}
              </span>

            </div>

            {/* Status */}

            <div className="col-md-6 mb-3">

              <h6 className="fw-bold">
                Status
              </h6>

              <span
                className={`badge fs-6 ${
                  event.status === "Upcoming"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {event.status}
              </span>

            </div>

            {/* Featured */}

            <div className="col-md-6 mb-3">

              <h6 className="fw-bold">
                Featured
              </h6>

              {event.featured ? (
                <span className="badge bg-warning text-dark fs-6">
                  ⭐ Yes
                </span>
              ) : (
                <span className="badge bg-dark fs-6">
                  No
                </span>
              )}

            </div>

          </div>

        </div>

      </div>

            {/* Gallery Images */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            Gallery Images
          </h4>

          {event.galleryImages &&
          event.galleryImages.length > 0 ? (

            <div className="row">

              {event.galleryImages.map((image, index) => (

                <div
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                  key={index}
                >

                  <div className="card border-0 shadow-sm">

                    <img
                      src={image.url}
                      alt={`Gallery ${index + 1}`}
                      className="img-fluid rounded"
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="alert alert-info">
              No Gallery Images Available
            </div>

          )}

        </div>

      </div>

      {/* Buttons */}

      <div className="d-flex justify-content-between">

        <Link
          to="/events"
          className="btn btn-secondary"
        >
          ← Back to Events
        </Link>

        <Link
          to={`/events/edit/${event._id}`}
          className="btn btn-warning"
        >
          ✏ Edit Event
        </Link>

      </div>

    </div>
  );
};

export default ViewEvent;