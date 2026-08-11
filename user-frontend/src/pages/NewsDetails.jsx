import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import "../assets/css/NewsDetails.css";

const NewsDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==============================
  // GET SINGLE NEWS
  // ==============================

  const getNewsDetails = async () => {

    try {

      setLoading(true);

      const res = await api.get(`/news/${id}`);

      console.log("NEWS DETAILS:", res.data);

      if (res.data.success) {

        setNews(res.data.news);

      } else {

        setError(
          res.data.message || "News not found"
        );

      }

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Unable to load news."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getNewsDetails();

  }, [id]);


  // ==============================
  // DATE FORMAT
  // ==============================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (

      <div className="news-details-state">

        <div className="news-details-loader"></div>

        <p>
          Loading news...
        </p>

      </div>

    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (error || !news) {

    return (

      <div className="news-details-state">

        <i className="bi bi-newspaper"></i>

        <h3>
          News Not Found
        </h3>

        <p>
          {error || "This news is not available."}
        </p>

        <button
          onClick={() => navigate("/news")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to News
        </button>

      </div>

    );

  }


  return (

    <main className="news-details-page">


      {/* ==============================
          BACK BUTTON
      ============================== */}

      <div className="news-details-container">

        <button
          className="news-back-btn"
          onClick={() => navigate("/news")}
        >

          <i className="bi bi-arrow-left"></i>

          Back to News

        </button>


        {/* ==============================
            ARTICLE
        ============================== */}

        <article className="news-details-card">


          {/* IMAGE */}

          <div className="news-details-image">

            <img
              src={news.image?.url}
              alt={news.title}
            />

          </div>


          {/* CONTENT */}

          <div className="news-details-content">


            {/* DATE */}

            <div className="news-details-date">

              <i className="bi bi-calendar3"></i>

              {formatDate(news.newsDate)}

            </div>


            {/* TITLE */}

            <h1>
              {news.title}
            </h1>


            {/* FEATURED */}

            {news.featured === true && (

              <span className="news-details-featured">

                <i className="bi bi-star-fill"></i>

                Featured News

              </span>

            )}


            {/* DESCRIPTION */}

            <div className="news-details-description">

              {news.description
                ?.split("\n")
                .map((paragraph, index) => (

                  <p key={index}>
                    {paragraph}
                  </p>

                ))
              }

            </div>


          </div>

        </article>

      </div>

    </main>

  );

};

export default NewsDetails;