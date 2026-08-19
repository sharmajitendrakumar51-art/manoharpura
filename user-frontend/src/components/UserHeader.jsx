import "../assets/css/UserLayout.css";

const UserHeader = ({ onMenuClick }) => {

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="user-header">

      {/* LEFT SIDE */}

      <div className="user-header-left">

        {/* Mobile Menu */}

        <button
          type="button"
          className="user-menu-btn"
          onClick={onMenuClick}
          aria-label="Open Menu"
        >
          <i className="bi bi-list"></i>
        </button>


        {/* Brand */}

        <div className="user-header-title">

          <h2>
            Dashboard
          </h2>

          <p>
            {currentDate}
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="user-header-right">

        {/* Notification */}

        <button
          type="button"
          className="user-header-icon"
          aria-label="Notifications"
        >
          <i className="bi bi-bell"></i>

          <span className="notification-dot"></span>

        </button>


        {/* User Profile */}

        <div className="user-header-profile">

          <div className="user-header-avatar">

            <i className="bi bi-person-fill"></i>

          </div>


          <div className="user-header-user-info">

            <strong>
              User
            </strong>

            <span>
              Member
            </span>

          </div>

        </div>

      </div>

    </header>
  );
};

export default UserHeader;