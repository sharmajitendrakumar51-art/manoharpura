import "../assets/css/Topbar.css";

const Topbar = ({ setMobileOpen }) => {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (

    <header className="topbar">

      {/* Left */}

      <div className="topbar-left">

        {/* Mobile Menu */}

        <button
          className="menu-btn"
          onClick={() => setMobileOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>

        <div>

          <h3>Dashboard</h3>

          <small>{today}</small>

        </div>

      </div>

      {/* Right */}

      <div className="topbar-right">

        {/* Search */}

        <div className="search-box">

          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        {/* Notification */}

        <button className="icon-btn">

          <i className="bi bi-bell-fill"></i>

          <span className="notify-badge">
            3
          </span>

        </button>

        {/* Profile */}

        <div className="dropdown">

          <button
            className="btn profile-btn dropdown-toggle"
            data-bs-toggle="dropdown"
          >

            <img
              src="https://ui-avatars.com/api/?name=Admin&background=0D47A1&color=fff"
              alt="admin"
            />

            <span>Admin</span>

          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            <li>

              <button className="dropdown-item">

                <i className="bi bi-person-circle me-2"></i>

                My Profile

              </button>

            </li>

            <li>

              <button className="dropdown-item">

                <i className="bi bi-gear me-2"></i>

                Settings

              </button>

            </li>

            <li>

              <hr className="dropdown-divider" />

            </li>

            <li>

              <button className="dropdown-item text-danger">

                <i className="bi bi-box-arrow-right me-2"></i>

                Logout

              </button>

            </li>

          </ul>

        </div>

      </div>

    </header>

  );

};

export default Topbar;