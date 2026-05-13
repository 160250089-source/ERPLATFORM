const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const registerValidator = (req, res, next) => {
  const { fullname, email, phoneNumber, password, role } = req.body;

  if (!fullname || !email || !phoneNumber || !password || !role) {
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }

  if (fullname.trim().length < 3) {
    return res.status(400).json({
      message: "Full name must be at least 3 characters long",
      success: false,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({
      message: "Please provide a valid email address",
      success: false,
    });
  }

  if (String(phoneNumber).replace(/\D/g, "").length < 10) {
    return res.status(400).json({
      message: "Please provide a valid phone number",
      success: false,
    });
  }

  if (String(password).length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
      success: false,
    });
  }

  if (!["student", "recruiter"].includes(role)) {
    return res.status(400).json({
      message: "Role must be either student or recruiter",
      success: false,
    });
  }

  next();
};

export const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email and password",
      success: false,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({
      message: "Please provide a valid email address",
      success: false,
    });
  }

  if (String(password).length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
      success: false,
    });
  }

  next();
};