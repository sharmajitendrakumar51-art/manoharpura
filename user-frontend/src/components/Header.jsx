import { NavLink, Link } from "react-router-dom";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";
import "../assets/css/Header.css";

import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  return (
    <>

    <header className="main-header">
      {/* Top Bar */}

      <div className="topbar d-none d-lg-block">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <div className="contact-info">

                <span>

                  <i className="bi bi-telephone-fill"></i>

                  +91 9828226516

                </span>

                <span>

                  <i className="bi bi-envelope-fill"></i>

                  mmvsjaipur@gmail.com

                </span>

                <span>

                  <i className="bi bi-geo-alt-fill"></i>

                  Jaipur, Rajasthan

                </span>

              </div>

            </div>

            <div className="col-lg-4 text-end">

              <a href="#"><i className="bi bi-facebook"></i></a>

              <a href="#"><i className="bi bi-instagram"></i></a>

              <a href="#"><i className="bi bi-youtube"></i></a>

            </div>

          </div>

        </div>

      </div>

      {/* Navbar */}

    <nav className="navbar bg-white">

  <div className="container">

    {/* Header Top */}
    <div className="header-top">

      {/* Logo */}
      <Link to="/" className="navbar-brand">

        <img
          src={mokshdhamlogo}
          alt="Logo"
          className="logo"
        />

        <div className="brand-text">

          <h4>Manoharpura Mokshdham Vikas Samiti
</h4>

          <small>Seva • Samarpan • Sanskaar</small>

        </div>

      </Link>

      {/* ================= Desktop Right ================= */}

      <div className="header-right d-none d-lg-flex">
       

       {/* Notifications */}

        <NotificationDropdown />

        {/* Login Signup */}

        <div className="dropdown">

          <button
            className="btn user-icon"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-person-circle"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            <li>

              <Link
                className="dropdown-item"
                to="/login"
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>

                Login

              </Link>

            </li>

            <li>

              <Link
                className="dropdown-item"
                to="/signup"
              >
                <i className="bi bi-person-plus-fill me-2"></i>

                Sign Up

              </Link>

            </li>

          </ul>

        </div>

        {/* Profile */}

        <div className="dropdown">

          <button
            className="btn profile-btn "
            data-bs-toggle="dropdown"
          >

            Donate Now

          </button>

        </div>

      </div>

      {/* ================= Mobile Right ================= */}

      <div className="mobile-actions d-flex d-lg-none">

        {/* Login */}

        <div className="dropdown">

          <button
            className="btn user-icon"
            data-bs-toggle="dropdown"
          >

            <i className="bi bi-person-circle"></i>

          </button>

          <ul className="dropdown-menu dropdown-menu-end">

            <li>

              <Link
                className="dropdown-item"
                to="/login"
              >

                <i className="bi bi-box-arrow-in-right me-2"></i>

                Login

              </Link>

            </li>

            <li>

              <Link
                className="dropdown-item"
                to="/signup"
              >

                <i className="bi bi-person-plus-fill me-2"></i>

                Sign Up

              </Link>

            </li>

          </ul>

        </div>

        {/* Hamburger */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
        >

          <i className="bi bi-list"></i>

        </button>

      </div>

    </div>

    {/* ================= Desktop Menu ================= */}

    <div className="header-menu d-none d-lg-block">

      <ul className="navbar-nav flex-row justify-content-center">

        <li className="nav-item">

          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

        </li>

        <li className="nav-item">

          <NavLink className="nav-link" to="/about">
            About
          </NavLink>

        </li>

        <li className="nav-item">

          <NavLink className="nav-link" to="/membership">
            Membership
          </NavLink>

        </li>

        <li className="nav-item">

          <NavLink className="nav-link" to="/committee">
            Executive Committee
          </NavLink>

        </li>

        <li className="nav-item">

          <NavLink className="nav-link" to="/events">
            Events
          </NavLink>

        </li>


        <li className="nav-item">

          <NavLink className="nav-link" to="/news">
             News
          </NavLink>

        </li>

        <li className="nav-item">

          <NavLink className="nav-link" to="/gallery">
            Gallery
          </NavLink>

        </li>

        <li className="nav-item">

          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>

        </li>

      </ul>

    </div>

  </div>

</nav>

 </header>

      {/* Mobile Menu */}

      <div
        className="offcanvas offcanvas-start"
        id="mobileMenu"
      >

        <div className="offcanvas-header">

          <h5>Menu</h5>

          <button
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>

        </div>

        <div className="offcanvas-body">

          <ul className="navbar-nav">

            <li><NavLink className="nav-link" to="/">Home</NavLink></li>

            <li><NavLink className="nav-link" to="/about">About</NavLink></li>

            <li><NavLink className="nav-link" to="/membership">Membership</NavLink></li>

            <li><NavLink className="nav-link" to="/committee">Executive Committee</NavLink></li>

            <li><NavLink className="nav-link" to="/events">Event</NavLink></li>

            <li><NavLink className="nav-link" to="/gallery">Gallery</NavLink></li>

            <li><NavLink className="nav-link" to="/contact">Contact</NavLink></li>

          </ul>

          <hr />

          <button className="btn btn-primary w-100">
            <i className="bi bi-person-circle me-2"></i>

            Login / Profile

          </button>

        </div>

      </div>

    </>
  );
};

export default Header;