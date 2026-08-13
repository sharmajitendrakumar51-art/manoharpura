import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/Hero.css";
import Swal from "sweetalert2";

const Hero = () => {

  // =====================================================
  // STATES
  // =====================================================

  const [heroes, setHeroes] = useState([]);

  const [loading, setLoading] = useState(true);

  // Add / Edit Modal
  const [showModal, setShowModal] = useState(false);

  const [editingHero, setEditingHero] = useState(null);

  // View Modal
  const [showViewModal, setShowViewModal] = useState(false);

  const [viewHero, setViewHero] = useState(null);

  // Saving
  const [saving, setSaving] = useState(false);

  // Image Preview
  const [imagePreview, setImagePreview] = useState("");

  // Form
  const [formData, setFormData] = useState({
    smallHeading: "",
    title: "",
    description: "",
    order: 0,
    status: "Active",
    image: null,
  });


  // =====================================================
  // GET ALL HEROES
  // =====================================================

  const getHeroes = async () => {

    try {

      setLoading(true);

      const res = await api.get("/hero/");

      console.log("HERO RESPONSE:", res.data);

      if (res.data.success) {

        setHeroes(res.data.heroes);

      }

    } catch (error) {

      console.log("Get Heroes Error:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to load heroes",
      });

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOAD HEROES
  // =====================================================

  useEffect(() => {

    getHeroes();

  }, []);


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(
      URL.createObjectURL(file)
    );

  };


  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {

    setEditingHero(null);

    setFormData({
      smallHeading: "",
      title: "",
      description: "",
      order: heroes.length + 1,
      status: "Active",
      image: null,
    });

    setImagePreview("");

    setShowModal(true);

  };


  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (hero) => {

    setEditingHero(hero);

    setFormData({
      smallHeading: hero.smallHeading || "",
      title: hero.title || "",
      description: hero.description || "",
      order: hero.order ?? 0,
      status: hero.status || "Active",
      image: null,
    });

    setImagePreview(
      hero.image?.url || ""
    );

    setShowModal(true);

  };


  // =====================================================
  // CLOSE ADD / EDIT MODAL
  // =====================================================

  const closeModal = () => {

    if (saving) return;

    setShowModal(false);

    setEditingHero(null);

    setFormData({
      smallHeading: "",
      title: "",
      description: "",
      order: 0,
      status: "Active",
      image: null,
    });

    setImagePreview("");

  };


  // =====================================================
  // OPEN VIEW MODAL
  // =====================================================

  const openViewModal = (hero) => {

    setViewHero(hero);

    setShowViewModal(true);

  };


  // =====================================================
  // CLOSE VIEW MODAL
  // =====================================================

  const closeViewModal = () => {

    setShowViewModal(false);

    setViewHero(null);

  };


  // =====================================================
  // SUBMIT ADD / EDIT
  // =====================================================

const handleSubmit = async (e) => {
  e.preventDefault();

  // ==============================
  // VALIDATION
  // ==============================

  // if (!formData.title.trim()) {
  //   Swal.fire({
  //     icon: "warning",
  //     title: "Title Required",
  //     text: "Please enter hero title.",
  //   });

  //   return;
  // }

  // Image required only while creating
  if (!editingHero && !formData.image) {
    Swal.fire({
      icon: "warning",
      title: "Image Required",
      text: "Please select a hero image.",
    });

    return;
  }

  try {
    setSaving(true);

    // ==============================
    // FORM DATA
    // ==============================

    const data = new FormData();

    data.append("smallHeading", formData.smallHeading);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("order", String(formData.order));
    data.append("status", formData.status);

    if (formData.image) {
      data.append("image", formData.image);
    }

    // ==============================
    // UPDATE
    // ==============================

    if (editingHero) {
      const res = await api.put(
        `/hero/update/${editingHero._id}`,
        data
      );

      console.log("UPDATE HERO RESPONSE:", res.data);

      if (res.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Hero updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        closeModal();
        getHeroes();
      }
    }

    // ==============================
    // CREATE
    // ==============================

    else {
      const res = await api.post(
        "/hero/create",
        data
      );

      console.log("CREATE HERO RESPONSE:", res.data);

      if (res.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Hero created successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        closeModal();
        getHeroes();
      }
    }

  } catch (error) {

    console.log("SAVE HERO ERROR:", error);

    console.log(
      "SERVER RESPONSE:",
      error.response?.data
    );

    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Failed to save hero.",
    });

  } finally {
    setSaving(false);
  }
};


  // =====================================================
  // DELETE HERO
  // =====================================================

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Hero?",

      text:
        "This hero slide will be permanently deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc3545",

      cancelButtonColor: "#6c757d",

      confirmButtonText: "Yes, Delete",

      cancelButtonText: "Cancel",

    });


    if (!result.isConfirmed) return;


    try {

      const res = await api.delete(
        `/hero/delete/${id}`
      );


      if (res.data.success) {

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Hero deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        getHeroes();

      }

    } catch (error) {

      console.log(
        "Delete Hero Error:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to delete hero.",
      });

    }

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="hero-admin-page">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="hero-page-header">

        <div>

          <h2>
            Hero Carousel
          </h2>

          <p>
            Manage homepage hero slides.
          </p>

        </div>


        <button
          className="hero-add-btn"
          onClick={openAddModal}
        >

          <i className="bi bi-plus-circle"></i>

          Add Hero

        </button>

      </div>


      {/* =================================================
          HERO LIST
      ================================================= */}

      <div className="hero-list">


        {loading ? (

          <div className="hero-loading">

            <div className="spinner-border"></div>

            <p>
              Loading heroes...
            </p>

          </div>


        ) : heroes.length === 0 ? (

          <div className="hero-empty">

            <i className="bi bi-images"></i>

            <h4>
              No Hero Slides Found
            </h4>

            <p>
              Add your first hero slide.
            </p>

            <button
              className="hero-add-btn"
              onClick={openAddModal}
            >

              <i className="bi bi-plus-circle"></i>

              Add Hero

            </button>

          </div>


        ) : (

          heroes.map((hero, index) => (

            <div
              className="hero-card"
              key={hero._id}
            >


              {/* IMAGE */}

              <div className="hero-card-image">

                <img
                  src={hero.image?.url}
                  alt={hero.title}
                />

                <span className="hero-order">

                  #{hero.order ?? index + 1}

                </span>

              </div>


              {/* CONTENT */}

              <div className="hero-card-content">


                <div className="hero-card-top">

                  <span
                    className={`hero-status ${
                      hero.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >

                    <span></span>

                    {hero.status}

                  </span>

                </div>


                {hero.smallHeading && (

                  <span className="hero-small-heading">

                    {hero.smallHeading}

                  </span>

                )}


                <h3>
                  {hero.title}
                </h3>


                <p>

                  {hero.description ||
                    "No description available."}

                </p>


                <div className="hero-card-footer">


                  <span className="hero-date">

                    <i className="bi bi-calendar3"></i>

                    {formatDate(
                      hero.createdAt
                    )}

                  </span>


                  {/* ACTIONS */}

                  <div className="hero-actions">


                    {/* VIEW */}

                    <button
                      className="hero-view-btn"
                      title="View"
                      onClick={() =>
                        openViewModal(hero)
                      }
                    >

                      <i className="bi bi-eye"></i>

                    </button>


                    {/* EDIT */}

                    <button
                      className="hero-edit-btn"
                      title="Edit"
                      onClick={() =>
                        openEditModal(hero)
                      }
                    >

                      <i className="bi bi-pencil"></i>

                    </button>


                    {/* DELETE */}

                    <button
                      className="hero-delete-btn"
                      title="Delete"
                      onClick={() =>
                        handleDelete(hero._id)
                      }
                    >

                      <i className="bi bi-trash"></i>

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}

      </div>


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div className="hero-modal-overlay">

          <div className="hero-modal">


            {/* HEADER */}

            <div className="hero-modal-header">

              <div>

                <h3>

                  {editingHero
                    ? "Edit Hero Slide"
                    : "Add Hero Slide"}

                </h3>

                <p>
                  Add content for homepage hero.
                </p>

              </div>


              <button
                className="hero-modal-close"
                onClick={closeModal}
                disabled={saving}
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="hero-form"
            >


              {/* IMAGE */}

              <div className="hero-form-group">

                <label>

                  Hero Image

                  {!editingHero && (
                    <span>*</span>
                  )}

                </label>


                <div className="hero-image-upload">


                  {imagePreview ? (

                    <div className="hero-preview">

                      <img
                        src={imagePreview}
                        alt="Preview"
                      />

                      <button
                        type="button"
                        className="remove-preview"
                        onClick={() => {

                          setImagePreview("");

                          setFormData(
                            (prev) => ({
                              ...prev,
                              image: null,
                            })
                          );

                        }}
                      >

                        <i className="bi bi-x"></i>

                      </button>

                    </div>


                  ) : (

                    <label className="hero-upload-box">

                      <i className="bi bi-cloud-arrow-up"></i>

                      <span>
                        Click to upload image
                      </span>

                      <small>
                        JPG, JPEG, PNG or WEBP
                      </small>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleImageChange
                        }
                      />

                    </label>

                  )}

                </div>

              </div>


              {/* SMALL HEADING */}

              <div className="hero-form-group">

                <label>
                  Small Heading
                </label>

                <input
                  type="text"
                  name="smallHeading"
                  value={
                    formData.smallHeading
                  }
                  onChange={handleChange}
                  placeholder="SEVA • SAMPARPAN • SANSKAAR"
                />

              </div>


              {/* TITLE */}

              <div className="hero-form-group">

                <label>
                  Main Title <span>*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Serving Society With Dedication"
                 // required
                />

              </div>


              {/* DESCRIPTION */}

              <div className="hero-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write a short description for this hero slide..."
                ></textarea>

              </div>


              {/* ORDER + STATUS */}

              <div className="hero-form-row">


                <div className="hero-form-group">

                  <label>
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="order"
                    min="0"
                    value={formData.order}
                    onChange={handleChange}
                  />

                </div>


                <div className="hero-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="hero-form-actions">

                <button
                  type="button"
                  className="hero-cancel-btn"
                  onClick={closeModal}
                  disabled={saving}
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  className="hero-save-btn"
                  disabled={saving}
                >

                  {saving ? (

                    <>

                      <span className="spinner-border spinner-border-sm"></span>

                      Saving...

                    </>

                  ) : (

                    <>

                      <i className="bi bi-check-circle"></i>

                      {editingHero
                        ? "Update Hero"
                        : "Save Hero"}

                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================================
          VIEW HERO MODAL
      ================================================= */}

      {showViewModal && viewHero && (

        <div
          className="hero-modal-overlay"
          onClick={closeViewModal}
        >

          <div
            className="hero-modal hero-view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* VIEW HEADER */}

            <div className="hero-modal-header">

              <div>

                <h3>
                  Hero Details
                </h3>

                <p>
                  View homepage hero slide
                </p>

              </div>


              <button
                className="hero-modal-close"
                onClick={closeViewModal}
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>


            {/* VIEW CONTENT */}

            <div className="hero-view-content">


              {/* HERO IMAGE */}

              <div className="hero-view-image">

                <img
                  src={viewHero.image?.url}
                  alt={viewHero.title}
                />

              </div>


              {/* SMALL HEADING */}

              {viewHero.smallHeading && (

                <div className="hero-view-section">

                  <span className="hero-view-label">
                    Small Heading
                  </span>

                  <p className="hero-view-small-heading">

                    {viewHero.smallHeading}

                  </p>

                </div>

              )}


              {/* TITLE */}

              <div className="hero-view-section">

                <span className="hero-view-label">
                  Main Title
                </span>

                <h2>
                  {viewHero.title}
                </h2>

              </div>


              {/* DESCRIPTION */}

              <div className="hero-view-section">

                <span className="hero-view-label">
                  Description
                </span>

                <p>

                  {viewHero.description ||
                    "No description available."}

                </p>

              </div>


              {/* DETAILS */}

              <div className="hero-view-details">


                {/* ORDER */}

                <div className="hero-detail-box">

                  <span>
                    Display Order
                  </span>

                  <strong>
                    #{viewHero.order ?? 0}
                  </strong>

                </div>


                {/* STATUS */}

                <div className="hero-detail-box">

                  <span>
                    Status
                  </span>

                  <strong
                    className={
                      viewHero.status === "Active"
                        ? "view-status-active"
                        : "view-status-inactive"
                    }
                  >

                    <i className="bi bi-circle-fill"></i>

                    {viewHero.status}

                  </strong>

                </div>


                {/* CREATED */}

                <div className="hero-detail-box">

                  <span>
                    Created
                  </span>

                  <strong>
                    {formatDate(
                      viewHero.createdAt
                    )}
                  </strong>

                </div>


                {/* UPDATED */}

                <div className="hero-detail-box">

                  <span>
                    Last Updated
                  </span>

                  <strong>
                    {formatDate(
                      viewHero.updatedAt
                    )}
                  </strong>

                </div>

              </div>


              {/* VIEW ACTIONS */}

              <div className="hero-view-actions">


                <button
                  className="hero-cancel-btn"
                  onClick={closeViewModal}
                >

                  Close

                </button>


                <button
                  className="hero-save-btn"
                  onClick={() => {

                    closeViewModal();

                    openEditModal(viewHero);

                  }}
                >

                  <i className="bi bi-pencil"></i>

                  Edit Hero

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


export default Hero;