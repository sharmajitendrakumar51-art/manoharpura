import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

// Authentication Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";

// Main Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Membership from "../pages/Membership";
import ExecutiveCommittee from "../pages/ExecutiveCommittee";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import News from "../pages/News";
import NewsDetails from "../pages/NewsDetails";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Notifications from "../pages/Notifications";



const MainRouter = () => {

  return (

    <Router>

      {/* =========================
          Header
      ========================= */}

      <Header />


      {/* =========================
          Routes
      ========================= */}

      <Routes>

        {/* =========================
            Home
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            About
        ========================= */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* =========================
            Authentication
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* =========================
            Membership
        ========================= */}

        <Route
          path="/membership"
          element={<Membership />}
        />


        {/* =========================
            Executive Committee
        ========================= */}

        <Route
          path="/committee"
          element={<ExecutiveCommittee />}
        />


        {/* =========================
            Events
        ========================= */}

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/eventdetails/:id"
          element={<EventDetails />}
        />


        {/* =========================
            News
        ========================= */}

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/newsdetails/:id"
         element={<NewsDetails />}
            />


        {/* =========================
            Gallery
        ========================= */}

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
  path="/notifications"
  element={<Notifications />}
/>


        {/* =========================
            Contact
        ========================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>


      {/* =========================
          Footer
      ========================= */}

      <Footer />

    </Router>

  );

};

export default MainRouter;