import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/News.css";

const News = () => {

    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");


    // ==========================
// Get All News
// ==========================

const getNews = async () => {

    try {

        setLoading(true);

        const res = await api.get("/news");

        if (res.data.success) {

            setNews(res.data.news);
            setFilteredNews(res.data.news);

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

// ==========================
// Search
// ==========================

useEffect(() => {

    const result = news.filter((item) =>
        item.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    setFilteredNews(result);

}, [search, news]);

// ==========================
// Delete News
// ==========================

const deleteNews = async (id) => {

    const result = await Swal.fire({

        title: "Delete News?",

        text: "You won't be able to recover this news.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Delete",

    });

    if (!result.isConfirmed) return;

    try {

        const res = await api.delete(`/news/delete/${id}`);

        if (res.data.success) {

            Swal.fire(
                "Deleted!",
                "News deleted successfully.",
                "success"
            );

            getNews();

        }

    } catch (error) {

        Swal.fire(
            "Error",
            error.response?.data?.message ||
            "Unable to delete news",
            "error"
        );

    }

};

// ==========================
// Format Date
// ==========================

const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

};

return (

<div className="container-fluid py-4 news-page">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="news-title">
                News Management
            </h2>

        </div>

        <Link
            to="/news/add"
            className="btn btn-primary px-4"
        >
            + Add News
        </Link>

    </div>

    {/* Search */}

    <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

            <input
                type="text"
                className="form-control"
                placeholder="Search News..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

        </div>

    </div>

    {/* Cards */}

    {loading ? (

        <div className="text-center py-5">

            <div className="spinner-border text-primary"></div>

        </div>

    ) : filteredNews.length===0 ? (

        <div className="alert alert-warning text-center">

            No News Found

        </div>

    ) : (

        <div className="row">

            {filteredNews.map((item)=>(

                <div
                    className="col-lg-4 col-md-6 mb-4"
                    key={item._id}
                >

                    <div className="card h-100 shadow border-0 news-card">

                        {/* Image */}

                        <img
                            src={item.image?.url}
                            alt={item.title}
                            className="news-image"
                        />

                        <div className="card-body">

                            {/* Badges */}

                            <div className="d-flex justify-content-between mb-3">

                              <span
className={`status-badge ${
item.status==="Published"
? "published-badge"
: "draft-badge"
}`}
>
                                    {item.status}
                                </span>

                                {item.featured && (
  <span className="featured-badge">
    <span className="shine"></span>
    <i className="bi bi-stars"></i>
    New
  </span>
)}

                            </div>

                            {/* Title */}

                            <h5 className="fw-bold">

                                {item.title}

                            </h5>

                            {/* Date */}

                            <p className="text-muted mb-2">

                                📅 {formatDate(item.newsDate)}

                            </p>

                            {/* Description */}

                            <p
                                className="text-muted"
                                style={{
                                    minHeight:"80px"
                                }}
                            >

                                {item.description.length>120
                                ? item.description.substring(0,120)+"..."
                                : item.description}

                            </p>

                        </div>

                        {/* Footer */}

                        <div className="card-footer bg-white border-0">

                            <div className="d-flex justify-content-between">

                                <Link
                                    to={`/news/view/${item._id}`}
                                    className="btn btn-outline-primary btn-sm"
                                >
                                    👁 View
                                </Link>

                                <Link
                                    to={`/news/edit/${item._id}`}
                                    className="btn btn-outline-warning btn-sm"
                                >
                                    ✏ Edit
                                </Link>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={()=>deleteNews(item._id)}
                                >
                                    🗑 Delete
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    )}

</div>

);

};

export default News;