import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";


// =========================
// Authentication
// =========================

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";


// =========================
// Main Pages
// =========================

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


// =========================
// User Panel
// =========================

import UserLayout from "../layouts/UserLayout";

import UserDashboard from "../pages/user/UserDashboard";
import UserProfile from "../pages/user/UserProfile";
import UserMembers from "../pages/user/UserMembers";
import RenewMembership from "../pages/user/RenewMembership";
import FeeMembership from "../pages/user/FeeMembership";
import UserDonation from "../pages/user/UserDonation";
import ChangePassword from "../pages/user/ChangePassword";

import ApplyMembership from "../pages/user/ApplyMembership";
import EditProfile from "../pages/user/EditProfile";
// =====================================================
// Main Content
// =====================================================

const MainContent = () => {

  const location = useLocation();

  // User Panel route check
  const isUserPanel =
    location.pathname.startsWith("/user");

  return (
    <>
      
      {/* =================================
          Public Website Header
      ================================= */}

      {!isUserPanel && <Header />}


      <Routes>

        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />


        {/* =================================
            AUTHENTICATION
        ================================= */}

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


        {/* =================================
            MEMBERSHIP
        ================================= */}

        <Route
          path="/membership"
          element={<Membership />}
        />


        {/* =================================
            COMMITTEE
        ================================= */}

        <Route
          path="/committee"
          element={<ExecutiveCommittee />}
        />


        {/* =================================
            EVENTS
        ================================= */}

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/eventdetails/:id"
          element={<EventDetails />}
        />


        {/* =================================
            NEWS
        ================================= */}

        <Route
          path="/news"
          element={<News />}
        />

        <Route
          path="/newsdetails/:id"
          element={<NewsDetails />}
        />


        {/* =================================
            GALLERY
        ================================= */}

        <Route
          path="/gallery"
          element={<Gallery />}
        />


        {/* =================================
            NOTIFICATIONS
        ================================= */}

        <Route
          path="/notifications"
          element={<Notifications />}
        />


        {/* =================================
            CONTACT
        ================================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />


       {/* =================================
    USER PANEL
================================= */}

<Route
    path="/user"
    element={<UserLayout />}
>

    {/* /user */}
    <Route
        index
        element={<UserDashboard />}
    />

    {/* /user/dashboard */}
    <Route
        path="dashboard"
        element={<UserDashboard />}
    />

    {/* /user/profile */}
    <Route
        path="profile"
        element={<UserProfile />}
    />

    {/* /user/members */}
    <Route
        path="members"
        element={<UserMembers />}
    />

    {/* /user/membership/apply */}
    <Route
        path="membership/apply"
        element={<ApplyMembership />}
    />

    {/* /user/renew-membership */}
    <Route
        path="renew-membership"
        element={<RenewMembership />}
    />
     <Route
        path="fee-membership"
        element={<FeeMembership />}
    />


    <Route
  path="profile/edit"
  element={<EditProfile />}
/>

    {/* /user/donation */}
    <Route
        path="donation"
        element={<UserDonation />}
    />

    {/* /user/change-password */}
    <Route
        path="change-password"
        element={<ChangePassword />}
    />

</Route>

      </Routes>


      {/* =================================
          Public Website Footer
      ================================= */}

      {!isUserPanel && <Footer />}

    </>
  );
};


// =====================================================
// Main Router
// =====================================================

const MainRouter = () => {

  return (
    <Router>

      <MainContent />

    </Router>
  );

};

export default MainRouter;