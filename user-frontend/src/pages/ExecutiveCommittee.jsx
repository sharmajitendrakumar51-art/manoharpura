import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/ExecutiveCommittee.css";

const ExecutiveCommittee = () => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Active Executive Committee Members
  // ==========================================

  const fetchMembers = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/member/get-members"
      );

      console.log(
        "Members API Response:",
        response.data
      );

      if (response.data.success) {

        const allMembers =
          response.data.members || [];

        // Only Active Executive Committee Members
        const committeeMembers =
          allMembers.filter(
            (member) =>
              member.status === "Active" &&
              (
                member.isExecutiveCommittee === true ||
                member.isExecutiveCommittee === "true"
              )
          );

        setMembers(committeeMembers);

      } else {

        setError(
          response.data.message ||
          "Unable to load committee members."
        );

      }

    } catch (error) {

      console.error(
        "Committee Members Error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load committee members."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // Fetch Data
  // ==========================================

  useEffect(() => {

    fetchMembers();

  }, []);


  // ==========================================
  // Get Committee Year
  // ==========================================

  const getCommitteeYear = (member) => {

    if (!member.validFrom) {
      return "Current Committee";
    }

    const fromYear = new Date(
      member.validFrom
    ).getFullYear();

    if (!member.validTo) {

      return `${fromYear}-${String(
        fromYear + 1
      ).slice(-2)}`;

    }

    const toYear = new Date(
      member.validTo
    ).getFullYear();

    return `${fromYear}-${String(
      toYear
    ).slice(-2)}`;

  };


  // ==========================================
  // Group Members Year Wise
  // ==========================================

  const groupedMembers = members.reduce(
    (groups, member) => {

      const year = getCommitteeYear(member);

      if (!groups[year]) {
        groups[year] = [];
      }

      groups[year].push(member);

      return groups;

    },
    {}
  );


  // ==========================================
  // Latest Year First
  // ==========================================

  const sortedYears = Object.keys(
    groupedMembers
  ).sort((a, b) => {

    const yearA =
      parseInt(
        a.match(/\d{4}/)?.[0]
      ) || 0;

    const yearB =
      parseInt(
        b.match(/\d{4}/)?.[0]
      ) || 0;

    return yearB - yearA;

  });


  return (

    <div className="committee-page">


      {/* ======================================
          HERO
      ====================================== */}

      <section className="committee-hero">

        <div className="committee-container">

          <span className="committee-small-title">
            Leadership & Service
          </span>

          <h1>
            Executive Committee
          </h1>

          <p>
            Meet the dedicated members of
            Manoharpura Mokshdham Vikas Samiti
            serving the community with{" "}

            <strong>
              Seva, Samarpan & Sanskaar.
            </strong>
          </p>

        </div>

      </section>


      {/* ======================================
          INTRODUCTION
      ====================================== */}

      <section className="committee-intro">

        <div className="committee-container">

          <span className="section-tag">
            Our Leadership
          </span>

          <h2>
            Serving With Responsibility
          </h2>

          <p>
            The Executive Committee of Manoharpura
            Mokshdham Vikas Samiti works together
            to guide the organization, manage its
            activities and serve the community with
            dedication and responsibility.
          </p>

        </div>

      </section>


      {/* ======================================
          COMMITTEE MEMBERS
      ====================================== */}

      <section className="committee-members-section">

        <div className="committee-container">


          {/* Section Heading */}

          <div className="section-heading">

            <span className="section-tag">
              Committee Members
            </span>

            <h2>
              Our Executive Committee
            </h2>

            <p>
              Meet the members serving the
              organization year by year.
            </p>

          </div>


          {/* ==================================
              LOADING
          ================================== */}

          {loading && (

            <div className="committee-loading">

              <div
                className="spinner-border"
                role="status"
              ></div>

              <p>
                Loading committee members...
              </p>

            </div>

          )}


          {/* ==================================
              ERROR
          ================================== */}

          {!loading && error && (

            <div className="committee-error">

              <i className="bi bi-exclamation-circle"></i>

              <h3>
                Unable to load committee members
              </h3>

              <p>
                {error}
              </p>

              <button
                className="committee-retry-btn"
                onClick={fetchMembers}
              >
                Try Again
              </button>

            </div>

          )}


          {/* ==================================
              EMPTY
          ================================== */}

          {!loading &&
            !error &&
            sortedYears.length === 0 && (

              <div className="committee-empty">

                <i className="bi bi-people"></i>

                <h3>
                  No Executive Committee Members
                </h3>

                <p>
                  Active executive committee members
                  will appear here.
                </p>

              </div>

            )}


          {/* ==================================
              YEAR WISE MEMBERS
          ================================== */}

          {!loading &&
            !error &&
            sortedYears.length > 0 && (

              <div className="committee-years">

                {sortedYears.map(
                  (year, index) => (

                    <div
                      className="committee-year-block"
                      key={year}
                    >


                      {/* ==========================
                          YEAR HEADING
                      ========================== */}

                      <div className="committee-year-heading">

                        <div className="year-icon">

                          <i className="bi bi-calendar3"></i>

                        </div>

                        <div>

                          <span>
                            {index === 0
                              ? "Latest Committee"
                              : "Committee"}
                          </span>

                          <h3>
                            {year}
                          </h3>

                        </div>

                      </div>


                      {/* ==========================
                          MEMBER CARDS
                      ========================== */}

                      <div className="committee-grid">

                        {groupedMembers[year].map(
                          (member) => (

                            <div
                              className=""
                              key={member._id}
                            >


                              {/* ======================
                                  CIRCULAR IMAGE
                              ====================== */}

                              <div className="committee-image-wrapper">

                                {member.profilePhoto?.url ? (

                                  <img
                                    src={
                                      member.profilePhoto.url
                                    }
                                    alt="Committee Member"
                                    className="committee-member-image"
                                  />

                                ) : (

                                  <div className="committee-placeholder">

                                    <i className="bi bi-person-fill"></i>

                                  </div>

                                )}

                              </div>


                              {/* ======================
                                  POSITION + MOBILE
                              ====================== */}

                              <div className="committee-card-body">

                                {/* Member Name */}
                                 <h3 className="committee-member-name">
                                   {member.fullName || "Committee Member"}
                                  </h3>

  
                                {/* Position */}

                                <div className="committee-designation">

                                  <i className="bi bi-award-fill"></i>

                                  <span>
                                    {
                                      member.designation ||
                                      "Executive Member"
                                    }
                                  </span>

                                </div>


                                {/* Mobile Number */}

                                {member.mobile && (

                                  <div className="committee-mobile">

                                    <i className="bi bi-telephone-fill"></i>

                                    <span>
                                      {member.mobile}
                                    </span>

                                  </div>

                                )}

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

        </div>

      </section>


      {/* ======================================
          COMMITMENT
      ====================================== */}

      {/* <section className="committee-commitment">

        <div className="committee-container">

          <span className="section-tag">
            Our Commitment
          </span>

          <h2>
            Seva • Samarpan • Sanskaar
          </h2>

          <p>
            Together, we continue to work towards
            maintaining a clean, peaceful and
            dignified environment for the community.
          </p>

        </div>

      </section> */}


    </div>

  );

};

export default ExecutiveCommittee;