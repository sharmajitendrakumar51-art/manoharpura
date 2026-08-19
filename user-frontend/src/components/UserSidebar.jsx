import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/UserLayout.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";

const UserSidebar = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };


  const handleMenuClick = () => {

    if (window.innerWidth <= 768) {
      onClose();
    }

  };


  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          className="user-sidebar-overlay"
          onClick={onClose}
        ></div>
      )}


      {/* Sidebar */}

      <aside
        className={`user-sidebar ${
          isOpen ? "mobile-open" : ""
        }`}
      >


        {/* Header */}

        <div className="user-sidebar-header">

          <div className="user-sidebar-icon">
             <img
                        src={mokshdhamlogo}
                        alt="Logo"
                      />
          </div>


          <div className="user-sidebar-brand">

            <h3>User Panel</h3>

            <span>
              Manoharpura Mokshdham
            </span>

          </div>

        </div>


        {/* Menu */}

        <nav className="user-sidebar-menu">


          <NavLink
            to="/user/dashboard"
            className="user-sidebar-link"
            onClick={handleMenuClick}
          >
            <i className="bi bi-grid-fill"></i>

            <span>
              Dashboard
            </span>
          </NavLink>


          <NavLink
            to="/user/profile"
            className="user-sidebar-link"
            onClick={handleMenuClick}
          >
            <i className="bi bi-person-fill"></i>

            <span>
              Profile
            </span>
          </NavLink>


          <NavLink
            to="/user/members"
            className="user-sidebar-link"
            onClick={handleMenuClick}
          >
            <i className="bi bi-people-fill"></i>

            <span>
              Members
            </span>
          </NavLink>


          <NavLink
            to="/user/renew-membership"
            className="user-sidebar-link"
            onClick={handleMenuClick}
          >
            <i className="bi bi-arrow-repeat"></i>

            <span>
              Renew Membership
            </span>
          </NavLink>


          <NavLink
            to="/user/donation"
            className="user-sidebar-link"
            onClick={handleMenuClick}
          >
            <i className="bi bi-heart-fill"></i>

            <span>
              Donation
            </span>
          </NavLink>


          <NavLink
            to="/user/change-password"
            className="user-sidebar-link"
            onClick={handleMenuClick}
          >
            <i className="bi bi-lock-fill"></i>

            <span>
              Change Password
            </span>
          </NavLink>

        </nav>


        {/* Logout */}

        <div className="user-sidebar-bottom">

          <button
            type="button"
            className="user-logout-btn"
            onClick={handleLogout}
          >

            <i className="bi bi-box-arrow-right"></i>

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
};

export default UserSidebar;