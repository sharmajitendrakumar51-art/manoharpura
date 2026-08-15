import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/NotificationDropdown.css";

const NotificationDropdown = () => {

  const [notifications, setNotifications] = useState([]);
  const [readIds, setReadIds] = useState(() => {

    try {

      return JSON.parse(
        localStorage.getItem("readNotifications") || "[]"
      );

    } catch {

      return [];

    }

  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  // =====================================================
  // GET NOTIFICATIONS
  // =====================================================

  const getNotifications = async () => {

    try {

      setLoading(true);

      const res = await api.get("/notification/");

      console.log(
        "NOTIFICATION API RESPONSE:",
        res.data
      );

      if (res.data.success) {

        const activeNotifications =
          res.data.notifications.filter(
            (notification) =>
              notification.status === "Active" &&
              (
                notification.targetAudience ===
                  "All Members" ||
                notification.targetAudience ===
                  "Executive Committee"
              )
          );

        setNotifications(activeNotifications);

      }

    } catch (error) {

      console.error(
        "Notification Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getNotifications();

    // Every 60 seconds check for new notification

    const interval = setInterval(() => {

      getNotifications();

    }, 60000);

    return () => clearInterval(interval);

  }, []);


  // =====================================================
  // UNREAD COUNT
  // =====================================================

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        !readIds.includes(notification._id)
    );


  // =====================================================
  // MARK SINGLE AS READ
  // =====================================================

  const markAsRead = (id) => {

    if (readIds.includes(id)) {
      return;
    }

    const updatedReadIds = [
      ...readIds,
      id,
    ];

    setReadIds(updatedReadIds);

    localStorage.setItem(
      "readNotifications",
      JSON.stringify(updatedReadIds)
    );

  };


  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const markAllAsRead = () => {

    const allIds =
      notifications.map(
        (notification) =>
          notification._id
      );

    setReadIds(allIds);

    localStorage.setItem(
      "readNotifications",
      JSON.stringify(allIds)
    );

  };


  // =====================================================
  // ICON
  // =====================================================

  const getNotificationIcon = (type) => {

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


  // =====================================================
  // TYPE CLASS
  // =====================================================

  const getNotificationClass = (type) => {

    switch (type) {

      case "Success":
        return "notification-success";

      case "Warning":
        return "notification-warning";

      case "Urgent":
        return "notification-urgent";

      default:
        return "notification-info";

    }

  };


  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  };


  return (

    <div className="notification-wrapper">


      {/* =================================================
          BELL BUTTON
      ================================================= */}

      <button
        type="button"
        className={`notification-bell ${
          unreadNotifications.length > 0
            ? "has-unread"
            : ""
        }`}
        onClick={() =>
          setOpen((previous) => !previous)
        }
        aria-label="Notifications"
      >

        <i className="bi bi-bell-fill"></i>


        {/* UNREAD BADGE */}

        {unreadNotifications.length > 0 && (

          <span className="notification-count">

            {unreadNotifications.length > 99
              ? "99+"
              : unreadNotifications.length}

          </span>

        )}

      </button>


      {/* =================================================
          DROPDOWN
      ================================================= */}

   {open && (

  <>

    {/* Mobile overlay */}

    <div
      className="notification-overlay"
      onClick={() => setOpen(false)}
    ></div>


    {/* NOTIFICATION DROPDOWN */}

    <div className="notification-dropdown">


      {/* HEADER */}

      <div className="notification-header">

  <div className="notification-header-left">

    <h5>
      Notifications
    </h5>

    <span>
      {unreadNotifications.length} unread
    </span>

  </div>


  <div className="notification-header-actions">

    {notifications.length > 0 && (
      <button
        type="button"
        onClick={markAllAsRead}
        className="mark-read-btn"
      >
        Mark all read
      </button>
    )}


    {/* CLOSE BUTTON */}

    <button
      type="button"
      className="notification-close-btn"
      onClick={() => setOpen(false)}
      aria-label="Close notifications"
      title="Close"
    >
      <i className="bi bi-x-lg"></i>
    </button>

  </div>

</div>


            {/* BODY */}

            <div className="notification-list">


              {loading ? (

                <div className="notification-empty">

                  <div className="notification-spinner"></div>

                  <p>
                    Loading notifications...
                  </p>

                </div>

              ) : notifications.length === 0 ? (

                <div className="notification-empty">

                  <i className="bi bi-bell-slash"></i>

                  <h6>
                    No Notifications
                  </h6>

                  <p>
                    You're all caught up.
                  </p>

                </div>

              ) : (

                notifications
                  .slice(0, 5)
                  .map((notification) => {

                    const isUnread =
                      !readIds.includes(
                        notification._id
                      );

                    return (

                      <div
                        key={notification._id}
                        className={`notification-item ${
                          isUnread
                            ? "unread"
                            : ""
                        }`}
                        onClick={() =>
                          markAsRead(
                            notification._id
                          )
                        }
                      >


                        {/* ICON */}

                        <div
                          className={`notification-icon ${
                            getNotificationClass(
                              notification.type
                            )
                          }`}
                        >

                          <i
                            className={getNotificationIcon(
                              notification.type
                            )}
                          ></i>

                        </div>


                        {/* CONTENT */}

                        <div className="notification-content">

                          <div className="notification-title-row">

                            <h6>
                              {notification.title}
                            </h6>

                            {isUnread && (
                              <span className="unread-dot"></span>
                            )}

                          </div>


                          <p>
                            {notification.message}
                          </p>


                          <small>

                            <i className="bi bi-calendar3"></i>

                            {" "}

                            {formatDate(
                              notification.notificationDate
                            )}

                          </small>


                          {/* ATTACHMENT */}

                          {notification.attachment?.url && (

                            <a
                              href={
                                notification
                                  .attachment
                                  .url
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="notification-attachment"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >

                              <i className="bi bi-paperclip"></i>

                              View Attachment

                            </a>

                          )}

                        </div>

                      </div>

                    );

                  })

              )}

            </div>


            {/* FOOTER */}

            {notifications.length > 0 && (

              <div className="notification-footer">

                <Link
                  to="/notifications"
                  onClick={() => setOpen(false)}
                >

                  View All Notifications

                  <i className="bi bi-arrow-right"></i>

                </Link>

              </div>

            )}

          </div>

        </>

      )}

    </div>

  );

};

export default NotificationDropdown;