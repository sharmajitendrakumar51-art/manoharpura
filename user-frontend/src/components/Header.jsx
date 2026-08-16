import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";
import "../assets/css/Header.css";

import NotificationDropdown from "./NotificationDropdown";

const Header = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const [topbarIndex, setTopbarIndex] = useState(0);

  const topbarItems = [
    {
      icon: "bi-telephone-fill",
      text: "+91 9828226516",
      link: "tel:+919828226516",
    },
    {
      icon: "bi-telephone-fill",
      text: "+91 98283 99184",
      link: "tel:+919828399184",
    },
    {
      icon: "bi-envelope-fill",
      text: "mmvsjaipur@gmail.com",
      link: "mailto:mmvsjaipur@gmail.com",
    },
    {
      icon: "bi-geo-alt-fill",
      text: "Jaipur, Rajasthan",
      link: "https://maps.app.goo.gl/vdLQ3xyQyb5tZrZL6",
    },
    {
      icon: "bi-facebook",
      text: "Facebook",
      link: "https://www.facebook.com/ManoharpuraMokshdham",
    },
    {
      icon: "bi-instagram",
      text: "Instagram",
      link: "https://www.instagram.com/manoharpuramokshdham",
    },
    {
      icon: "bi-youtube",
      text: "YouTube",
      link: "https://www.youtube.com/@ManoharpuraMokshdham",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTopbarIndex((prev) => (prev + 1) % topbarItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  // Menu open / close
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Link click hone par menu close
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };



  return (
    <>

    <header className="main-header">
       {/* ==============================
      MOBILE TOPBAR SLIDER
  ================================ */}

  <div className="mobile-topbar-slider">

    <div
      className="mobile-topbar-slide"
      key={topbarIndex}
    >

      <a
        href={topbarItems[topbarIndex].link}
        target={
          topbarItems[topbarIndex].icon === "bi-geo-alt-fill" ||
          topbarItems[topbarIndex].icon === "bi-facebook" ||
          topbarItems[topbarIndex].icon === "bi-instagram" ||
          topbarItems[topbarIndex].icon === "bi-youtube"
            ? "_blank"
            : undefined
        }
        rel="noopener noreferrer"
      >

        <i
          className={`bi ${topbarItems[topbarIndex].icon}`}
        ></i>

        <span>
          {topbarItems[topbarIndex].text}
        </span>

      </a>

    </div>

  </div>
      {/* Top Bar */}

      <div className="topbar d-none d-lg-block">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <div className="contact-info">

               <span>
  <a href="tel:+919828226516">
    <i className="bi bi-telephone-fill"></i>
    +91 9828226516
  </a>
</span>

<span>
  <a href="tel:+919828399184">
    <i className="bi bi-telephone-fill"></i>
    +91 98283 99184
  </a>
</span>

                <span>
                  <a href="mailto:mmvsjaipur@gmail.com">
                  <i className="bi bi-envelope-fill"></i>
                   mmvsjaipur@gmail.com
                  </a>
                </span>

                <span>
                  <a href="https://maps.app.goo.gl/vdLQ3xyQyb5tZrZL6"
                   target="_blank"
                  rel="noopener noreferrer"
                  >
                  <i className="bi bi-geo-alt-fill"></i>
                  Jaipur, Rajasthan
                   </a>
                </span>

              </div>

            </div>

           <div className="col-lg-4 text-end">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/ManoharpuraMokshdham"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <i className="bi bi-facebook"></i>
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/manoharpuramokshdham"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <i className="bi bi-instagram"></i>
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/@ManoharpuraMokshdham"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <i className="bi bi-youtube"></i>
  </a>

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

  {/* ================= Notification ================= */}

  <NotificationDropdown />


  {/* ================= Login ================= */}

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


  {/* ================= Hamburger ================= */}

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
             Media Coverage
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

     {/* =========================
    MOBILE MENU
========================= */}

<div
  className="offcanvas offcanvas-start mobile-menu"
  id="mobileMenu"
  tabIndex="-1"
>

  {/* =========================
      Mobile Menu Header
  ========================= */}

  <div className="offcanvas-header mobile-menu-header">

    <div className="mobile-menu-title">

      <img
        src={mokshdhamlogo}
        alt="Manoharpura Mokshdham"
      />

      <div>
        <h5>Manoharpura Mokshdham</h5>
        <small>Seva • Samarpan • Sanskaar</small>
      </div>

    </div>

    
    {/* CLOSE BUTTON */}
  <button
    type="button"
    className="mobile-menu-close"
    data-bs-dismiss="offcanvas"
    aria-label="Close"
  >
    <i className="bi bi-x-lg"></i>
  </button>



  </div>


  {/* =========================
      Mobile Menu Body
  ========================= */}

  <div className="offcanvas-body mobile-menu-body">

    <ul className="navbar-nav mobile-nav">

      <li>
  <NavLink
    className="nav-link"
    to="/"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-house-door-fill"></i>
    <span>Home</span>
  </NavLink>
</li>


     <li>
  <NavLink
    className="nav-link"
    to="/about"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-info-circle-fill"></i>
    <span>About</span>
  </NavLink>
</li>


     <li>
  <NavLink
    className="nav-link"
    to="/membership"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-people-fill"></i>
    <span>Membership</span>
  </NavLink>
</li>


     <li>
  <NavLink
    className="nav-link"
    to="/committee"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-person-badge-fill"></i>
    <span>Executive Committee</span>
  </NavLink>
</li>


    <li>
  <NavLink
    className="nav-link"
    to="/events"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-calendar-event-fill"></i>
    <span>Events</span>
  </NavLink>
</li>


      <li>
  <NavLink
    className="nav-link"
    to="/news"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-newspaper"></i>
    <span>Media Coverage</span>
  </NavLink>
</li>


     <li>
  <NavLink
    className="nav-link"
    to="/gallery"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-images"></i>
    <span>Gallery</span>
  </NavLink>
</li>


     <li>
  <NavLink
    className="nav-link"
    to="/contact"
    onClick={closeMobileMenu}
  >
    <i className="bi bi-envelope-fill"></i>
    <span>Contact</span>
  </NavLink>
</li>

    </ul>


    {/* Divider */}

    <div className="mobile-menu-divider"></div>


    {/* Login */}

    <Link
  to="/login"
  className="mobile-login-btn"
  onClick={closeMobileMenu}
>
  <i className="bi bi-person-circle"></i>
  <span>Login / Profile</span>
</Link>

  </div>

</div>

    </>
  );
};

export default Header;