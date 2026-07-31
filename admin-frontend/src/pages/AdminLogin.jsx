import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/AdminLogin.css";
import "../assets/images/mokshdhamlogo.jpg";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";
import { toast } from "react-toastify";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {

      toast.error("Please fill all fields");

      return;

    }

    if (password.length < 6) {

      toast.error("Password must be at least 6 characters");

      return;

    }

    toast.success("Admin Login Successfully 🎉");

    setTimeout(() => {

      navigate("/dashboard");

    }, 1500);

  };

  return (

    <div className="admin-login-page">

      {/* Left */}

      <div className="admin-left">

        <div className="admin-overlay">

          <img
            src={mokshdhamlogo}
            alt="Logo"
            className="admin-logo"
          />

          <h1>Administrator Panel</h1>

          <h3>Manoharpura Mokshdham</h3>

          <p>

            Welcome to the Administration Panel.

            <br />

            Authorized Users Only.

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="admin-right">

        <div className="admin-card">

          <div className="login-icon">

            <i className="bi bi-shield-lock-fill"></i>

          </div>

          <h2>Admin Login</h2>

          <p>Please sign in to continue</p>

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="form-group">

              <label>Email</label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

              </div>

            </div>

            {/* Password */}

            <div className="form-group">

              <label>Password</label>

              <div className="input-box">

                <i className="bi bi-lock-fill"></i>

                <input
                  type={showPassword ? "text":"password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

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

            {/* Options */}

            <div className="admin-options">

              <label>

                <input type="checkbox"/>

                Remember Me

              </label>

              <Link to="/admin-forgot-password">

                Forgot Password?

              </Link>

            </div>

            <button className="admin-btn">

              <i className="bi bi-box-arrow-in-right me-2"></i>

              Login

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AdminLogin;
