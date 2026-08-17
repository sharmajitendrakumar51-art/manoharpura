import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/Notifications.css";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);


  const getNotifications = async () => {

    try {

      const res =
        await api.get("/notification/");

      console.log(
        "ALL NOTIFICATIONS:",
        res.data
      );

      if (res.data.success) {

        const activeNotifications =
          res.data.notifications.filter(
            (notification) =>
              notification.status === "Active"
          );

        setNotifications(
          activeNotifications
        );

      }

    } catch (error) {

      console.error(
        "Notifications Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getNotifications();

  }, []);


  const formatDate = (date) => {

    if (!date) return "";

    const parsedDate = new Date(date);

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


  const getIcon = (type) => {

    switch (type) {

      case "Success":
        return "bi bi-check-circle-fill";

      case "Warning":
        return "bi bi-exclamation-triangle-fill";

      case "Urgent":
        return "bi bi-exclamation-circle-fill";

      default:
        return "bi bi-info-circle-fill";

    }

  };


  if (loading) {

    return (

      <div className="notifications-loading">

        <div className="notifications-spinner"></div>

        <p>
          Loading notifications...
        </p>

      </div>

    );

  }


  return (

    <main className="notifications-page">


      {/* HERO */}

      <section className="notifications-hero">

        <span className="notifications-eyebrow">

          <i className="bi bi-bell-fill"></i>

          Stay Updated

        </span>


        <h1>
          Notifications
        </h1>


      </section>


      {/* LIST */}

      <section className="notifications-section">

        <div className="notifications-container">


          {notifications.length === 0 ? (

            <div className="notifications-no-data">

              <i className="bi bi-bell-slash"></i>

              <h3>
                No Notifications
              </h3>

              <p>
                There are no active notifications
                at the moment.
              </p>

            </div>

          ) : (

            notifications.map(
              (notification) => (

                <article
                  className="notification-card"
                  key={notification._id}
                >


                  <div
                    className={`notification-card-icon notification-card-${notification.type?.toLowerCase()}`}
                  >

                    <i
                      className={getIcon(
                        notification.type
                      )}
                    ></i>

                  </div>


                  <div className="notification-card-content">

                    <div className="notification-card-top">

                      <span className="notification-type">

                        {notification.type}

                      </span>


                      <span className="notification-date">

                        <i className="bi bi-calendar3"></i>

                        {formatDate(
                          notification.notificationDate
                        )}

                      </span>

                    </div>


                    <h2>
                      {notification.title}
                    </h2>


                    <p>
                      {notification.message}
                    </p>


                    {notification.attachment?.url && (

                      <a
                        href={
                          notification
                            .attachment
                            .url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="notification-view-attachment"
                      >

                        <i className="bi bi-paperclip"></i>

                        View Attachment

                      </a>

                    )}

                  </div>

                </article>

              )
            )

          )}

        </div>

      </section>

    </main>

  );

};

export default Notifications;