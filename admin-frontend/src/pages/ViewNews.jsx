import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/ViewNews.css";

const ViewNews = () => {

  const { id } = useParams();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Get Single News
  // ==========================

  const getNews = async () => {

    try {

      setLoading(true);

      const response = await api.get(`/news/${id}`);

      if (response.data.success) {

        setNews(response.data.news);

      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to fetch news",
      });

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getNews();

  }, []);

  if (loading) {

    return (
      <div className="container py-5 text-center">

        <div className="spinner-border text-primary"></div>

      </div>
    );

  }

  if (!news) {

    return (
      <div className="container py-5">

        <div className="alert alert-danger">

          News not found.

        </div>

      </div>
    );

  }

  return (

    <div className="container py-4 view-news-page">

      {/* Header */}

     <div className="view-news-header">

        <h2 className="fw-bold">

          View News

        </h2>

        <Link
          to="/news"
          className="btn btn-secondary"
        >
          ← Back
        </Link>

      </div>

      {/* News Image */}

      <div className="card news-image-card">

        <img
          src={news.image?.url}
          alt={news.title}
          className="news-image"
          style={{
            width: "100%",
            maxHeight: "450px",
            objectFit: "cover",
          }}
        />

      </div>

      {/* Details */}

      <div className="card news-details">

        <div className="card-body">

          {/* Title */}

          <h2 className="news-title">

            {news.title}

          </h2>

          <hr />

          <div className="row">

            {/* Date */}

            <div className="col-md-4 mb-3">

              <h6 className="fw-bold">

                📅 News Date

              </h6>

              <p>

                {new Date(news.newsDate).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}

              </p>

            </div>

            {/* Status */}

            <div className="col-md-4 mb-3">

              <h6 className="fw-bold">

                Status

              </h6>

              <span
                className={`badge fs-6 ${
                  news.status === "Published"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {news.status}
              </span>

            </div>

            {/* Featured */}

            <div className="col-md-4 mb-3">

              <h6 className="fw-bold">

                Featured

              </h6>

              {news.featured ? (

                <span className="badge bg-warning text-dark fs-6">

                  ⭐ Yes

                </span>

              ) : (

                <span className="badge bg-dark fs-6">

                  No

                </span>

              )}

            </div>

          </div>

          <hr />

          {/* Description */}

          <h5 className="fw-bold mb-3">

            Description

          </h5>

          <p
            style={{
              whiteSpace: "pre-line",
              lineHeight: "1.9",
              textAlign: "justify",
            }}
          >

            {news.description}

          </p>

        </div>

      </div>

      {/* Buttons */}

      <div className="view-news-buttons">

        <Link
          to="/news"
          className="btn btn-secondary"
        >
          ← Back to News
        </Link>

        <Link
          to={`/news/edit/${news._id}`}
          className="btn btn-warning"
        >
          ✏ Edit News
        </Link>

      </div>

    </div>

  );

};

export default ViewNews;