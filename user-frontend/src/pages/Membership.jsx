import { useNavigate } from "react-router-dom";
import "../assets/css/Membership.css";

const Membership = () => {

  const navigate = useNavigate();

  return (
    <div className="membership-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="membership-hero">

        <div className="membership-hero-content">

          <div className="membership-eyebrow">
            <i className="bi bi-people-fill"></i>
            Membership
          </div>

          <h1>
            Become a Member
          </h1>

          <p>
            Join Manoharpura Mokshdham Vikas Samiti and
            contribute towards Seva, Samarpan & Sanskaar.
          </p>

          <button
            className="membership-apply-btn"
            onClick={() => navigate("/apply-membership")}
          >
            <i className="bi bi-person-plus-fill"></i>

            Apply Membership

            <i className="bi bi-arrow-right"></i>
          </button>

        </div>

      </section>


      {/* =========================================
          ELIGIBILITY
      ========================================= */}

      <section className="membership-section">

        <div className="membership-container">

          <div className="section-heading">

            <span>
              <i className="bi bi-check-circle-fill"></i>
              Eligibility
            </span>

            <h2>
              Who Can Become a Member?
            </h2>

            <p>
              The person having the following eligibility
              can become a member of the society.
            </p>

          </div>


          <div className="eligibility-grid">

            <div className="eligibility-card">

              <div className="eligibility-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <h3>Resident</h3>

              <p>
                Resides in the area where the society operates.
              </p>

            </div>


            <div className="eligibility-card">

              <div className="eligibility-icon">
                <i className="bi bi-person-check-fill"></i>
              </div>

              <h3>Adult Person</h3>

              <p>
                Be an adult person belonging to Rajasthan State.
              </p>

            </div>


            <div className="eligibility-card">

              <div className="eligibility-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <h3>Good Standing</h3>

              <p>
                Must not be insane or bankrupt.
              </p>

            </div>


            <div className="eligibility-card">

              <div className="eligibility-icon">
                <i className="bi bi-heart-fill"></i>
              </div>

              <h3>Faith & Interest</h3>

              <p>
                Has interest and faith in the objectives
                of the Society.
              </p>

            </div>


            <div className="eligibility-card">

              <div className="eligibility-icon">
                <i className="bi bi-building-check"></i>
              </div>

              <h3>Society First</h3>

              <p>
                Understands the interest of the Society
                as paramount.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          MEMBERSHIP FEES
      ========================================= */}

      <section className="membership-fee-section">

        <div className="membership-container">

          <div className="section-heading">

            <span>
              <i className="bi bi-wallet2"></i>
              Membership Fee
            </span>

            <h2>
              Choose Your Membership
            </h2>

            <p>
              Select the membership plan that suits you.
            </p>

          </div>


          <div className="membership-plans">

            {/* Annual */}

            <div className="membership-plan">

              <div className="plan-icon">
                <i className="bi bi-calendar-check"></i>
              </div>

              <h3>
                Annual Membership
              </h3>

              <div className="plan-price">
                ₹500
              </div>

              <p>
                Membership Fee per year
              </p>

              <ul>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Valid for one year
                </li>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Society membership
                </li>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Subject to approval
                </li>

              </ul>

              <button
                onClick={() =>
                  navigate("/apply-membership?type=annual")
                }
              >
                Apply Now
                <i className="bi bi-arrow-right"></i>
              </button>

            </div>


            {/* Lifetime */}

            <div className="membership-plan featured">

              <div className="recommended-badge">
                Recommended
              </div>

              <div className="plan-icon">
                <i className="bi bi-infinity"></i>
              </div>

              <h3>
                Lifetime Membership
              </h3>

              <div className="plan-price">
                ₹5,100
              </div>

              <p>
                One-time membership fee
              </p>

              <ul>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Lifetime membership
                </li>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Society membership
                </li>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Subject to approval
                </li>

              </ul>

              <button
                onClick={() =>
                  navigate("/apply-membership?type=lifetime")
                }
              >
                Apply Now
                <i className="bi bi-arrow-right"></i>
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          APPLICATION PROCESS
      ========================================= */}

      <section className="membership-section">

        <div className="membership-container">

          <div className="section-heading">

            <span>
              <i className="bi bi-list-check"></i>
              Application Process
            </span>

            <h2>
              How to Become a Member?
            </h2>

          </div>


          <div className="application-steps">

            <div className="application-step">

              <div className="step-number">
                01
              </div>

              <div>
                <h3>
                  Fill Application
                </h3>

                <p>
                  Fill in the required personal,
                  contact and membership details.
                </p>
              </div>

            </div>


            <div className="application-step">

              <div className="step-number">
                02
              </div>

              <div>
                <h3>
                  Document Review
                </h3>

                <p>
                  The committee will review your
                  application and documents.
                </p>
              </div>

            </div>


            <div className="application-step">

              <div className="step-number">
                03
              </div>

              <div>
                <h3>
                  Membership Approval
                </h3>

                <p>
                  If the application meets the
                  eligibility criteria, you will be
                  registered as a member.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          NOMINATED MEMBERS
      ========================================= */}

      <section className="nominated-section">

        <div className="membership-container">

          <div className="section-heading">

            <span>
              <i className="bi bi-person-lines-fill"></i>
              Membership Application
            </span>

            <h2>
              Contact Our Nominated Members
            </h2>

            <p>
              Interested persons may apply for obtaining
              a Membership from the following members
              nominated by Society.
            </p>

          </div>


          <div className="nominated-grid">

            <div className="nominated-card">

              <div className="nominated-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>

                <h3>
                  Mr. Shankar Lal Mourya
                </h3>

                <p>
                  Nominated Member
                </p>

                <a href="tel:+919782154208">
                  <i className="bi bi-telephone-fill"></i>
                  +91 9782154208
                </a>

              </div>

            </div>


            <div className="nominated-card">

              <div className="nominated-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div>

                <h3>
                  Mr. Ashok Kumar Joshi
                </h3>

                <p>
                  Nominated Member
                </p>

                <a href="tel:+918239630520">
                  <i className="bi bi-telephone-fill"></i>
                  +91 8239630520
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          CERTIFICATION
      ========================================= */}

      <section className="membership-certification">

        <div className="membership-container">

          <div className="certification-box">

            <div className="certification-icon">
              <i className="bi bi-patch-check-fill"></i>
            </div>

            <div>

              <h3>
                Certified
              </h3>

              <p>
                This is to certify that a true copy of
                the rules and regulations of the society
                is available with office of the society.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="membership-cta">

        <div className="membership-container">

          <h2>
            Ready to Become a Member?
          </h2>

          <p>
            Fill out the membership application form
            and take the first step towards serving
            the community.
          </p>

          <button
            onClick={() =>
              navigate("/apply-membership")
            }
          >
            <i className="bi bi-person-plus-fill"></i>
            Apply Membership
          </button>

        </div>

      </section>

    </div>
  );
};

export default Membership;