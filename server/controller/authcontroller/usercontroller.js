const User = require("../../models/User");

exports.registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    address,
    mobileNo,
    completedEvents,
    registeredEvents,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      address,
      mobileNo,
      status: "active",
      completedEvents,
      registeredEvents,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Direct string comparison (⚠ only okay for dev/testing)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success: return userId
    res.json({
      message: "Login successful",
      userId: user._id, // MongoDB _id
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

