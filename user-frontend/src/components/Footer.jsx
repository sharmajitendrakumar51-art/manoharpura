import { Link } from "react-router-dom";
import "../assets/css/Footer.css";
import logo from "../assets/images/mokshdhamlogo.jpg";

const Footer = () => {
  return (
    <>
      <footer className="footer mt-5" >

        <div className="container">

          <div className="row gy-5">

            {/* About */}

            <div className="col-lg-4 col-md-6">

              <div className="footer-logo d-flex align-items-center">

                <img src={logo} alt="Logo" />

                <div className="ms-3">

                  <h4>Manoharpura Mokshdham Vikas Samiti</h4>

                  <p>Seva • Samarpan • Sanskaar</p>

                </div>

              </div>

              <p className="footer-about mt-4">

                Manoharpura Mokshdham Vikas Samiti is committed to
                providing respectful services, community welfare, and better
                facilities with transparency and dedication.

              </p>

              <div className="social-icons">

                
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

                <a href="#"><i className="bi bi-whatsapp"></i></a>

              </div>

            </div>

            {/* Quick Links */}

            <div className="col-lg-2 col-md-6">

              <h5>Quick Links</h5>

              <ul>

                <li><Link to="/">Home</Link></li>

                <li><Link to="/about">About</Link></li>

                <li><Link to="/membership">Membership</Link></li>

                <li><Link to="/gallery">Gallery</Link></li>

                <li><Link to="/contact">Contact</Link></li>

              </ul>

            </div>

            {/* Useful */}

            <div className="col-lg-3 col-md-6">

              <h5>Useful Information</h5>

              <ul>

                <li><Link to="/committee">Executive Committee</Link></li>

                <li><Link to="/event">Upcoming Events</Link></li>

                <li><Link to="/membership">Membership Registration</Link></li>

                <li><Link to="/gallery">Photo Gallery</Link></li>

                <li><Link to="/contact">Support</Link></li>

              </ul>

            </div>

            {/* Contact */}

            <div className="col-lg-3 col-md-6">

              <h5>Contact Us</h5>

              <ul className="contact-list">

                <li>
                  <a href="https://maps.app.goo.gl/vdLQ3xyQyb5tZrZL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                 <i className="bi bi-geo-alt-fill"></i>
                 Jaipur, Rajasthan
                 </a>
                </li>

                <li>
                  <a href="tel:+919828226516">
                    <i className="bi bi-telephone-fill"></i>
                    +91 9828226516
                  </a>
                </li>
                 
                  <li>
                  <a href="tel:+919828399184">
                    <i className="bi bi-telephone-fill"></i>
                    +91 9828399184
                  </a>
                </li>

                <li>
                    <a href="mailto:mmvsjaipur@gmail.com">
                      <i className="bi bi-envelope-fill"></i>
                       mmvsjaipur@gmail.com
                    </a>
                </li>

                <li>
                  <i className="bi bi-globe2"></i>
                  www.mokshdham.com
                </li>

              </ul>

            </div>

          </div>

          <hr />

          <div className="footer-bottom">

            <p>
              © {new Date().getFullYear()} Manoharpura Mokshdham Vikas Samiti. All Rights Reserved.
            </p>

            <p>
              Designed & Developed by <strong>Jitendra Sharma</strong>
            </p>

          </div>

        </div>

        {/* Back To Top */}

        <a href="#" className="back-top">
          <i className="bi bi-arrow-up"></i>
        </a>

      </footer>
    </>
  );
};

export default Footer;