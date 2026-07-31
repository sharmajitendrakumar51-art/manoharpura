import "../assets/css/Contact.css";

const Contact = () => {
  return (
    <>
      

      {/* Contact Information */}

      <section className="contact-info-section">

        <div className="container">

          <div className="row g-4">

            {/* Registered Address */}

            <div className="col-lg-4 col-md-6">

              <div className="contact-card">

                <div className="contact-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>

                <h4>Registered Address</h4>

                <p>
                  <strong>Manoharpura Mokshdham Vikas Samiti</strong>
                </p>

                <p>
                  Village Manoharpura,
                  <br />
                  Jagatpura,
                  <br />
                  Jaipur - 302017
                  <br />
                  Rajasthan, India
                </p>

              </div>

            </div>

            {/* Email */}

            <div className="col-lg-4 col-md-6">

              <div className="contact-card">

                <div className="contact-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>

                <h4>Email & Contact</h4>

                <p>

                  <strong>Email</strong>

                </p>

                <p>mmvsjaipur@gmail.com</p>

                <p>

                  <strong>Contact</strong>

                </p>

                <p>+91 9828226516</p>

              </div>

            </div>

            {/* Correspondence */}

            <div className="col-lg-4 col-md-12">

              <div className="contact-card">

                <div className="contact-icon">
                  <i className="bi bi-person-badge-fill"></i>
                </div>

                <h4>Correspondence Address</h4>

                <p>

                  <strong>
                    Lala Ram Sharma
                  </strong>

                </p>

                <p>
                  Secretary
                </p>

                <p>
                  Baknado ki Dhani,
                  <br />
                  Manoharpura,
                  <br />
                  Mithila Vihar-II,
                  <br />
                  Jagatpura,
                  <br />
                  Jaipur - 302017
                </p>

                <p>

                  <strong>
                    Contact:
                  </strong>

                  <br />

                  +91 9828399184

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Google Map */}

<section className="map-section">

  <div className="container">

    <div className="section-title">

      <h2>Find Us on Map</h2>

      <p>
        Manoharpura Mokshdham Vikas Samiti, Jaipur
      </p>

    </div>

    <div className="map-card">

      <iframe
        title="Google Map"
        src="https://maps.google.com/maps?q=Manoharpura%20Mokshdham%20Vikas%20Samiti&t=&z=13&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="370"
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen=""
      ></iframe>

    </div>

  </div>

</section>

    </>
  );
};

export default Contact;