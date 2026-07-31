import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Membership from "../pages/Membership";
import ExecutiveCommittee from "../pages/ExecutiveCommittee";
import EventDetails from "../pages/EventDetails";
import Gallery from "../pages/Gallery";

const MainRouter = () => {
  return (
    <Router>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/membership" element={<Membership />} />
        <Route path="/executivecommittee" element={<ExecutiveCommittee />}/>
        <Route path="/eventdetails" element={<EventDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />

    </Router>
  );
};

export default MainRouter;