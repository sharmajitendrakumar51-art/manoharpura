import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import "../assets/css/News.css";

const News = () => {

  const navigate = useNavigate();

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================================
  // GET ALL NEWS
  // =========================================

  const getNews = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await api.get("/news/");

      console.log("NEWS API RESPONSE:", res.data);

      if (res.data.success) {

        setNewsList(
          Array.isArray(res.data.news)
            ? res.data.news
            : []
        );

      } else {

        setError(
          res.data.message ||
          "Unable to load news."
        );

      }

    } catch (error) {

      console.error("NEWS API ERROR:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load news."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================
  // LOAD NEWS
  // =========================================

  useEffect(() => {

    getNews();

  }, []);


  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {

    if (!date) {
      return "Date not available";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <section className="news-page">

        <div className="news-state">

          <div className="news-loader"></div>

          <p>
            Loading latest news...
          </p>

        </div>

      </section>

    );

  }


  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (

      <section className="news-page">

        <div className="news-state news-error">

          <i className="bi bi-exclamation-circle"></i>

          <h3>
            Unable to Load News
          </h3>

          <p>
            {error}
          </p>

          <button onClick={getNews}>
            Try Again
          </button>

        </div>

      </section>

    );

  }


  return (

    <div className="news-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="news-hero">

        <div className="news-hero-content">

          <span className="news-eyebrow">

            <i className="bi bi-newspaper"></i>

            Latest Updates

          </span>


          <h1>
            News
          </h1>


          {/* <p>
            Stay updated with the latest news,
            announcements and activities of
            Manoharpura Mokshdham Vikas Samiti.
          </p> */}

        </div>

      </section>


      {/* =================================================
          LATEST NEWS
      ================================================= */}

      <section className="news-section">

        <div className="news-container">


          {/* SECTION HEADING */}

          {/* <div className="news-heading">

            <span>

              <i className="bi bi-megaphone-fill"></i>

              What's New

            </span>


            <h2>
              Latest News
            </h2>


            <p>
              Read the latest updates and important
              announcements from our organization.
            </p>

          </div> */}


          {/* =================================================
              NO NEWS
          ================================================= */}

          {newsList.length === 0 ? (

            <div className="news-state">

              <i className="bi bi-newspaper"></i>

              <h3>
                No News Available
              </h3>

              <p>
                There are no news updates available
                at the moment.
              </p>

            </div>

          ) : (


            /* =================================================
               NEWS GRID
            ================================================= */

            <div className="news-grid">

              {newsList.map((item, index) => (

                <article
                  className="news-card"
                  key={item._id}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                  }}
                >


                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="news-card-image">

                    {item.image?.url ? (

                      <img
                        src={item.image.url}
                        alt={item.title || "News"}
                        loading="lazy"
                      />

                    ) : (

                      <div className="news-no-image">

                        <i className="bi bi-image"></i>

                      </div>

                    )}


                    {/* FEATURED / NEW */}

                    {item.featured === true && (

                      <span className="news-featured">

                        <i className="bi bi-star-fill"></i>

                        New

                      </span>

                    )}

                  </div>


                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="news-card-content">


                    {/* DATE */}

                    <div className="news-date">

                      <i className="bi bi-calendar3"></i>

                      <span>
                        {formatDate(item.newsDate)}
                      </span>

                    </div>


                    {/* TITLE */}

                    <h3>
                      {item.title}
                    </h3>


                    {/* DESCRIPTION */}

                    <p>

                      {item.description
                        ? item.description.length > 145
                          ? `${item.description.substring(
                              0,
                              145
                            )}...`
                          : item.description
                        : "No description available."
                      }

                    </p>


                    {/* READ MORE */}

                    <button
                      className="news-read-btn"
                      onClick={() =>
                        navigate(
                          `/newsdetails/${item._id}`
                        )
                      }
                    >

                      <span>
                        Read More
                      </span>

                      <i className="bi bi-arrow-right"></i>

                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      {/* <section className="news-cta">

        <div className="news-cta-content">

          <i className="bi bi-bell-fill"></i>

          <div>

            <h2>
              Stay Connected With Us
            </h2>

            <p>
              Stay informed about our latest
              announcements and activities.
            </p>

          </div>

        </div>

      </section> */}

    </div>

  );

};

export default News;