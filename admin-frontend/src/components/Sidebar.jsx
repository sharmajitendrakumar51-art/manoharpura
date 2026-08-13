import { NavLink } from "react-router-dom";
import "../assets/css/Sidebar.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {

  const closeSidebar = () => {

    if (window.innerWidth < 992) {
      setMobileOpen(false);
    }

  };

  return (
    <>

      {/* Overlay */}

      <div
        className={`sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}

      <aside className={`sidebar ${mobileOpen ? "show" : ""}`}>

        {/* Logo */}

        <div className="sidebar-logo">

          <img
            src={mokshdhamlogo}
            alt="Logo"
          />

          <div>

            <h4>Admin Panel</h4>

            <small>Manoharpura Mokshdham</small>

          </div>

        </div>

        {/* Menu */}

        <ul className="sidebar-menu">

          <li>

            <NavLink to="/dashboard" onClick={closeSidebar}>

              <i className="bi bi-speedometer2"></i>

              <span>Dashboard</span>

            </NavLink>

          </li>

          <li>
           <NavLink to="/hero" onClick={closeSidebar}>
           <i className="bi bi-images"></i>
           <span>Hero Carousel</span>
           </NavLink>
          </li>

          <li>

            <NavLink to="/members" onClick={closeSidebar}>

              <i className="bi bi-people-fill"></i>

              <span>Members</span>

            </NavLink>

          </li>

          <li>

            <NavLink to="/inactivemember" onClick={closeSidebar}>

              <i className="bi bi-person-badge-fill"></i>

              <span>Inactive Members</span>

            </NavLink>

          </li>

          <li>

            <NavLink to="/events" onClick={closeSidebar}>

              <i className="bi bi-calendar-event-fill"></i>

              <span>Events</span>

            </NavLink>

          </li>
          <li>

            <NavLink to="/news" onClick={closeSidebar}>

              <i className="bi bi-newspaper"></i>

              <span>News</span>

            </NavLink>

          </li>

          <li>

            <NavLink to="/gallery" onClick={closeSidebar}>

              <i className="bi bi-images"></i>

              <span>Gallery</span>

            </NavLink>

          </li>

          <li>

            <NavLink to="/notifications" onClick={closeSidebar}>
    <i className="bi bi-bell-fill"></i>
    <span>Notifications</span>
</NavLink>

          </li>

          <li>

            <NavLink to="/settings" onClick={closeSidebar}>

              <i className="bi bi-gear-fill"></i>

              <span>Settings</span>

            </NavLink>

          </li>

        </ul>

        {/* Footer */}

        <div className="sidebar-footer">

          <NavLink to="/" onClick={closeSidebar}>

            <i className="bi bi-box-arrow-right"></i>

            <span>Logout</span>

          </NavLink>

        </div>

      </aside>

    </>
  );

};

export default Sidebar;