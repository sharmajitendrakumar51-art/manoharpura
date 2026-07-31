import { Link } from "react-router-dom";
import "../assets/css/AdminLogin.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";
import { toast } from "react-toastify";

const AdminForgotPassword = () => {

  const handleSubmit = (e) => {

    e.preventDefault();

    toast.success("Reset Link Sent Successfully 📩");

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

          <h1>Password Recovery</h1>

          <h3>Administrator Panel</h3>

          <p>

            Enter your registered admin email.

            <br />

            We'll send a password reset link.

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="admin-right">

        <div className="admin-card">

          <div className="login-icon">

            <i className="bi bi-key-fill"></i>

          </div>

          <h2>Forgot Password</h2>

          <p>Reset your administrator password</p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Email Address</label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"
                  placeholder="Enter Admin Email"
                  required
                />

              </div>

            </div>

            <button className="admin-btn">

              <i className="bi bi-send-fill me-2"></i>

              Send Reset Link

            </button>

          </form>

          <div
            style={{
              textAlign:"center",
              marginTop:"20px"
            }}
          >

            <Link to="/">

              ← Back to Login

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminForgotPassword;