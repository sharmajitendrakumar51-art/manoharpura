import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ==========================
  // Get All Events
  // ==========================

  const getEvents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/event");

      if (response.data.success) {
        setEvents(response.data.events);
        setFilteredEvents(response.data.events);
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to fetch events",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // ==========================
  // Search
  // ==========================

  useEffect(() => {
    const result = events.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredEvents(result);
  }, [search, events]);

  // ==========================
  // Delete Event
  // ==========================

  const deleteEvent = async (id) => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "You won't be able to recover this event.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await api.delete(
        `/event/delete/${id}`
      );

      if (response.data.success) {
        Swal.fire(
          "Deleted!",
          "Event deleted successfully.",
          "success"
        );

        getEvents();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Unable to delete event",
        "error"
      );
    }
  };

  return (
    <div className="container-fluid py-4 events-page">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4 events-header">

        <div>
          <h2 className="event-title">Events Management</h2>
        </div>

        <Link
          to="/events/add"
          className="btn btn-primary px-4 add-event-btn"
        >
          + Add Event
        </Link>

      </div>

      {/* Search */}

      <div className="card shadow-sm border-0 mb-4 search-card">

        <div className="card-body">

          <input
            type="text"
           className="form-control search-input"
            placeholder="Search Event..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

            {/* Event Cards */}

      {loading ? (

        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>

      ) : filteredEvents.length === 0 ? (

        <div className="alert alert-warning text-center">
          No Events Found
        </div>

      ) : (

        <div className="row">

          {filteredEvents.map((event) => (

            <div
              className="col-lg-4 col-md-6 mb-4"
              key={event._id}
            >

              <div
                className="card h-100 shadow border-0"
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                }}
              >

                {/* Cover Image */}

                
                <img
                   className="event-image"
                  src={event.coverImage?.url}
                  alt={event.title}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body event-body">

                  {/* Badges */}

                  <div className="d-flex justify-content-between mb-3">

                    <span
                      className={`badge ${
                        event.status === "Upcoming"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {event.status}
                    </span>

                    {event.featured && (
                      <span className="badge bg-warning text-dark">
                        ⭐ Featured
                      </span>
                    )}

                  </div>

                  {/* Title */}

                  <h5 className="fw-bold event-name">
                    {event.title}
                  </h5>

                  {/* Date */}

                  <p className="mb-1 text-muted">

                    📅{" "}
                    {new Date(
                      event.eventDate
                    ).toLocaleDateString()}

                  </p>

                  {/* Time */}

                  <p className="mb-1 text-muted">

                    🕒 {event.eventTime}

                  </p>

                  {/* Location */}

                  <p className="mb-1 text-muted">

                    📍 {event.location}

                  </p>

                  {/* Category */}

                  <p className="mb-3">

                    <span className="badge bg-info">
                      {event.category}
                    </span>

                  </p>

                  {/* Description */}

                  <p
                    className="text-muted"
                    style={{
                      minHeight: "70px",
                    }}
                  >
                    {event.description.length > 100
                      ? event.description.substring(
                          0,
                          100
                        ) + "..."
                      : event.description}
                  </p>

                </div>

                {/* Footer */}

               <div className="card-footer bg-white border-0 event-footer">

                  <div className="d-flex justify-content-between">

                    <Link
                      to={`/events/view/${event._id}`}
                      className="btn btn-outline-primary btn-sm btn-view"
                    >
                      👁 View
                    </Link>

                    <Link
                      to={`/events/edit/${event._id}`}
                      className="btn btn-outline-warning btn-sm btn-edit"
                    >
                      ✏ Edit
                    </Link>

                    <button
                     className="btn btn-outline-danger btn-sm btn-delete"
                      onClick={() =>
                        deleteEvent(event._id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

          </div>
  );
};

export default Events;