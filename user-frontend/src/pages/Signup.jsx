import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "../assets/css/Auth.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";

import api from "../api/axios";

import { toast } from "react-toastify";


const Signup = () => {

  const navigate = useNavigate();


  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [formData, setFormData] = useState({

    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",

  });


  // ==========================
  // Input Change
  // ==========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // ==========================
  // Signup
  // ==========================

  const handleSignup = async (e) => {

    e.preventDefault();


    const {
      fullName,
      mobile,
      email,
      password,
      confirmPassword,
    } = formData;


    // ==========================
    // Validation
    // ==========================

    if (
      !fullName ||
      !mobile ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      toast.warning(
        "Please fill all fields"
      );

      return;

    }


    if (fullName.length < 3) {

      toast.error(
        "Full name must be at least 3 characters"
      );

      return;

    }


    if (!/^[6-9]\d{9}$/.test(mobile)) {

      toast.error(
        "Enter a valid 10-digit mobile number"
      );

      return;

    }


    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

      toast.error(
        "Invalid email address"
      );

      return;

    }


    if (password.length < 8) {

      toast.error(
        "Password must be at least 8 characters"
      );

      return;

    }


    if (password !== confirmPassword) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }


    try {

      setLoading(true);


      // ==========================
      // API
      // ==========================

      const res = await api.post(
        "/auth/signup",
        {
          fullName,
          mobile,
          email,
          password,
        }
      );


      console.log(
        "SIGNUP RESPONSE:",
        res.data
      );


      if (res.data.success) {

        toast.success(
          "Account created successfully 🎉"
        );


        // Login page
        setTimeout(() => {

          navigate("/login");

        }, 1000);

      }

    } catch (error) {

      console.log(
        "SIGNUP ERROR:",
        error
      );


      toast.error(

        error.response?.data?.message ||
        "Registration failed"

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">


      {/* LEFT */}

      <div className="auth-left">

        <div className="overlay">

          <img
            src={mokshdhamlogo}
            alt="Logo"
            className="auth-logo"
          />

          <h1>
            Manoharpura Ideal Mokshdham
          </h1>

          <h4>
            Seva • Samarpan • Sanskaar
          </h4>

          <p>
            Join our community by creating
            your account
            <br />
            and become a registered member.
          </p>

        </div>

      </div>


      {/* RIGHT */}

      <div className="auth-right">

        <div className="auth-card">


          <h2>
            Create Account ✨
          </h2>

          <p>
            Fill your details to register
          </p>


          <form
            onSubmit={handleSignup}
          >


            {/* FULL NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <div className="input-box">

                <i className="bi bi-person-fill"></i>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* MOBILE */}

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <div className="input-box">

                <i className="bi bi-telephone-fill"></i>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                Password
              </label>

              <div className="input-box">

                <i className="bi bi-lock-fill"></i>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash-fill"
                      : "bi-eye-fill"
                  } eye-icon`}

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                ></i>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <div className="input-box">

                <i className="bi bi-shield-lock-fill"></i>

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                />

                <i
                  className={`bi ${
                    showConfirmPassword
                      ? "bi-eye-slash-fill"
                      : "bi-eye-fill"
                  } eye-icon`}

                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                ></i>

              </div>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>


          <div className="divider">
            <span>OR</span>
          </div>


          <button
            type="button"
            className="google-btn"
          >

            <i className="bi bi-google"></i>

            Continue with Google

          </button>


          <div className="bottom-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </div>


        </div>

      </div>

    </div>

  );

};


export default Signup;