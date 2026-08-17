import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/Events.css";

const Events = () => {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==============================
  // GET EVENTS
  // ==============================

  const getEvents = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await api.get("/event/");

      console.log("EVENT API RESPONSE:", res.data);

      if (res.data.success) {

        setEvents(res.data.events || []);

      } else {

        setError(
          res.data.message || "Unable to load events"
        );

      }

    } catch (err) {

      console.error("EVENT API ERROR:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load events."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==============================
  // LOAD
  // ==============================

  useEffect(() => {

    getEvents();

  }, []);


  // ==============================
  // DATE FORMAT
  // ==============================

  const formatDate = (date) => {

    if (!date) {
      return "Date not available";
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
      return "Date not available";
    }

    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  };

  // ==============================
// FORMAT TIME
// ==============================

const formatTime = (time) => {

  if (!time) {
    return "";
  }

  const [hours, minutes] = time.split(":");

  let hour = parseInt(hours, 10);

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;

  if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes} ${ampm}`;
};


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (

      <section className="events-page">

        <div className="events-state">

          <div className="spinner-border"></div>

          <p>Loading events...</p>

        </div>

      </section>

    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {

    return (

      <section className="events-page">

        <div className="events-state error">

          <i className="bi bi-exclamation-circle"></i>

          <h3>
            Unable to Load Events
          </h3>

          <p>
            {error}
          </p>

          <button
            onClick={getEvents}
          >
            Try Again
          </button>

        </div>

      </section>

    );

  }


  return (

    <div className="events-page">


      {/* =================================
          HERO
      ================================= */}

      

      <section className="news-hero">

        <div className="news-hero-content">

          <span className="news-eyebrow">

            <i className="bi bi-newspaper"></i>

            Social and Other Activities

          </span>


          <h1>
           Upcoming & Past Events
          </h1>

        </div>

      </section>


      {/* =================================
          EVENTS SECTION
      ================================= */}

      <section className="events-section">

        <div className="events-container">


          {/* <div className="events-heading">

            <span>

              <i className="bi bi-calendar-check"></i>

              What's Happening

            </span>

            <h2>
              Upcoming & Past Events
            </h2>

          </div> */}


          {/* ===============================
              NO EVENTS
          =============================== */}

          {events.length === 0 ? (

            <div className="events-state">

              <i className="bi bi-calendar-x"></i>

              <h3>
                No Events Found
              </h3>

              <p>
                There are no events available
                at the moment.
              </p>

            </div>

          ) : (


            /* ===============================
               EVENTS GRID
            =============================== */

            <div className="events-grid">

              {events.map((event) => (

                <div
                  className="event-card"
                  key={event._id}
                >


                  {/* IMAGE */}

                  <div className="event-card-image">

                    <img
                      src={event.coverImage?.url || ""}
                      alt={event.title || "Event"}
                    />


                    {event.featured === true && (

                      <span className="event-featured">

                        <i className="bi bi-star-fill"></i>

                        Upcoming

                      </span>

                    )}

                  </div>


                  {/* CONTENT */}

                  <div className="event-card-content">


                    {/* DATE */}

                    <div className="event-date">

                      <i className="bi bi-calendar3"></i>

                      {formatDate(event.dateFrom)}

                      {event.dateTo && (

                        <>
                          {" - "}
                          {formatDate(event.dateTo)}
                        </>

                      )}

                    </div>


                    {/* TITLE */}

                    <h3>
                      {event.title}
                    </h3>


                    {/* DESCRIPTION */}

                    <p>

                      {event.description
                        ? event.description.length > 120
                          ? event.description.substring(0, 120) + "..."
                          : event.description
                        : "No description available."
                      }

                    </p>


                    {/* TIME */}

                    <div className="event-info">

                      <span>

                        <i className="bi bi-clock-fill"></i>

                       {formatTime(event.timeFrom)}

                       {" - "}

                      {formatTime(event.timeTo)}

                      </span>


                      {/* LOCATION */}

                      <span>

                        <i className="bi bi-geo-alt-fill"></i>

                        {event.location || "Location not available"}

                      </span>

                    </div>


                    {/* BUTTON */}

                    <button
                      className="event-view-btn"
                      onClick={() =>
                        navigate(
                          `/eventdetails/${event._id}`
                        )
                      }
                    >

                      View Details

                      <i className="bi bi-arrow-right"></i>

                    </button>


                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =================================
          BOTTOM CTA
      ================================= */}

      {/* <section className="events-cta">

        <h2>
          Stay Connected With Us
        </h2>

        <p>
          Keep checking our events for upcoming
          programs and activities.
        </p>

      </section> */}

    </div>

  );

};

export default Events;