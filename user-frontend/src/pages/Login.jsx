import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/Auth.css";

import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";

import api from "../api/axios";

import { toast } from "react-toastify";


const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // ===============================
  // Input Change
  // ===============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ===============================
  // Login
  // ===============================

  const handleLogin = async (e) => {

    e.preventDefault();


    // ===============================
    // Validation
    // ===============================

    if (!formData.email || !formData.password) {

      toast.warning("Please fill all fields");

      return;

    }


    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(formData.email)) {

      toast.error("Invalid email address");

      return;

    }


    if (formData.password.length < 8) {

      toast.error(
        "Password must be at least 8 characters"
      );

      return;

    }


    // ===============================
    // API LOGIN
    // ===============================

    try {

      setLoading(true);


      console.log("LOGIN REQUEST:", {
        email: formData.email,
      });


      const res = await api.post(
        "/user/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );


      console.log(
        "LOGIN RESPONSE:",
        res.data
      );


      // ===============================
      // LOGIN SUCCESS
      // ===============================

      if (res.data.success) {


        // ===============================
        // Save JWT Token
        // ===============================

        localStorage.setItem(
          "token",
          res.data.token
        );


        // ===============================
        // Save User
        // ===============================

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );


        // ===============================
        // Login Status
        // ===============================

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );


        // ===============================
        // User Email
        // ===============================

        localStorage.setItem(
          "userEmail",
          res.data.user.email
        );


        toast.success(
          "Login Successfully 🎉"
        );


        // ===============================
        // User Dashboard
        // ===============================

        setTimeout(() => {

          navigate("/user/dashboard");

        }, 500);

      }


    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );


      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">


      {/* =================================
          LEFT SIDE
      ================================= */}

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

            Welcome to the official portal of

            <br />

            Manoharpura Ideal Mokshdham
            Vikas Samiti.

          </p>

        </div>

      </div>


      {/* =================================
          RIGHT SIDE
      ================================= */}

      <div className="auth-right">

        <div className="auth-card">


          <h2>
            Welcome Back 👋
          </h2>


          <p>
            Please login to continue
          </p>


          <form onSubmit={handleLogin}>


            {/* =================================
                EMAIL
            ================================= */}

            <div className="form-group">

              <label>
                Email Address
              </label>


              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>


                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>

            </div>


            {/* =================================
                PASSWORD
            ================================= */}

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
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />


                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash-fill"
                      : "bi-eye-fill"
                  } eye-icon`}

                  onClick={() =>
                    !loading &&
                    setShowPassword(
                      !showPassword
                    )
                  }

                ></i>

              </div>

            </div>


            {/* =================================
                REMEMBER ME
            ================================= */}

            <div className="auth-options">

              <label>

                <input
                  type="checkbox"
                  disabled={loading}
                />

                Remember Me

              </label>


              <Link to="/forgot-password">

                Forgot Password?

              </Link>

            </div>


            {/* =================================
                LOGIN BUTTON
            ================================= */}

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                  ></span>

                  Logging in...

                </>

              ) : (

                "Login"

              )}

            </button>

          </form>


          {/* =================================
              DIVIDER
          ================================= */}

          <div className="divider">

            <span>
              OR
            </span>

          </div>


          {/* =================================
              GOOGLE
          ================================= */}

          <button
            type="button"
            className="google-btn"
          >

            <i className="bi bi-google"></i>

            Continue with Google

          </button>


          {/* =================================
              SIGNUP
          ================================= */}

          <div className="bottom-text">

            Don't have an account?


            <Link to="/signup">

              Sign Up

            </Link>

          </div>


        </div>

      </div>

    </div>

  );

};


export default Login;