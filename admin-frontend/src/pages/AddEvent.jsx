import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import "../assets/css/AddEvent.css";

const AddEvent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    location: "",
    category: "Religious",
    status: "Upcoming",
    featured: false,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);

  // -----------------------------
  // Input Change
  // -----------------------------

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------
  // Cover Image
  // -----------------------------

  const handleCoverImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  // -----------------------------
  // Gallery Images
  // -----------------------------

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);

    setGalleryImages(files);

    const preview = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryPreview(preview);
  };

  // -----------------------------
  // Reset Form
  // -----------------------------

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      eventDate: "",
      eventTime: "",
      location: "",
      category: "Religious",
      status: "Upcoming",
      featured: false,
    });

    setCoverImage(null);
    setCoverPreview("");

    setGalleryImages([]);
    setGalleryPreview([]);
  };

    // -----------------------------
  // Submit Form
  // -----------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return Swal.fire("Error", "Event Title is required", "error");
    }

    if (!formData.description.trim()) {
      return Swal.fire("Error", "Description is required", "error");
    }

    if (!formData.eventDate) {
      return Swal.fire("Error", "Event Date is required", "error");
    }

    if (!formData.eventTime) {
      return Swal.fire("Error", "Event Time is required", "error");
    }

    if (!formData.location.trim()) {
      return Swal.fire("Error", "Location is required", "error");
    }

    if (!coverImage) {
      return Swal.fire("Error", "Cover Image is required", "error");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("eventDate", formData.eventDate);
      data.append("eventTime", formData.eventTime);
      data.append("location", formData.location);
      data.append("category", formData.category);
      data.append("status", formData.status);
      data.append("featured", formData.featured);

      data.append("coverImage", coverImage);

      galleryImages.forEach((img) => {
        data.append("galleryImages", img);
      });

      const response = await api.post("/event/create", data);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Event Added Successfully",
        });

        resetForm();

        navigate("/events");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Add New Event</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Event Title</label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                rows="5"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Event Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Event Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
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
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Religious</option>
                  <option>Meeting</option>
                  <option>Festival</option>
                  <option>Construction</option>
                  <option>Social</option>
                  <option>Other</option>
                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Upcoming</option>
                  <option>Completed</option>
                </select>

              </div>

            </div>

            <div className="form-check mb-4">

              <input
                className="form-check-input"
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
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

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleCoverImage}
              />

              {coverPreview && (
                <div className="mt-3">
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="img-thumbnail"
                    style={{
                      width: "220px",
                      height: "160px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Gallery Images */}

            <div className="mb-4">
              <label className="form-label fw-bold">
                Gallery Images
              </label>

              <input
                type="file"
                className="form-control"
                multiple
                accept="image/*"
                onChange={handleGalleryImages}
              />

              {galleryPreview.length > 0 && (
                <div className="row mt-3">

                  {galleryPreview.map((img, index) => (
                    <div
                      className="col-lg-2 col-md-3 col-4 mb-3"
                      key={index}
                    >
                      <img
                        src={img}
                        alt="Preview"
                        className="img-thumbnail w-100"
                        style={{
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Buttons */}

            <div className="d-flex justify-content-end gap-2">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/events")}
              >
                Back
              </button>

              <button
                type="button"
                className="btn btn-warning"
                onClick={resetForm}
              >
                Reset
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                    ></span>

                    Saving...
                  </>
                ) : (
                  "Save Event"
                )}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddEvent;