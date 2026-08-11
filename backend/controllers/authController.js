import jwt from "jsonwebtoken";

// ==========================
// Admin Login
// ==========================

export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("ADMIN LOGIN REQUEST:", {
      email,
      passwordProvided: !!password,
    });

    // ==========================
    // Required Fields
    // ==========================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ==========================
    // Environment Variables
    // ==========================

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {

      console.error(
        "ADMIN_EMAIL or ADMIN_PASSWORD is missing in Render Environment Variables"
      );

      return res.status(500).json({
        success: false,
        message: "Admin credentials are not configured on server",
      });
    }

    // ==========================
    // Email Check
    // ==========================

    if (
      email.toLowerCase().trim() !==
      adminEmail.toLowerCase().trim()
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================
    // Password Check
    // ==========================

    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ==========================
    // JWT Token
    // ==========================

    const token = jwt.sign(
      {
        email: adminEmail,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // ==========================
    // Success
    // ==========================

    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      admin: {
        email: adminEmail,
        role: "Admin",
      },
    });

  } catch (error) {

    console.error("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};