import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/EditEvent.css";

const EditEvent = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================
  // Form States
  // ==========================

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Religious");
  const [status, setStatus] = useState("Upcoming");
  const [featured, setFeatured] = useState(false);

  // Existing Images

  const [coverPreview, setCoverPreview] = useState("");
  const [galleryPreview, setGalleryPreview] = useState([]);

  // New Images

  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================
  // Get Event By Id
  // ==========================

  const getEvent = async () => {

    try {

      setLoading(true);

      const response = await api.get(`/event/${id}`);

      if (response.data.success) {

        const event = response.data.event;

        setTitle(event.title);
        setDescription(event.description);
        setDateFrom(event.dateFrom?.split("T")[0]);
        setDateTo(event.dateTo?.split("T")[0]);
        setTimeFrom(event.timeFrom);
        setTimeTo(event.timeTo);
        setLocation(event.location);
        setCategory(event.category);
        setStatus(event.status);
        setFeatured(event.featured);

        setCoverPreview(event.coverImage?.url);

        setGalleryPreview(event.galleryImages || []);

      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to fetch event",
      });

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    getEvent();

  }, []);

    // ==========================
  // Image Handlers
  // ==========================

  const handleCoverImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImages = (e) => {

    const files = Array.from(e.target.files);

    setGalleryImages(files);

    const preview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryPreview(preview);

  };

  if (loading) {

    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  }
  // ==========================
  // Update Event
  // ==========================

  const updateEvent = async (e) => {

    e.preventDefault();

    if (dateTo < dateFrom) {
  return Swal.fire(
    "Error",
    "Date To cannot be earlier than Date From",
    "error"
  );
}

if (
  dateFrom === dateTo &&
  timeTo <= timeFrom
) {
  return Swal.fire(
    "Error",
    "Time To must be later than Time From",
    "error"
  );
}

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("dateFrom", dateFrom);
      formData.append("dateTo", dateTo);
      formData.append("timeFrom", timeFrom);
      formData.append("timeTo", timeTo);
      formData.append("location", location);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("featured", featured);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      galleryImages.forEach((image) => {
        formData.append("galleryImages", image);
      });

      const response = await api.put(
        `/event/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {

        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });

        navigate("/events");

      }

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to update event",
      });

    } finally {

      setLoading(false);

    }

  };
  return (

    <div className="container py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Edit Event
        </h2>

        <Link
          to="/events"
          className="btn btn-secondary"
        >
          ← Back
        </Link>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

         <form onSubmit={updateEvent}>

            {/* Title */}

            <div className="mb-3">

              <label className="form-label">
                Event Title
              </label>

              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            {/* Description */}

            <div className="mb-3">

              <label className="form-label">
                Description
              </label>

              <textarea
                rows="5"
                className="form-control"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              ></textarea>

            </div>

            <div className="row">

  <div className="col-md-6 mb-3">

    <label className="form-label">
      Date From
    </label>

    <input
      type="date"
      className="form-control"
      value={dateFrom}
      onChange={(e) =>
        setDateFrom(e.target.value)
      }
    />

  </div>

  <div className="col-md-6 mb-3">

    <label className="form-label">
      Date To
    </label>

    <input
      type="date"
      className="form-control"
      value={dateTo}
      onChange={(e) =>
        setDateTo(e.target.value)
      }
    />

  </div>

</div>

<div className="row">

  <div className="col-md-6 mb-3">

    <label className="form-label">
      Time From
    </label>

    <input
      type="time"
      className="form-control"
      value={timeFrom}
      onChange={(e) =>
        setTimeFrom(e.target.value)
      }
    />

  </div>

  <div className="col-md-6 mb-3">

    <label className="form-label">
      Time To
    </label>

    <input
      type="time"
      className="form-control"
      value={timeTo}
      onChange={(e) =>
        setTimeTo(e.target.value)
      }
    />

  </div>

</div>

            <div className="mb-3">

              <label className="form-label">
                Location
              </label>

              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

            </div>

                        <div className="row">

              {/* Category */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  <option value="Religious">Religious</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Festival">Festival</option>
                  <option value="Construction">Construction</option>
                  <option value="Social">Social</option>
                  <option value="Other">Other</option>
                </select>

              </div>

              {/* Status */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>

              </div>

            </div>

            {/* Featured */}

            <div className="form-check mb-4">

              <input
                type="checkbox"
                className="form-check-input"
                checked={featured}
                onChange={(e) =>
                  setFeatured(e.target.checked)
                }
              />

              <label className="form-check-label">
                Featured Event
              </label>

            </div>

            {/* Cover Image */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Cover Image
              </label>

              {coverPreview && (

                <div className="mb-3">

                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="img-fluid rounded shadow"
                    style={{
                      maxHeight: "250px",
                    }}
                  />

                </div>

              )}

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleCoverImage}
              />

            </div>

            {/* Gallery Images */}

            <div className="mb-4">

              <label className="form-label fw-bold">
                Gallery Images
              </label>

              <input
                type="file"
                multiple
                className="form-control mb-3"
                accept="image/*"
                onChange={handleGalleryImages}
              />

              <div className="row">

                {galleryPreview.map((image, index) => (

                  <div
                    className="col-lg-3 col-md-4 col-6 mb-3"
                    key={index}
                  >

                    <img
                      src={typeof image === "string" ? image : image.url}
                      alt="Gallery"
                      className="img-fluid rounded shadow"
                      style={{
                        height: "140px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                  </div>

                ))}

              </div>

            </div>

            <div className="d-flex justify-content-end">

  <button
    type="submit"
    className="btn btn-primary px-4"
    disabled={loading}
  >
    {loading ? "Updating..." : "Update Event"}
  </button>

</div>

        </form>

      </div>

    </div>

  </div>

  );
};

export default EditEvent;