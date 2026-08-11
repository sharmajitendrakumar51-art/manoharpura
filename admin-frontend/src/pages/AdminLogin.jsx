import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/AdminLogin.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";
import { toast } from "react-toastify";
import api from "../api/axios";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================
  // Admin Login
  // ==========================

  const handleLogin = async (e) => {

    e.preventDefault();

    // ==========================
    // Validation
    // ==========================

    if (!email || !password) {

      toast.error("Please fill all fields");

      return;

    }

    if (password.length < 6) {

      toast.error("Password must be at least 6 characters");

      return;

    }

    try {

      setLoading(true);

      // ==========================
      // Login API
      // ==========================

      const response = await api.post(
        "/auth/login",
        {
          email: email.trim(),
          password: password,
        }
      );

      // ==========================
      // Login Success
      // ==========================

      if (response.data.success) {

        // Save JWT Token
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        // Save Admin Details
        localStorage.setItem(
          "admin",
          JSON.stringify(response.data.admin)
        );

        toast.success("Admin Login Successfully 🎉");

        // Go Dashboard
        navigate("/dashboard");

      }

    } catch (error) {

      console.log("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="admin-login-page">

      {/* ==========================
          Left Section
      ========================== */}

      <div className="admin-left">

        <div className="admin-overlay">

          <img
            src={mokshdhamlogo}
            alt="Manoharpura Mokshdham Logo"
            className="admin-logo"
          />

          <h1>
            Administrator Panel
          </h1>

          <h3>
            Manoharpura Mokshdham
          </h3>

          <p>
            Welcome to the Administration Panel.
            <br />
            Authorized Users Only.
          </p>

        </div>

      </div>


      {/* ==========================
          Right Section
      ========================== */}

      <div className="admin-right">

        <div className="admin-card">

          {/* Login Icon */}

          <div className="login-icon">

            <i className="bi bi-shield-lock-fill"></i>

          </div>

          <h2>
            Admin Login
          </h2>

          <p>
            Please sign in to continue
          </p>


          {/* ==========================
              Login Form
          ========================== */}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="form-group">

              <label>
                Email
              </label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>


            {/* Password */}

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
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                {/* Show / Hide Password */}

                <i
                  className={`bi ${
                    showPassword
                      ? "bi-eye-slash-fill"
                      : "bi-eye-fill"
                  } eye-icon`}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                ></i>

              </div>

            </div>


            {/* ==========================
                Options
            ========================== */}

            <div className="admin-options">

              <label>

                <input
                  type="checkbox"
                />

                Remember Me

              </label>


              <Link to="/admin-forgot-password">

                Forgot Password?

              </Link>

            </div>


            {/* ==========================
                Login Button
            ========================== */}

            <button
              type="submit"
              className="admin-btn"
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

                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>

                  Login
                </>

              )}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AdminLogin;